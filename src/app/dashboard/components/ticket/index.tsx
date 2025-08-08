"use client"
import { useContext } from 'react'
import { TicketProps } from '@/utils/ticket.type'
import { FiCheckSquare, FiFile} from 'react-icons/fi'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { ModalContext } from '@/providers/modal'


interface TicketItemProps{
    ticket: TicketProps
}


export function TicketItem({ticket} : TicketItemProps){

    const {handleModalVisible, setDetailsTicket} = useContext(ModalContext)

    const router = useRouter()
    async function handleChangeStatus() {
        try {
            const response = await api.patch('/api/ticket', {
                id: ticket.id,
                customerId: ticket.customerId,
                userId: ticket.userId
            })

            router.refresh()
        } catch (error) {
            
        }
    }

    function handleOpenModal(){
        handleModalVisible()
        setDetailsTicket(ticket)
    }

    return(
        <>
            <tr className='border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-200'>
                <td className="text-left pl-2">{ticket.customer?.name}</td>
                <td className="text-left hidden sm:table-cell">{ticket.createdAt?.toLocaleDateString("pt-br")}</td>
                <td className="text-center"><span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span></td>
                <td className="text-center">
                    <button className='mr-2' onClick={handleChangeStatus}>
                        <FiCheckSquare size={24} color='#616161'></FiCheckSquare>
                    </button>
                    <button onClick={handleOpenModal}>
                        <FiFile size={24} color='#3b82f6'></FiFile>
                    </button>
                </td>
            </tr>
        </>
    )
}