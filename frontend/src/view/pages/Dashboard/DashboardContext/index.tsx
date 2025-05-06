import React, { createContext, useCallback, useState } from 'react';
import { BankAccount } from '../../../../app/entities/BankAccount';

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  isNewTransactionModalOpen: boolean;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  closeNewTransactionModal(): void;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  openEditAccountModal(bankAccount: BankAccount): void;
  closeEditAccountModal(): void;
  isEditAccountModalOpen: boolean;
  accountBeingEdited: BankAccount | null;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] = useState<
    'INCOME' | 'EXPENSE' | null
  >(null);
  const [isEditAccountModalOpen, setEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] =
    useState<BankAccount | null>(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setNewAccountModalOpen(false);
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setNewTransactionModalOpen(false);
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setEditAccountModalOpen(true);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null);
    setEditAccountModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        isNewAccountModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,
        isNewTransactionModalOpen,
        newTransactionType,
        closeEditAccountModal,
        openEditAccountModal,
        isEditAccountModalOpen,
        accountBeingEdited,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
