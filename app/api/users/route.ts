import { NextResponse } from 'next/server'
import prisma from '@/lib/db'


interface CreateUserRequest{
Email: string
Password:string
}

export async function POST (req:Request){
    try{
      const body = await  req.json() as CreateUserRequest
      const { Email, Password } = body
    
      if 
      (!Email || !Password) {
        return new Response("Missing required fields", { status: 400 });
      }

      const users = await prisma.course.create({
        data: {
            Email,
            Password,
        }
      })
      return NextResponse.json(users)
    }catch(error){
        console.log('account error post', error)
        return new Response("An error occurred", {status:500})
    }
}