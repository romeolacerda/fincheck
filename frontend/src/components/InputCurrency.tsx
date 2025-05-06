import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';
import { cn } from '../app/utils/cn';

interface InputCurrencyProps {
  errors?: string;
  onChange?: (value: string) => void;
  value?: string | number;
}

export function InputCurrency({ errors, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          'w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none',
          errors && 'text-red-900',
        )}
      />
      {errors && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-red-900 text-xs">{errors}</span>
        </div>
      )}
    </div>
  );
}
