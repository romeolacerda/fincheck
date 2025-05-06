import { PlusIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { Spinner } from "../../../../../components/Spinner";
import { EyeIcon } from "../../../../icons/EyeIcon";
import AccountCard from "../Account/Accountcard";
import { AccountsSliderNavigation } from "../Account/AccountSliderNavigation";
import "./index.css";
import { useAccountController } from "./useAccountController";

export default function Accounts() {

    const { setSliderState, sliderState, windowWidth, areValuesVisible, toggleValuesVisibility, isLoading, accounts, openNewAccountModal, currentBalance } = useAccountController()

    return (
        <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col text">
            {isLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner className="text-teal-950/50 fill-white w-10 h-10" />
                </div>
            )}

            {!isLoading && (
                <>
                    <div>
                        <span className="tracking[-0.5px] text-white block">
                            Saldo Total
                        </span>
                        <div className="flex items-center gap-2">
                            <strong className={cn("text-2xl tracking-[-0.5px] text-white", !areValuesVisible && 'blur-sm')}>
                                {formatCurrency(currentBalance)}
                            </strong>
                            <button className="flex items-center justify-center w-8 h-8" onClick={toggleValuesVisibility}>
                                <EyeIcon open={!areValuesVisible} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
                        {accounts.length === 0 && (
                            <>
                                <div
                                    className="flex items-center justify-between mb-4"
                                    slot="container-start"
                                >
                                    <strong className="text-white tracking-[-1px] text-lg font-bold">
                                        Minhas contas
                                    </strong>

                                </div>
                                <button onClick={openNewAccountModal} className="mt-4 h-52 border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white">
                                    <div className="w-11 h-11 rounded-full  border-2 border-dashed border-white flex items-center justify-center">
                                        <PlusIcon className="w-6 h-6" />
                                    </div>
                                    <span className="tracking-[-0.5px] font-medium block w-[128px] text-center">Cadastre uma nova conta</span>
                                </button>
                            </>

                        )}
                        {accounts.length > 0 && (
                            <div>
                                <Swiper spaceBetween={16} slidesPerView={windowWidth >= 500 ? 2.1 : 1.2} onSlideChange={swiper => {
                                    setSliderState({
                                        isBeginning: swiper.isBeginning,
                                        isEnd: swiper.isEnd
                                    })
                                }}>
                                    <div
                                        className="flex items-center justify-between mb-4"
                                        slot="container-start"
                                    >
                                        <strong className="text-white tracking-[-1px] text-lg font-bold">
                                            Minhas contas
                                        </strong>

                                        <AccountsSliderNavigation isBeginning={sliderState.isBeginning} isEnd={sliderState.isEnd} />
                                    </div>

                                    {accounts.map(account => (
                                        <SwiperSlide key={account.id}>
                                            <AccountCard
                                                data={account}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
