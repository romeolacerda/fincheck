import { PlusIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '../../../../../components/DropDownMenu';
import BankAccountIcon from '../../../../icons/BankAccountIcon';
import { CategoryIcon } from '../../../../icons/categories/CategoryIcon';
import { useDashboard } from '../../DashboardContext/useDashboard';

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();

  return (
    <div className="fixed right-4 bottom-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className=" bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center text-white ">
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content side="top">
          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('EXPENSE')}
          >
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="gap-2"
            onSelect={() => openNewTransactionModal('INCOME')}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenu.Item>
          <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
