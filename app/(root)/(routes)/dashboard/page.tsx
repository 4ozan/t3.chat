import { PersonStanding } from "lucide-react"
import { DashBoardCard } from "./_components/dashboard-card"
import prisma from "@/lib/db"
import { Course } from "@prisma/client"

export default async function DashboardPage() {
  const courses = await prisma.course.findMany()
  return (
    <div className="flex flex-col gap-4 w-full" >
      <h1 className="font-bold text-4xl mx-6 text-center">This is my dashboard</h1>
      <div className="mx-auto py-8">
        <div className="flex flex-col gap-4 w-full">
          <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xm:grid-cols-4">
            {
              courses.map((course: Course) => (
                <DashBoardCard 
                  key={course.id}
                  label="Account info"
                  Icon={PersonStanding}
                  description="This is my first dashboard"
                  name={course.fullname}
                  email={course.Email}
                  password={course.Password}
                />
              ))
            }
          </section>
        </div>
      </div>
    </div>
  )
}