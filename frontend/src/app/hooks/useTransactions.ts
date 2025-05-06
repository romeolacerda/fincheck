import { useQuery } from '@tanstack/react-query';
import { TransactionFilters } from '../services/transactionsServices/getAll';
import { transactionsService } from '../services/transactionsServices';

export default function useTransactions(filters: TransactionFilters) {
  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters),
  });

  const isInitialLoading = isLoading && !data;

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetch,
  };
}
