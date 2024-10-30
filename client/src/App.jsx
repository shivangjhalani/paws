import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import FAQ from "./pages/FAQ"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

// Create these new components
const ExplorePets = () => <div className="p-4">Explore Pets Page</div>;
const LikedPets = () => <div className="p-4">Liked Pets Page</div>;
const ListPets = () => <div className="p-4">List Pets Page</div>;
const AdopterDashboard = () => <div className="p-4">Adopter Dashboard</div>;
const RehomerDashboard = () => <div className="p-4">Rehomer Dashboard</div>;

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Auth routes - only accessible when logged out */}
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Signup />
                </ProtectedRoute>
              } 
            />
            
            {/* Adopter routes */}
            <Route 
              path="/explore" 
              element={
                <ProtectedRoute allowedUserTypes={['adopter']}>
                  <ExplorePets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/liked" 
              element={
                <ProtectedRoute allowedUserTypes={['adopter']}>
                  <LikedPets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/adopter" 
              element={
                <ProtectedRoute allowedUserTypes={['adopter']}>
                  <AdopterDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Rehomer routes */}
            <Route 
              path="/list-pets" 
              element={
                <ProtectedRoute allowedUserTypes={['rehomer']}>
                  <ListPets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/rehomer" 
              element={
                <ProtectedRoute allowedUserTypes={['rehomer']}>
                  <RehomerDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}
