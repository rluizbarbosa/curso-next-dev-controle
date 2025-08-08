"use client"
import { CustomerProps } from "@/utils/customer.type";
import { api } from "@/lib/api"
import { useRouter } from 'next/navigation'

export function CardCustomer({ customer, userId } : {customer: CustomerProps, userId : string}) {

    const router = useRouter()

    async function handleDeleteCustomer(){
        try {
            const response = await api.delete("/api/customer", {
                params: {
                    userId : userId,
                    idCustomer: customer.id
                }
            })
            router.refresh()
        } catch (error) {}
    }

    return (
        <article className="flex flex-col bg-gray-100 border-gray-300 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
            <h2>
                <b className="font-bold">Nome:</b> {customer.name}
            </h2>
            <p>
                <b className="font-bold">E-mail:</b> {customer.email}
            </p>
            <p>
                <b className="font-bold">Telefone:</b> {customer.phone}
            </p>
            <button 
                onClick={handleDeleteCustomer}
                className="bg-red-500 px-4 py-2 rounded text-white mt-2 self-start"
            >
                Deletar
            </button>
        </article>
    )
}