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
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-paw-print"><circle cx="11" cy="4" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="20" cy="16" r="2" /><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" /></svg>
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
