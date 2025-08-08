"use client"
import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock} from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

export function Header() {

    const {status, data} = useSession()

    async function handleLogin(){
        await signIn()
    }

    async function handleLogout(){
        await signOut()
    }

    return (
        <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
            <div className="flex justify-between w-full items-center max-w-7xl mx-auto">
                <Link
                    href="/"
                >
                    <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
                        <span className="text-blue-500">DEV</span> Controle
                    </h1>
                </Link>

                {status === "loading" && (
                    <button className="animate-spin">
                        <FiLoader size={26} color="#4b5563"></FiLoader>
                    </button>
                )}

                {status === "unauthenticated" && (
                    <button onClick={handleLogin}>
                        <FiLock size={26} color="#4b5563"></FiLock>
                    </button>
                )}

                {status === "authenticated" && (
                    <div className="flex gap-4 items-baseline">
                        <Link href="/dashboard">
                            <FiUser size={26} color="#4b5563"></FiUser>
                        </Link>
                        <button  onClick={handleLogout}>
                            <FiLogOut size={26} color="#e42e00"></FiLogOut>
                        </button>
                    </div>
                )}

            </div>
        </header>
    )
}