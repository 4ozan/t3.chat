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

      const user = await prisma.user.create({
        data: {
          email: Email,
          password: Password,
        }
      });

      return NextResponse.json(user);
    }catch(error){
        console.log('account error post', error)
        return new Response("An error occurred", {status:500})
    }
}