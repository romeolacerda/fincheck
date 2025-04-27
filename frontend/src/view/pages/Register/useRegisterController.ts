import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { authService } from "../../../app/services/authService"
import { SignupParams } from "../../../app/services/authService/signup"
import { useAuth } from "../../../app/hooks/useAuth"

const schema = z.object({
    name: z.string().nonempty('Name is required'),
    email: z.string().nonempty('Email is requires').email('Use a valid email'),
    password: z.string().nonempty('Password is required').min(8, 'Password must have at least 8 characters')
})
type FormData = z.infer<typeof schema>

export function useRegisterController() {
    const {
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>(
        { resolver: zodResolver(schema), }
    )

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (data: SignupParams) => { return authService.signup(data) },
    })

    const { signin } = useAuth()

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const {accessToken} = await mutateAsync(data)

            signin(accessToken)
        } catch {
            toast.error("There was an error when creating your account")
        }

    })

    return { register, handleSubmit, errors, isPending }
}
