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

app.get('/search/:term', (req, res) => {
    var term = req.params.term

    console.log("REQUEST RECEIVED, CONTACTING MOVIE DATABASE...")
    const apiUrl = `http://www.omdbapi.com/?s=${term}&apikey=${process.env.API_KEY}&`
    apiClient({ method: "get", url: apiUrl }).then((dataThatCameBack) => {
    //   console.log(dataThatCameBack.data["Search"])
        results = ''
        dataThatCameBack.data["Search"].forEach((r) => {
            let imgUrl = r["Poster"]
            results += `<img src="${imgUrl}">`
        })
        res.send(results)
    })
})



app.listen(PORT, (err) => {
    console.log(err || `Server running on ${PORT}.`)
  })