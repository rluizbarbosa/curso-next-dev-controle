"use client"
import { Input } from "@/components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { api } from "@/lib/api"
import { CustomerDataInfo } from "../../page"


const schema = z.object({
    name: z.string().min(1, "O campo nome do chamado é obrigatório"),
    description: z.string().min(1, "O campo descrição é obrigatório"),
})

type FormData = z.infer<typeof schema>


export function FormTicket({ customer } : {customer: CustomerDataInfo}){

    const { register, handleSubmit, setValue, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleregisterTicket(data: FormData){
        const response = await api.post("/api/ticket", {
            customerId: customer.id,
            name: data.name,
            description: data.description
        })

        setValue('name', "")
        setValue('description', "")
    }

    return(
        <form 
            onSubmit={handleSubmit(handleregisterTicket)}
            className="bg-slate-200 py-6 px-6 rounded border-2 border-slate-300 mt-5">
            <label className="mb-1 font-medium text-lg">Nome do Chamado</label>
            <Input 
                type="text"
                name="name"
                placeholder="Digite o nome do chamado"
                error={errors.name?.message}
                register={register}
            />

            <label className="mb-1 font-medium text-lg">Descreva o problema</label>
            <textarea
                className="w-full border-2 bg-white border-gray-300 rounded-md px-2 h-24 resize-none text-lime-20"
                placeholder="Digite o problema..."
                id="description"
                {...register("description")}
            ></textarea>
            {errors.description && (
                <p className="text-red-500 mb-3">{errors.description?.message}</p>
            )}

            <button 
                type="submit"
                className="bg-blue-500 w-full flex flex-row gap-3 px-3 h-11 items-center justify-center text-white font-bold rounded">
                Cadastrar
            </button>
            
        </form>
    )
}