import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import {  useRouter } from 'next/navigation'

 export default function Header() {
    const router = useRouter()
    const nextLogin = () => {
     router.push('/auth/login')
    }
  return (
    <div>
    <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Have An Account</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink onClick={nextLogin}>Login</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
  </div>
  )
}






 