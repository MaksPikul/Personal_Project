"use server"
import { auth, signOut } from '@/auth'

export const SignOut = async () => {
    
    await signOut();
}