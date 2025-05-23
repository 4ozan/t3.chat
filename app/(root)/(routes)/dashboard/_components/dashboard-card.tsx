import { LucideIcon, PersonStanding } from "lucide-react"

interface DashboardCardProps {
name:String
Icon:LucideIcon
}


export default function DashboardCard ({name,Icon}: DashboardCardProps) {
  return (
    <div>
        <p>{name}</p>
    < Icon />
    </div>
  )
}