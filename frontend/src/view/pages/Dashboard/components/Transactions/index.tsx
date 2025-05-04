import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import emptyState from "../../../../../assets/empty-state.svg";
import { Spinner } from "../../../../../components/Spinner";
import { CategoryIcon } from "../../../../icons/categories/CategoryIcon";
import { FilterIcon } from "../../../../icons/FilterIcon";
import "./index.css";
import { SliderOption } from "./SliderOption";
import { TransactionSliderNavigation } from "./TransactionSliderNavigation";
import { TransactionsTypeDropdown } from "./TransactionsTypeDropdown";
import { useTransactionsController } from "./useTransactionsController";

export default function Transactions() {
    const { areValuesVisible, isInitialLoading, isLoading, transactions } = useTransactionsController()

    const hasTransactions = transactions.length < 0

    return (

        <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
            {isInitialLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner className=" w-10 h-10" />
                </div>
            )}
            {!isInitialLoading && (
                <>
                    <header>
                        <div className="flex items-center justify-between">
                            <TransactionsTypeDropdown />

                            <button>
                                <FilterIcon />
                            </button>
                        </div>

                        <div className="mt-6 relative">
                            <Swiper slidesPerView={3} centeredSlides>
                                <TransactionSliderNavigation />

                                {MONTHS.map((month, i) => (
                                    <SwiperSlide key={month}>
                                        {({ isActive }) => (
                                            <SliderOption
                                                index={i}
                                                isActive={isActive}
                                                month={month}
                                            />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </header>

                    <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center h-full">
                                <Spinner className=" w-10 h-10" />
                            </div>

                        )}

                        {!hasTransactions && !isLoading && (
                            <div className="flex flex-col items-center justify-center h-full">

                                <>
                                    <img src={emptyState} alt="empty state" />
                                    <p className="text-gray-700">Não encontramos nenhuma transação!</p>

                                </>
                            </div>
                        )}
                        {(hasTransactions && !isLoading) && (<div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                            <div className="flex-1 flex items-center gap-3">
                                <CategoryIcon type="income" />

                                <div>
                                    <strong className="font-bold tracking-[-0.5px block">Lunch</strong>
                                    <span className="text-sm text-gray-600">04/06/2025</span>
                                </div>
                            </div>

                            <span className={cn("text-green-800 tracking-[-0.5px] font-medium", !areValuesVisible && 'blur-sm')}> +{formatCurrency(123)}</span>
                        </div>)}
                    </div>
                </>
            )}

        </div>
    );
}
