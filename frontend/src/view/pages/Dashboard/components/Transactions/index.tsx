import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { FilterIcon } from "../../../../icons/FilterIcon";
import { TransactionsIcon } from "../../../../icons/TransactionsIcon";
import "./index.css";
import { SliderOption } from "./SliderOption";
import { TransactionSliderNavigation } from "./TransactionSliderNavigation";

export default function Transactions() {
    return (
        <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10">
            <header>
                <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2">
                        <TransactionsIcon />
                        <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                            Transactions
                        </span>
                        <ChevronDownIcon className="text-gray-900" />
                    </button>

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

            <div>conteudo</div>
        </div>
    );
}
