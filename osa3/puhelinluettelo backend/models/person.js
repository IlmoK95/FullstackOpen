const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)
mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


  const NumberValidator =(v)=>{

    const occurances = v.split("-").length - 1
    if (occurances > 1){
      return false 
    }
    if (/\d{3}-\d{4}/.test(v) || /\d{2}-\d{5}/.test(v)){
      return true
    }

    return false
  }
  

const personSchema = new mongoose.Schema({
  name: { 
  type: String,
  minlength: 3,
  required: true},
 number: { 
  type: String,
  minlength: 8,
  validate: NumberValidator,
  required: true}
})



personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)