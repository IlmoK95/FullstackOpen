const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


const url =
  `mongodb+srv://ilmok95:${password}@cluster0.aeyhzra.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)

const person = new Person({
  name: name,
  number: number,
})


if (process.argv.length===5){
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
else{
  console.log('---------------')
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {  
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
    console.log('---------------')
  })
  

}

