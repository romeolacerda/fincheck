import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "../../../app/hooks/useAuth";
import { authService } from "../../../app/services/authService";
import { SigninParams } from "../../../app/services/authService/signin";

const schema = z.object({
    email: z.string().nonempty('Email Obrigatorio').email('Informe um email valido'),
    password: z.string().nonempty('Senha e Obrigatoria').min(8, 'Senha deve conter pelo menos 8 digitos')
})
type FormData = z.infer<typeof schema>

export function useLoginController() {
    const {
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>(
        { resolver: zodResolver(schema), }
    )

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: SigninParams) => { return authService.signin(data) },
    })

    const {signin } = useAuth()

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const {accessToken} = await mutateAsync(data)

            signin(accessToken)
        } catch {
            toast.error("There was an error when login in into your account")
        }

    })

    return { handleSubmit, register, errors, isPending }

}
