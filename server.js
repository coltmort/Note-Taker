const express = require('express')
const path = require('path')
const {index} = require('./Develop/routes/index')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', index)
app.use(express.static('./Develop/public'))

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 👂`)
})