import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  // Custom component to handle navigation menu items
  const NavItem = ({ to, children }) => (
    <NavigationMenuItem>
      <NavigationMenuLink 
        className={navigationMenuTriggerStyle()}
        onClick={() => navigate(to)}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );

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
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/faq">FAQ</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            
            {/* Conditional navigation items based on auth state */}
            {auth.isAuthenticated && auth.userType === 'adopter' && (
              <>
                <NavItem to="/explore">Explore Pets</NavItem>
                <NavItem to="/liked">Liked Pets</NavItem>
              </>
            )}
            
            {auth.isAuthenticated && auth.userType === 'rehomer' && (
              <NavItem to="/list-pets">List Pets</NavItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Authentication buttons */}
        <div>
          {!auth.isAuthenticated ? (
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
              <Link to={`/dashboard/${auth.userType}`}>
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
