import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccount';
import { useCategories } from '../../../../../app/hooks/useCategories';
import { transactionsService } from '../../../../../app/services/transactionsServices';
import { CreateTransactionsParams } from '../../../../../app/services/transactionsServices/create';
import currencyStringToNumber from '../../../../../app/utils/currencyStringToNumber';
import { useDashboard } from '../../DashboardContext/useDashboard';

const schema = z.object({
  value: z.string().nonempty('Informe o Valor'),
  name: z.string().nonempty('Informe o Nome'),
  categoryId: z.string().nonempty('Informe a Categoria'),
  bankAccountId: z.string().nonempty('Informe a Categoria'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    control,
    handleSubmit: hookFormHandleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { accounts } = useBankAccounts();

  const { categories: categoriesList } = useCategories();

  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: CreateTransactionsParams) => {
      return transactionsService.create(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { bankAccountId, categoryId, name } = data;

    try {
      await mutateAsync({
        bankAccountId,
        type: newTransactionType!,
        name,
        categoryId,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!',
      );
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error(
        newTransactionType === 'EXPENSE'
          ? 'Erro ao cadastradar despesa!'
          : 'Erro ao cadastradar receita!',
      );
      reset();
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType,
    );
  }, [categoriesList, newTransactionType]);

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    control,
    handleSubmit,
    errors,
    accounts,
    categories,
    isLoading,
  };
}
