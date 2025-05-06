import { ChevronDownIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '../../../../../components/DropDownMenu';
import { ExpensesIcon } from '../../../../icons/ExpensesIcon';
import { IncomeIcon } from '../../../../icons/IncomeIcon';
import { TransactionsIcon } from '../../../../icons/TransactionsIcon';

interface TransactionTypeDropdownProps {
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void;
  selectedType: 'INCOME' | 'EXPENSE' | undefined;
}

export function TransactionsTypeDropdown({
  onSelect,
  selectedType,
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="flex items-center gap-2">
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === 'EXPENSE' && 'Despesas'}
            {selectedType === 'INCOME' && 'Receitas'}
            {selectedType === undefined && 'Transações'}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[279px]" side="bottom">
        <DropdownMenu.Item
          onSelect={() => onSelect('INCOME')}
          className="gap-2"
        >
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect('EXPENSE')}
        >
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect(undefined)}
        >
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
