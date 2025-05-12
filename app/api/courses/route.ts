import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST (req:Request){
    try{
      const body = await  req.json()
      const { fullname, Email, Password } = body
    
      if (!fullname || !Email || !Password) {
        return new Response("Missing required fields", { status: 400 });
      }

      const course = await prisma.course.create({
        data: {
            fullname,
            Email,
            Password
        }
      })
      return NextResponse.json(course)
    }catch(error){
        console.log('COURSE_ERROR', error)
        return new Response("An error occurred", {status:500})
    }
}