import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from "./components/navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import FAQ from "./pages/FAQ"
import Contact from "./pages/Contact"

export default function App() {
  const [array, setArray] = useState([])
  
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api")
    setArray(response.data.fruits)
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
            <Home array={array} />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}
