import { Container } from "@/components/container";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { NewCustomerForm } from "../components/form";
import { getServerSession } from 'next-auth'
import  { authOptions } from '@/lib/auth'

export default async function NewCustomer(){
    const session = await getServerSession(authOptions)

    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2">
                <div className="flex items-start gap-3 flex-col">
                    <Link href="/dashboard/customer" className="bg-gray-900 px-4 py-1 text-white rounded flex gap-2 items-center">
                        <FiArrowLeft size={16} color="#fff"></FiArrowLeft>
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold ">
                        Novo Cliente
                    </h1>
                </div>
                <NewCustomerForm userId={session?.user.id as string}/>
            </main>
        </Container>
    )
}