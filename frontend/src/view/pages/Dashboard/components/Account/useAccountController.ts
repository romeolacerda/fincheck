import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import { useDashboard } from "../../DashboardContext/useDashboard";

export function useAccountController() {
    const windowWidth = useWindowWidth()

    const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } = useDashboard()

    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    })

    const { data, isFetching } = useQuery({
        queryKey: ['bankAccounts'],
        queryFn: () => bankAccountService.getAll()
    })

    const currentBalance = useMemo(() => {
        if (!data) return 0

        return data.reduce((total, account) => total + account.currentBalance, 0)
    }, [data])

    return {
        sliderState, setSliderState, windowWidth, areValuesVisible, toggleValuesVisibility, isLoading: isFetching, accounts: data ?? [], openNewAccountModal, currentBalance
    }
}
