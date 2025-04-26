import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

    const handleSubmit = hookFormSubmit((data) => { console.log(data) })

    return { register, handleSubmit, errors }
}
