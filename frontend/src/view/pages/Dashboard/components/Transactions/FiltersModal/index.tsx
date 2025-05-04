import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "../../../../../../app/utils/cn";
import { Button } from "../../../../../../components/Button";
import { Modal } from "../../../../../../components/Modal";
import { useFiltersModal } from "./useFiltersModal";

interface FiltersModalProps {
    open: boolean
    onClose(): void
}

const mockedAccounts = [
    {
        id: '123',
        name: 'Nubank',
    },
    {
        id: '456',
        name: 'Xp'
    },
    {
        id: '789',
        name: 'dinheiro'
    }
]

export function FiltersModal({ open, onClose }: FiltersModalProps) {

    const {
        selectedBankAccountId,
        handleSelectBankAccount,
        selectedYear,
        handleChangeYear
    } = useFiltersModal()

    return (
        <Modal open={open} title="Filtros" onClose={onClose} >
            <div>
                <span className='text-lg tracking-[-1px] font-bold text-gray-800'>
                    Conta
                </span>

                <div className="space-y-2 mt-2">
                    {mockedAccounts.map(account => (
                        <button
                            key={account.id}
                            onClick={() => handleSelectBankAccount(account.id)}
                            className={cn("p-2 rounded-2xl w-full text-left  text-gray-800 hover:bg-gray-100 transition-colors",
                                account.id === selectedBankAccountId && "!bg-gray-200")}>
                            {account.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-10 text-gray-800">
                <span className='text-lg tracking-[-1px] font-bold '>
                    Ano
                </span>

                <div className=" mt-2 w-52 flex items-center justify-between">
                    <button className="w-12 h-12 flex items-center justify-center"
                    onClick={() => handleChangeYear(-1)}
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <div className="flex-1 text-center">
                        <span className="text-sm font-medium tracking-[-0.5px]">
                            {selectedYear}
                        </span>
                    </div>
                    <button className="w-12 h-12 flex items-center justify-center"
                    onClick={() => handleChangeYear(+1)}
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>

                <Button className="w-full mt-10">
                    Aplicar Filtros
                </Button>
            </div>
        </Modal>
    )
}
