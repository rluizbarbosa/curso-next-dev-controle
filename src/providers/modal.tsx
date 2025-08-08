"use client"
import React, { createContext, ReactNode, useState} from 'react'
import { TicketProps } from '@/utils/ticket.type'
import { ModalTicket } from '@/components/modal'


interface ModalContextData{
    visible: boolean
    handleModalVisible: () => void
    setDetailsTicket: (ticket: TicketProps) => void
    ticket: TicketProps | undefined
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({ children } : {children : ReactNode}) => {

    const [visible, setVisible] = useState(false)
    const [ticket, setTicket] = useState<TicketProps>()


    function handleModalVisible(){
        setVisible(!visible)
    }

    function setDetailsTicket(ticket: TicketProps){
        setTicket(ticket)
    }

    return (
        <ModalContext.Provider value={{
            visible,
            handleModalVisible,
            setDetailsTicket,
            ticket
        }}>
            {visible && (
                <ModalTicket></ModalTicket>
            )}
            {children}
        </ModalContext.Provider>
    )
}