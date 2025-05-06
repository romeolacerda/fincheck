import * as RdxPopover from '@radix-ui/react-popover';

export function PopoverTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RdxPopover.Trigger className="w-full" asChild>
      {children}
    </RdxPopover.Trigger>
  );
}
