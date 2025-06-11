'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent form submission
    
    try {
      // Here you would typically make your authentication request
      // For now, we'll simulate a successful login by setting a cookie
      document.cookie = 'isAuthenticated=true; path=/;'
      
      // Navigate to dashboard after successful login
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#F2E4F4]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-[#E33F86]">Welcome to T3.Chat</CardTitle>
          <CardDescription>
           <p className="text-[#E33F86]">sign in below (we ll increase your limits if you do😘)</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="bg-[#F2E4F4]" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button 
                  onClick={handleClick} 
                  variant="outline" 
                  className="w-full bg-[#E33F86] text-white hover:bg-[#C25A8C] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
