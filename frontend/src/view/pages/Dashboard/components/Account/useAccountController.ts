import { useMemo, useState } from 'react';
import { useBankAccounts } from '../../../../../app/hooks/useBankAccount';
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth';
import { useDashboard } from '../../DashboardContext/useDashboard';

export function useAccountController() {
  const windowWidth = useWindowWidth();

  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => total + account.currentBalance,
      0,
    );
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: accounts ?? [],
    openNewAccountModal,
    currentBalance,
  };
}
