

require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const person = require('./models/person')
morgan.token('POST_body', function (req, res) { return JSON.stringify(req.body)})
const app = express()


app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST_body'))
app.use(cors())
app.use(express.static('dist'))


const getDate =()=> {return `<p>${Date()}</p>`}


app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body 
    const person = {
      name: body.name,
      number: body.number,
    }
    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators : true, context : 'query' })
      .then(updatedPerson => {
        res.json(updatedPerson)
      })
      .catch(error => next(error))
  })

app.get('/info', (req, res) => {
    Person.count({})
    .then(count =>{
            res.send(`<p>Phonebook has ${count} persons</p>`+ getDate())
    })      
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person =>{
        if (person){
            res.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
        if (result!==null){
            res.status(204).end()
        }else{
            res.status(404).end()
        }
        
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {

    Person.find({}).then( persons =>{
       res.json(persons)
    })
})


app.post('/api/persons', (req, res, next) =>{

    const new_number = {...req.body}


     const person = new Person({
            name: new_number.name,
            number: new_number.number
            })          
    person.save().then(savedPerson => {
            res.json(savedPerson)
            })
            .catch(error => next(error))


})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name ==='ValidationError') {
        return response.status(400).json({ error: error.message})
    }
  
    next(error)
  }
  app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
