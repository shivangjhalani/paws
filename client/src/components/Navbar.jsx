import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between p-4">
        {/* Logo and Brand */}
        <Link to="/">
        <div className="flex items-center gap-2">
          <div className="h-14 w-14">
            <img
              src="/paw.png"
              alt="Pawfect Logo"
              className="h-full w-full p-2 rounded-full"
            />
          </div>
          <span className="font-bold text-3xl">pawfect</span>
        </div>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/faq">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  FAQ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* CTA Button */}
        <div>
          <Link to="/login">
            <Button className="mr-4">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button>Join paws</Button>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
