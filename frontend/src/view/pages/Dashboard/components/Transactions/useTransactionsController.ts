import { useEffect, useState } from "react";
import useTransactions from "../../../../../app/hooks/useTransactions";
import { TransactionFilters } from "../../../../../app/services/transactionsServices/getAll";
import { useDashboard } from "../../DashboardContext/useDashboard";

export function useTransactionsController() {
    const { areValuesVisible } = useDashboard()

    const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)

    const [filters, setFilters] = useState<TransactionFilters>({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    const { transactions, isLoading, isInitialLoading, refetch } = useTransactions(filters)

    useEffect(() => {
        refetch()
    }, [filters, refetch])

    function handleChangeFilters<TFilter extends keyof TransactionFilters>(filter: TFilter){
        return (value: TransactionFilters[TFilter]) => {
            if (value === filters[filter]) return

            setFilters(pv => ({
                ...pv,
                [filter]: value
            }))
        }
    }

    function handleApplyFilters({bankAccountId, year}: {bankAccountId: string |  undefined, year: number}){
        handleChangeFilters('bankAccountId')(bankAccountId)
        handleChangeFilters('year')(year)
        setIsFiltersModalOpen(false)
    }

    function handleOpenFiltersModal() {
        setIsFiltersModalOpen(true)
    }

    function handleCloseFiltersModal() {
        setIsFiltersModalOpen(false)
    }

    return {
        areValuesVisible,
        isInitialLoading,
        isLoading,
        transactions,
        handleCloseFiltersModal,
        handleOpenFiltersModal,
        isFiltersModalOpen,
        handleChangeFilters,
        filters,
        handleApplyFilters
    }
}
