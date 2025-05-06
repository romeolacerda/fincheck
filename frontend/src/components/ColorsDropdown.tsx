import { ChevronDownIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { COLORS } from '../app/config/constants';
import { cn } from '../app/utils/cn';
import { ColorIcon } from '../view/icons/ColorIcon';
import { DropdownMenu } from './DropDownMenu';

interface ColorsDropdownInputProps {
  error?: string;
  className?: string;
  value?: string;
  onChange?(value: string): void;
}

type Color = {
  color: string;
  bg: string;
};

export function ColorsDropdownInput({
  className,
  error,
  onChange,
  value,
}: ColorsDropdownInputProps) {
  const [selectedColor, setSelectedColor] = useState<null | Color>(() => {
    if (!value) {
      return null;
    }

    return COLORS.find((c) => c.color === value) ?? null;
  });

  function handleSelect(color: Color) {
    setSelectedColor(color);
    onChange?.(color.color);
  }

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700  focus:border-gray-800 outline-none text-left relative ',
              error && '!border-red-900 ',
              className,
            )}
          >
            Cor
            <div className=" absolute right-3 top-1/2 -translate-y-1/2">
              {!selectedColor && (
                <ChevronDownIcon className="w-6 h-6 text-gray-800" />
              )}

              {selectedColor && (
                <ColorIcon color={selectedColor.color} bg={selectedColor.bg} />
              )}
            </div>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="grid grid-cols-4">
          {COLORS.map((color) => (
            <DropdownMenu.Item
              key={color.color}
              onSelect={() => handleSelect(color)}
            >
              <ColorIcon color={color.color} bg={color.bg} />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-red-900 text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
