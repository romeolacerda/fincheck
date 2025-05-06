import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { bankAccountService } from "../../../../../app/services/bankAccountService";
import { BankAccountParams } from "../../../../../app/services/bankAccountService/create";
import currencyStringToNumber from "../../../../../app/utils/currencyStringToNumber";
import { useDashboard } from "../../DashboardContext/useDashboard";

const schema = z.object({
    initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
    name: z.string().nonempty("Nome da conta é obrigatório"),
    type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
    color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function useEditAccountModalController() {
    const { isEditAccountModalOpen, closeEditAccountModal } = useDashboard();

    const {
        register,
        control,
        handleSubmit: hookFormHandleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const queryClient = useQueryClient();
    const { isPending, mutateAsync } = useMutation(
        { mutationFn: async(data: BankAccountParams) =>  { return bankAccountService.create(data)} }
    )

    const handleSubmit = hookFormHandleSubmit(async (data) => {
        const { color, initialBalance, name, type } = data;

        try {
            await mutateAsync({
                color,
                name,
                type,
                initialBalance: currencyStringToNumber(initialBalance),
            });
            toast.success("Conta cadastrada com sucesso!");
            queryClient.invalidateQueries({queryKey : ["bank-accounts"]});
            closeEditAccountModal();
            reset();
        } catch {
            toast.error("Erro ao cadastrar a conta!");
            reset();
        }
    });



    return {
        register,
        handleSubmit,
        isLoading: isPending,
        errors,
        control,
        isEditAccountModalOpen, closeEditAccountModal
    };
}
