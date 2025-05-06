import * as RdxPopover from '@radix-ui/react-popover';
import { cn } from '../../app/utils/cn';

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  side?: 'left' | 'right' | 'bottom' | 'top';
}

export function PopoverContent({
  children,
  className,
  side,
}: PopoverContentProps) {
  const animation =
    side === 'bottom'
      ? 'animate-slide-up-and-fade'
      : 'animate-slide-down-and-fade';

  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        side={side}
        className={cn(
          'z-[99] rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] p-4',
          className,
          animation,
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}
