import { Controller } from 'react-hook-form';
import { Button } from '../../../../../components/Button';
import { ColorsDropdownInput } from '../../../../../components/ColorsDropdown';
import { ConfirmDeleteModal } from '../../../../../components/ConfirmDeleteModal';
import { Input } from '../../../../../components/Input';
import { InputCurrency } from '../../../../../components/InputCurrency';
import { Modal } from '../../../../../components/Modal';
import { Select } from '../../../../../components/Select';
import TrashIcon from '../../../../icons/TrashIcon';
import useEditAccountModalController from './useEditAccountModalController';

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    errors,
    handleSubmit,
    register,
    control,
    isLoading,
    handleOpenDeleteModal,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
  } = useEditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        title="Tem certeza que deseja excluir essa conta?"
        onConfirm={handleDeleteAccount}
        onClose={handleCloseDeleteModal}
        description="Ao excluir a conta, também serão excluídos todos os registros de
        receita e despesas relacionados."
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo inicial
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>

            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0,00"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  errors={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value}
                placeholder="Selecione um tipo"
                error={errors.type?.message}
                options={[
                  { value: 'CHECKING', label: 'Conta Corrente' },
                  { value: 'INVESTMENT', label: 'Investimentos' },
                  { value: 'CASH', label: 'Dinheiro' },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                onChange={onChange}
                value={value}
                error={errors.color?.message}
              />
            )}
          />

          <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
            Editar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
