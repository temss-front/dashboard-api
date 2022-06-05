import express from "express"

const port = 8000
const hostname = "http://5.63.155.234"

const server = express()

server.get("/hello", (req, res) => {
    res.send("Дима уходи!")
})


server.listen(port, hostname, () => {
    console.log(`Server starts on ${hostname}:${port}`)
})