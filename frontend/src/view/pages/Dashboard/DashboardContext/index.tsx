import React, { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
    areValuesVisible: boolean
    toggleValuesVisibility(): void
    isNewAccountModalOpen: boolean
    openNewAccountModal(): void
    closeNewAccountModal(): void

}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [areValuesVisible, setAreValuesVisible] = useState(true)
    const [isNewAccountModalOpen, setNewAccountModalOpen] = useState(false)

    const toggleValuesVisibility = useCallback(() => {
        setAreValuesVisible(prevState => !prevState)
    }, [])

    const openNewAccountModal = useCallback(() => {
        setNewAccountModalOpen(true)
    }, [])

    const closeNewAccountModal = useCallback(() => {
        setNewAccountModalOpen(false)
    }, [])

    return (
        <DashboardContext.Provider value={{ areValuesVisible, toggleValuesVisibility, openNewAccountModal, closeNewAccountModal, isNewAccountModalOpen }}>
            {children}
        </DashboardContext.Provider>
    )
}
