const index = require('express').Router()
const {v4: uuidv4} = require('uuid')
const path = require('path')
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

index.get('/notes', (req, res) =>{
    readFromFile(path.join(__dirname, '../db/db.json')).then((data) => res.json(JSON.parse(data)))
})

index.post('/notes', async (req, res) => {
    let body = req.body
    body.id = uuidv4()
    readAndAppend(body, path.join(__dirname, '../db/db.json'))
    let updatedDb = await readFromFile(path.join(__dirname, '../db/db.json'))
    updatedDb = updatedDb.toString('utf8')
    res.json(updatedDb)
})

index.delete('/notes/:id', async (req,res) => {
    let id = req.params.id
    let data = await readFromFile(path.join(__dirname, '../db/db.json')).then((data) => {return JSON.parse(data)})
for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if(element.id === id){
        data.splice(i, 1)
        writeToFile(path.join(__dirname, '../db/db.json'), data)
        console.log('spliced')
        return res.send(`id: ${id}, was deleted`)
    }

};
res.send(`err: id-${id} not found`)
    console.log(data)

})

exports.index = index