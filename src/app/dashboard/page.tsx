import { Container } from "@/components/container";
import Link from "next/link";
import { TicketItem } from "@/app/dashboard/components/ticket";
import prismaClient from "@/lib/prisma"
import { getServerSession } from 'next-auth'
import  { authOptions } from '@/lib/auth'


export default async function Dashboard() {

    const session = await getServerSession(authOptions)

    const tickets = await prismaClient.ticket.findMany({
        where: {
            userId: session?.user.id,
            status: "ABERTO"
        },
        include:{
            customer: true
        },
        orderBy:{
            createdAt: "asc"
        }
    })

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold ">
                        Chamados
                    </h1>
                    <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                        Novo Chamado
                    </Link>
                </div>
                {tickets.length <= 0 && (
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-2xl font-light text-center w-full mt-5">Nenhum chamado cadastrado, <br/>clique no botão abaixo para cadastrar um novo chamado</p>
                        <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                            Cadastrar chamado
                        </Link>
                    </div>
                )}

                {tickets.length > 0 && (
                    <table className="min-w-full my-2">
                        <thead>
                            <tr>
                                <th className="font-medium text-left pl-2">Cliente</th>
                                <th className="font-medium text-left hidden sm:block">Data</th>
                                <th className="font-medium text-center">Status</th>
                                <th className="font-medium text-center">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <TicketItem 
                                    key={ticket.id} 
                                    ticket={ticket}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </Container>
    )
}