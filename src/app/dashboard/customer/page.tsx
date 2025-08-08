import { Container } from "@/components/container";
import Link from "next/link";
import { CardCustomer } from "./components/card";
import prismaClient from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import  { authOptions } from '@/lib/auth'


export default async function Customer() {
    
    const session = await getServerSession(authOptions)

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session?.user.id
        }
    })
    
    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold ">
                        Meus Clientes
                    </h1>
                    <Link href="/dashboard/customer/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                        Novo Cliente
                    </Link>
                </div>
                {customers.length <= 0 && (
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-2xl font-light text-center w-full mt-5">Nenhum cliente cadastrado, <br/>clique no botão abaixo para cadastrar um novo cliente</p>
                        <Link href="/dashboard/customer/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                            Cadastrar cliente
                        </Link>
                    </div>
                )}
                {customers.length > 0 && (
                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 mt-3">  
                        {customers.map(customer => (
                            <CardCustomer 
                                key={customer.id}
                                customer={customer}
                                userId={session?.user.id as string}
                            ></CardCustomer>
                        ))}
                    </section>
                )}
            </main>
        </Container>
    )
}