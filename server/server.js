const express = require('express')

const cors = require('cors')
const corsOptions = {
  origin: ["http://localhost:5173"],
}

const app = express()

app.use(cors(corsOptions))

app.get("/api", (req, res) => {
  res.json({"fruits": ["apple", "orange", "banana", "strawberry"]})
})

app.listen(8080, () => {
  console.log("Server started on port 8080")
})
