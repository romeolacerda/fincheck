import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const shcema = z.object({
    email: z.string().nonempty('Email Obrigatorio').email('Informe um email valido'),
    password: z.string().nonempty('Senha e Obrigatoria').min(8, 'Senha deve conter pelo menos 8 digitos')
})
type FormData = z.infer<typeof shcema>

export function useLoginController(){
    const {
        register,
        handleSubmit: hookFormHandleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(shcema)
    })

    const handleSubmit = hookFormHandleSubmit((data) => {
        console.log(data)
    })

    return {handleSubmit, register, errors}

}
