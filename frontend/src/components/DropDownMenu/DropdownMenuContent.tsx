import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../app/utils/cn";

interface DropdownMenuContentProps {
    children: React.ReactNode,
    className?: string
    side: 'left' | 'right' | 'bottom' | 'top'
}

export function DropdownMenuContent({ children, className, side }: DropdownMenuContentProps) {

    const animation = side === 'bottom' ? 'animate-slide-up-and-fade' : 'animate-slide-down-and-fade'

    return (
        <RdxDropdownMenu.Portal>
            <RdxDropdownMenu.Content side={side} className={cn("z-50 rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]!important", className, animation)}>
                {children}

            </RdxDropdownMenu.Content>
        </RdxDropdownMenu.Portal>
    )
}
