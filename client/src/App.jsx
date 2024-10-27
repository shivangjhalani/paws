import { Button } from "@/components/ui/button"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

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
    <div>
      <Button>Click me</Button>
      <div>
        <ul>
          {array.map((fruit, index) => {
            return <li key={index}>{fruit}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
