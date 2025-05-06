import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { bankAccountService } from '../../../../../app/services/bankAccountService';
import { UpdateBankAccountParams } from '../../../../../app/services/bankAccountService/update';
import currencyStringToNumber from '../../../../../app/utils/currencyStringToNumber';
import { useDashboard } from '../../DashboardContext/useDashboard';

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty('Saldo inicial é obrigatório'),
    z.number(),
  ]),
  name: z.string().nonempty('Nome da conta é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export default function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    register,
    control,
    handleSubmit: hookFormHandleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationFn: async (data: UpdateBankAccountParams) => {
      return bankAccountService.update(data);
    },
  });
  const { isPending: isLoadingDelete, mutateAsync: removeAccount } =
    useMutation({
      mutationFn: async (id: string) => {
        return bankAccountService.remove(id);
      },
    });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const { color, initialBalance, name, type } = data;

    try {
      await updateAccount({
        id: accountBeingEdited!.id,
        color,
        name,
        type,
        initialBalance: currencyStringToNumber(initialBalance),
      });
      toast.success('A Conta foi editada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      closeEditAccountModal();
      reset();
    } catch {
      toast.error('Erro ao salvar a conta!');
      reset();
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      toast.success('A Conta foi deletada com sucesso!');
      closeEditAccountModal();
      reset();
    } catch {
      toast.error('Erro ao deletar a conta!');
      reset();
    }
  }

  return {
    register,
    handleSubmit,
    isLoading: isPending,
    errors,
    control,
    isEditAccountModalOpen,
    closeEditAccountModal,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
  };
}
