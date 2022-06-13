const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()
//declare variables
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Star-Trek-API'

//connect to mongo
MongoClient.connect(dbConnectionStr)
    .then(client =>{
        console.log(`connected to ${dbName} Database`)
        db = client.db(dbName)
    })
//set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//CRUD Methods

app.get('/', (req,res)=>{
   db.collection('Alien-Info').find().toArray()
   .then(data =>{
       let nameList = data.map(item => item.speciesName)
       console.log(nameList)
       res.render('index.ejs', {info: nameList})
   })
   .catch(error =>console.log(error))

})

// app.post('/api', (req,res)=>{
//     db.collection('Alien-Info').insertOne(req.body)
//     .then(result =>{
//         console.log('alien added')
//         res.redirect('/')
//     })
//     .catch(error=>console.log(error))
// })

app.post('/api', (req, res) => {
    db.collection('Alien-Info').insertOne(req.body)
    .then(result => {
        console.log('alien added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/updateEntry', (req,res)=>{
    console.log(req.body)
    Object.keys(req.body).forEach(key =>{
        if(req.body[key] === null || req.body[key] === undefined || req.body[key] === "" ){
            delete req.body[key] 
        }
    })
    console.log(req.body)
    db.collection('Alien-Info').findOneAndUpdate(
        {speciesName: req.body.speciesName},
        {
            $set: req.body
        }
       
    )
    .then(result =>{
        console.log(result)
        res.json('Success')
    })
    .catch(error => console.error(error))
})
app.delete('/deleteEntry', (req,res)=>{
    db.collection('Alien-Info').deleteOne(
        {speciesName: req.body.speciesName}
    )
    .then(result =>{
        console.log('Entry Deleted')
        res.json('Entry Deleted')
    })
    
    .catch(error => console.error(error))
})
//set up localhost on port
app.listen(process.env.PORT||PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})