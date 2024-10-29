import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import FAQ from "./pages/FAQ"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

export default function App() {
  
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/my-pets")
    console.log(response.data.fruits)
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <Home/>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  )
}
