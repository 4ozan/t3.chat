import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default async function DashboardPage() {

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
  <div className="w-full max-w-md flex flex-col gap-2 p-4">
    <Textarea  className="h-2.5" placeholder="Type your message here." />
    <Button>Send</Button>
  </div>
</div>
  )
}


