"use client"
import { Input } from "@/components/input"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'



const schema = z.object({
    name: z.string().min(3, "O campo nome é obrigatório"),
    email: z.string().min(1, "O campo e-mail é obrigatório"),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "O número deve ser: (DD) 999999999"
    }).min(3, "O campo nome é obrigatório"),
    address: z.string()
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({ userId } : { userId : string}){

    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter()
    
    async function handleRegisterCustomer(data: FormData){
    
        try {
            const {name, phone, email, address} = data
        
            const response = await api.post("/api/customer", {
                name,
                phone,
                email,
                address,
                userId
            })
            router.push("/dashboard/customer")
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label className="mb-1 text-lg font-medium">Nome Completo</label>
            <Input 
                type="text"
                name="name"
                placeholder="Digite o nome completo"
                error={errors.name?.message}
                register={register}
            />
            <div className="flex gap-4 my-4 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">E-mail</label>
                    <Input 
                        type="email"
                        name="email"
                        placeholder="Digite o seu e-mail"
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Telefone</label>
                    <Input 
                        type="text"
                        name="phone"
                        placeholder="Exemplo: (XX) XXXXXXXXX"
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>
            </div>
            <label className="mb-1 text-lg font-medium">Endereço Completo</label>
            <Input 
                type="text"
                name="address"
                placeholder="Digite o endereço completo do cliente..."
                error={errors.address?.message}
                register={register}
            />
            <button 
                className="bg-blue-500 my-4 text-white px-3 font-bold h-11"
                type="submit">
                Cadastrar
            </button>
        </form>
    )
}