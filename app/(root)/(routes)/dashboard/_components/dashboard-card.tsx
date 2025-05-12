import { LucideIcon } from 'lucide-react'

interface DashboardCardProps {
    label:string;
    description: string;
    password:string;
    Icon:LucideIcon;
    name:string;
    email:string;
}

export const DashBoardCard = ({
    label,
    description,
    name,
    email,
    Icon,
    password

} : DashboardCardProps) => {

    return(
<div className='bg-slate-100/50 shadow flex w-full flex-col gap-3 rounded-[5px] p-5'>
    <section className='flex justify-between gap-2'> 
        <p className='text sm'>
            {label}
            <Icon className='h-4 w-4' />
        </p> 
            
    </section>
    <section className='flex flex-col gap-1'>
<h2 className=' text-2xl font-bold'>{name}</h2>
<h2 className=' text-2xl font-bold'>{email}</h2>
<p className='text-sm'>{password}</p>
<p className='text-sm'>{description}</p>
    </section>
</div>

    )

}