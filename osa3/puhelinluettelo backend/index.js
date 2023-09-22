

let numbers = [
    {
      id: 1,
      name: "Olli Jokinen",
      number: "044-1246"
    },
    {
      id: 2,
      name: "Anna Purola",
      number: "004-12436"
    },
    {
      id: 3,
      name: "Jaakko Mäkelä",
      number: "014-56436"
    }
  ]


const express = require('express')
var morgan = require('morgan')
morgan.token('POST_body', function (req, res) { return JSON.stringify(req.body)})

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST_body'))



const PhoneBookInfo =()=> {return `<p>Phonebook has info for ${numbers.length} people</p>`}

const getDate =()=> {return `<p>${Date()}</p>`}

const CheckValidity =(req, res)=>{

    if (!req.body.name){
        return res.status(400).json({
            error: "no valid name"
        }), false
    }if (!req.body.number){
        return res.status(400).json({
            error: "no valid number"
        }), false
    }
    const name = numbers.filter(n => n.name === req.body.name)
    if (name.length>0){
        return res.status(400).json({
            error: "name must be unique"
        }), false
    }
    console.log("person is valid")
    return true

    

}

app.get('/info', (req, res) => {
    res.send(PhoneBookInfo() + getDate())    
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const number = numbers.find(n => String(n.id)=== id)

    if (!number) {
        return res.status(400).json({
            error: 'number does not exist'
        })
    }
    res.json(number)
})


app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const number = numbers.find(n => n.id=== id)
    res.json(number)

})

app.get('/api/persons', (req, res) => {
    const id = Number(req.params.id)
    const NewNumbers = numbers.filter(n => n.id !== id)
    res.json(NewNumbers)
})




app.post('/api/persons', (req, res) =>{

    const new_id = Math.floor(Math.random() * 10000)

    const new_number = {...req.body}

    
    if (!new_number) {
        return res.status(400).json({ 
          error: 'content missing' 
        })
      }
    if (CheckValidity(req, res)){
        console.log(new_number)
        new_number.id = new_id
        console.log(req.body)
        numbers = numbers.concat(new_number)
        res.json(numbers)

    }

})


const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server is running on ${PORT}`)

  })
