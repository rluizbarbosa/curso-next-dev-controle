export interface CustomerProps{
    id: string
    name: string
    phone: string
    email: string
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
}