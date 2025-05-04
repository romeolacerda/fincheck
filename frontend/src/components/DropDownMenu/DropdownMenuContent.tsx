import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../app/utils/cn";

interface DropdownMenuContentProps {
    children: React.ReactNode,
    className?: string
}

export function DropdownMenuContent({ children, className }: DropdownMenuContentProps) {
    return (
        <RdxDropdownMenu.Portal>
            <RdxDropdownMenu.Content side="bottom" className={cn("rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] animate-slide-up-and-fade !important", className)}>
                {children}

            </RdxDropdownMenu.Content>
        </RdxDropdownMenu.Portal>
    )
}
