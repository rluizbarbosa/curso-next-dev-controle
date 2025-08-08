import { ReactNode } from "react";
import { DashboardHeader } from "./components/header";
import { getServerSession } from 'next-auth'
import  { authOptions } from '@/lib/auth'
import { redirect } from "next/navigation";

export default async function DashboradLayout({ children } : { children : ReactNode}){
    const session = await getServerSession(authOptions)
    
    if(!session || !session.user){
        redirect("/")
    }
    
    return (
        <>
            <DashboardHeader />
            {children}
        </>
    )
}