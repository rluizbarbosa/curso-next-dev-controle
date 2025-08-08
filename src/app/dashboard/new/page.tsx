import { Container } from "@/components/container";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import prismaClient from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import  { authOptions } from '@/lib/auth'
import { redirect } from "next/navigation";


export default async function NewTicket(){

    const session = await getServerSession(authOptions)

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session?.user.id 
        }
    })

    async function handleRegisterTicket(formData: FormData){
        "use server"

        const name = formData.get("name")
        const description = formData.get("description")
        const customerId = formData.get("customer")

        if(!name || !description || !customerId) return

        await prismaClient.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: 'ABERTO',
                userId: session?.user.id
            }
        })

        redirect("/dashboard")
    }

    return(
        <Container>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-start gap-3 flex-col">
                    <Link href="/dashboard" className="bg-gray-900 px-4 py-1 text-white rounded flex gap-2 items-center">
                        <FiArrowLeft size={16} color="#fff"></FiArrowLeft>
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold ">
                        Novo Chamado
                    </h1>
                </div>
                <form className="flex flex-col mt-6" action={handleRegisterTicket}>
                    <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                    <input
                        className="w-full border-2 border-gray-300 rounded-md px-2 mb-2 h-11"
                        placeholder="Digite o nome do chamado"
                        required 
                        type="text"
                        name="name"
                    />
                    <label className="mb-1 font-medium text-lg">Descreva o problema</label>
                    <textarea
                        className="w-full border-2 border-gray-300 rounded-md px-2 mb-2 h-24 resize-none text-lime-20"
                        placeholder="Digite o problema..."
                        required 
                        name="description"
                    ></textarea>
                    {customers.length > 0 && (
                        <>
                            <label className="mb-1 font-medium text-lg">Selecione o cliente</label>
                            <select 
                                name="customer"
                                className="w-full border-2 border-gray-300 rounded-md px-2 mb-2 h-11 resize-none text-lime-20">
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                        </>
                    )}

                    {customers.length <= 0 && (
                        <div className="flex flex-col items-center gap-3">
                            <p className="text-2xl font-light text-center w-full mt-5">Você ainda não tem nenhum cliente cadastrado, <br/>clique no botão abaixo para cadastrar um novo cliente</p>
                            <Link href="/dashboard/customer/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                                Cadastrar cliente
                            </Link>
                        </div>
                    )}
                    
                    <button 
                        className="bg-blue-500 my-4 text-white px-3 font-bold h-11 disabled:cursor-not-allowed disabled:bg-slate-300"
                        type="submit"
                        disabled={customers.length === 0}
                    >
                        Cadastrar
                    </button>
                    
                </form>
            </main>
        </Container>
    )
}