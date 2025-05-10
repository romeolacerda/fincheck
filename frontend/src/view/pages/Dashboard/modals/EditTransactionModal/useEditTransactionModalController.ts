import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Transaction } from '../../../../../app/entities/Transaction';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccount';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { transactionsService } from '../../../../../app/services/transactionsServices';
import { UpdateTransactionsParams } from '../../../../../app/services/transactionsServices/upadte';
import currencyStringToNumber from '../../../../../app/utils/currencyStringToNumber';

const schema = z.object({
  value: z.union([z.string().nonempty('Informe o valor'), z.number()]),
  name: z.string().nonempty('Informe o Nome'),
  categoryId: z.string().nonempty('Informe a Categoria'),
  bankAccountId: z.string().nonempty('Informe a Categoria'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    control,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  });
  const { accounts } = useBankAccounts();
  const { isPending: isLoading, mutateAsync: updateTransaction } = useMutation({
    mutationFn: async (data: UpdateTransactionsParams) => {
      return transactionsService.update(data);
    },
  });

  const { categories: categoriesList } = useCategories();

  const queryClient = useQueryClient();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      if (!transaction) return;

      await updateTransaction({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });
      toast.success(
        transaction.type === 'EXPENSE'
          ? 'Despesa Editada com sucesso!'
          : 'Receita Editada com sucesso!',
      );
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      onClose();
    } catch {
      toast.success(
        transaction?.type === 'EXPENSE'
          ? 'Erro ao salvar despesa!'
          : 'Erro ao salvar receita!',
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type,
    );
  }, [categoriesList, transaction]);

  const { isPending: isLoadingDelete, mutateAsync: removeTransaction } =
    useMutation({
      mutationFn: async (id: string) => {
        return transactionsService.remove(id);
      },
    });

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      toast.success('A Transação foi deletada com sucesso!');
      onClose();
    } catch {
      toast.error('Erro ao deletar a transação!');
    }
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  return {
    register,
    control,
    handleSubmit,
    errors,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  };
}
