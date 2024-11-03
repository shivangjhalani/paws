import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { useAuth } from "../context/AuthContext"

const NavItem = ({ to, children }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <Link to={to}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const Navbar = () => {
  const { isAuthenticated, userType, logout } = useAuth();

  return (
    <div>
      <nav className="flex items-center justify-between p-4">
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
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/faq">FAQ</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button className="mr-4">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Join paws</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/dashboard/${userType}`}>
                <Button variant="outline" className="mr-4">Dashboard</Button>
              </Link>
              <Button onClick={logout}>Logout</Button>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
