"use client"

import { Container } from "@/components/container"
import { Input } from "@/components/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FiSearch, FiX } from "react-icons/fi"
import { z } from 'zod'
import { FormTicket } from "./components/formTicket"
import { api } from "@/lib/api"

const schema = z.object({
    email: z.string().min(1, "O campo e-mail é obrigatório"),
})

type FormData = z.infer<typeof schema>

export interface CustomerDataInfo{
    id: string
    name: string
}

export default function Ticket(){

    const [customer, setCustomer] = useState<CustomerDataInfo | null>(null)
    const { register, handleSubmit, setValue, setError, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema)
    })
    
    function handleClearCustomer(){
        setCustomer(null)
        setValue("email", "")
    }

    async function handlesearchCustomer(data: FormData) {
        const response = await api.get("/api/customer", {
            params: {
                email: data.email
            }
        })

        if(response.data === null){
            setError('email', {
                type: "custom",
                message: "Ops, cliente não foi encontrado!"
            })
            return
        }else{
            setCustomer({
                id: response.data.id,
                name: response.data.name
            })
        }
    }

    return(
        <main>
            <Container>
                <div className="w-full max-w-2xl mx-auto px-2">
                    <h1 className="font-bold text-3xl text-center mt-24">Abrir Chamado</h1>
                </div>
                <section className="flex flex-col mt-4 mb-2 w-full max-w-2xl mx-auto px-2">
                    {customer ? (
                        <div className="bg-slate-200 py-6 px-6 rounded border-2 border-slate-300 flex items-center justify-between">
                            <p className="text-lg">
                                <strong>Cliente Selecionado:</strong> {customer.name}
                            </p>
                            <button 
                                onClick={handleClearCustomer}
                                className="h-11 flex items-center justify-center rounded">
                                <FiX size={30} color="#ff3a3a"></FiX>
                            </button>
                        </div>
                    ) : (
                        <form 
                            onSubmit={handleSubmit(handlesearchCustomer)}
                            className="bg-slate-200 py-6 px-6 rounded border-2 border-slate-300">
                            <div className="flex flex-col gap-3">
                                <Input 
                                    type="email"
                                    name="email"
                                    placeholder="Digite o e-mail do cliente"
                                    error={errors.email?.message}
                                    register={register}
                                />
                                <button 
                                    type="submit"
                                    className="bg-blue-500 flex flex-row gap-3 px-3 h-11 items-center justify-center text-white font-bold rounded">
                                    Procurar clientes
                                    <FiSearch size={24} color="#fff"></FiSearch>
                                </button>
                            </div>
                        </form>
                    )}

                    {customer !== null && (
                        <FormTicket customer={customer}/>
                    )}
                    
                </section>
            </Container>
        </main>
    )
}