import { Controller } from "react-hook-form";
import { DatePickerInput } from "../../../../../components/DatePickerInput";
import { Input } from "../../../../../components/Input";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { Button } from "../../../../../components/Button";

export function NewTransactionModal() {
    const { closeNewTransactionModal, isNewTransactionModalOpen, newTransactionType, control, errors, handleSubmit, register, accounts, categories, isLoading } = useNewTransactionModalController()

    const isExpense = newTransactionType === 'EXPENSE'

    return (
        <Modal title={isExpense ? 'Nova Despesa' : 'Nova Receita'} open={isNewTransactionModalOpen} onClose={closeNewTransactionModal}>
            <form action="" className="" onSubmit={handleSubmit}>
                <div >
                    <span className="text-gray-600 tracking-[-0.5px] text-xs">Valor {isExpense ? "da despesa" : "da receita"}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
                        <Controller
                            control={control}
                            name="value"
                            defaultValue="0,00"
                            render={({ field: { onChange, value }, }) => (
                                <InputCurrency
                                    errors={errors.value?.message}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                    <Input type="text" {...register('name')} placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'} error={errors.name?.message} />

                    <Controller
                        control={control}
                        name="categoryId"
                        defaultValue=""
                        render={({ field: { onChange, value }, }) => (
                            <Select placeholder="Categoria"
                                error={errors.categoryId?.message}
                                onChange={onChange}
                                value={value}
                                options={categories.map((category) => (
                                    { value: category.id, label: category.name }
                                ))}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="bankAccountId"
                        defaultValue=""
                        render={({ field: { onChange, value }, }) => (
                            <Select placeholder={isExpense ? "Pagar com " : "Receber com"}
                                onChange={onChange}
                                error={errors.bankAccountId?.message}
                                value={value}
                                options={accounts.map((account) => (
                                    { value: account.id, label: account.name }
                                ))}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="date"
                        defaultValue={new Date()}
                        render={({ field: { value, onChange } }) => (
                            <DatePickerInput
                                error={errors.date?.message}
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    />

                    <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
                        Criar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
