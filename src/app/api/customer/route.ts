import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import  { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'

// Rota para buscar um Clustomer pelo email
export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if(!email || email === ""){
        return NextResponse.json({message: "Nenhum cliente encontrado com o e-mail informado"}, {status: 400})
    }

    try {
        const findCustomer = await prismaClient.customer.findFirst({
            where: {
                email: email as string
            }
        })

        return NextResponse.json(findCustomer)

    } catch (error) {
        return NextResponse.json({message: "Nenhum cliente encontrado com o e-mail informado"}, {status: 400})
    }
}

//Rota para excluir um cliente
export async function DELETE(request: Request){
    const session = await getServerSession(authOptions)
    
    if(!session || !session.user){
        return NextResponse.json({message: "Não autorizado"}, {status: 401})
    }

    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get("idCustomer")
    const userId = searchParams.get("userId")

    if(!customerId || !userId){
        return NextResponse.json({message: "Não autorizado"}, {status: 401})
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where: {
            customerId: customerId as string
        }
    })

    if(findTickets){
        return NextResponse.json({message: "Não autorizado"}, {status: 401})
    }

    try {
        await prismaClient.customer.delete({
            where: {
                userId: userId as string,
                id: customerId as string
            }
        })
        return NextResponse.json({message: "Cliente excluido com sucesso"})
    } catch (error) {
        return NextResponse.json({message: "Falha ao exluir o cliente"}, {status: 400})   
    }
}

// Rota para cadastrar um cliente
export async function POST(request: Request){
    const session = await getServerSession(authOptions)
    
    if(!session || !session.user){
        return NextResponse.json({message: "Não autorizado"}, {status: 401})   
    }

    const {name, email, phone, address, userId} = await request.json()

    try {
        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address : address ? address : "",
                userId
            }
        })
        return NextResponse.json({message: "Cliente cadastrado com sucesso"})
    } catch (error) {
        return NextResponse.json({message: "Falha ao criar o cliente"}, {status: 400})   
    }
}