import { Swiper, SwiperSlide } from "swiper/react";
import { EyeIcon } from "../../../../icons/EyeIcon";
import AccountCard from "../Accountcard";
import { AccountsSliderNavigation } from "../AccountSliderNavigation";
import "./index.css";

export default function Accounts() {
    return (
        <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
            <div>
                <span className="tracking[-0.5px] text-white block">
                    Saldo Total
                </span>
                <div className="flex items-center gap-2">
                    <strong className="text-2xl tracking-[-0.5px] text-white">
                        $ 1000,00
                    </strong>
                    <button className="flex items-center justify-center w-8 h-8">
                        <EyeIcon open />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-end">
                <div>
                    <Swiper spaceBetween={16} slidesPerView={2.2}>
                        <div
                            className="flex items-center justify-between mb-4"
                            slot="container-start"
                        >
                            <strong className="text-white tracking-[-1px] text-lg font-bold">
                                Minhas contas
                            </strong>

                            <AccountsSliderNavigation />
                        </div>
                        <SwiperSlide>
                            <AccountCard
                                balance={100}
                                color="#7950F2"
                                name="Nubank"
                                type="INVESTMENT"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AccountCard
                                balance={100}
                                color="#7950F2"
                                name="Nubank"
                                type="INVESTMENT"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AccountCard
                                balance={100}
                                color="#7950F2"
                                name="Nubank"
                                type="INVESTMENT"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
