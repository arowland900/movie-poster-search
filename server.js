require('dotenv').config();

const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  axios = require('axios'),
  PORT = 3000

// builds an object that can make HTTP requests:
const apiClient = axios.create()

app.use(express.static('public'))

app.get("/", (req, res) => {
    console.log("REQUEST RECEIVED, CONTACTING MOVIE DATABASE...")
    const apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY}&`
    apiClient({ method: "get", url: apiUrl }).then((dataThatCameBack) => {
      console.log(dataThatCameBack.data)
      res.json({ message: "something is working"})
    })
})

app.get('/search/:term', (req, res) => {
    var term = req.params.term

    console.log("REQUEST RECEIVED, CONTACTING MOVIE DATABASE...")
    const apiUrl = `http://www.omdbapi.com/?t=${term}&apikey=${process.env.API_KEY}&`
    apiClient({ method: "get", url: apiUrl }).then((dataThatCameBack) => {
      console.log(dataThatCameBack.data["Poster"])
      var imgUrl = dataThatCameBack.data["Poster"]
      res.send(`<img src='${imgUrl}' />`)
    })
})



app.listen(PORT, (err) => {
    console.log(err || `Server running on ${PORT}.`)
  })