import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import  { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'

//Rota para atualizar um ticket
export async function PATCH(request: Request){
    const session = await getServerSession(authOptions)
    
    if(!session || !session.user){
        return NextResponse.json({error: "Não autorizado"}, {status: 401})
    }
    
    const {id, customerId, userId} = await request.json()

    try {
        const findTickets = await prismaClient.ticket.findFirst({
            where: {
                customerId: customerId as string,
                userId: userId as string,
                id: id as string
            }
        })

        if(!findTickets){
            return NextResponse.json({error: "Falha ao atualizar o chamado"}, {status: 400})
        }

        try {
            await prismaClient.ticket.update({
                where:{
                    id, userId, customerId
                },
                data: {
                    status: "FECHADO"
                }
            })
            return NextResponse.json({message: "Chamado atualizado com sucesso"})
        } catch (error) {
            return NextResponse.json({error: "Falha ao criar o chamado"}, {status: 400})   
        }
    } catch (error) {
        return NextResponse.json({error: "Falha ao criar o chamado"}, {status: 400})   
    }
}


export async function POST (request: Request){
    
    const {customerId, name, description} = await request.json()

    console.log(customerId, name, description)
    if(!name || !description || !customerId) {
        return NextResponse.json({error: "Falha ao criar o chamado 2"}, {status: 400})
    }

    try {

        const findUserId = await prismaClient.customer.findFirst({
            where: {
                id: customerId as string,
            }
        })

        if(findUserId === null){
            return NextResponse.json({error: "Falha ao criar o chamado"}, {status: 400})   
        }

        await prismaClient.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: 'ABERTO',
                userId: findUserId.userId
            }
        })

        return NextResponse.json({message: "Chamado criado com sucesso"})

    } catch (error) {
        return NextResponse.json({error: "Falha ao criar o chamado"}, {status: 400})   
    }
}