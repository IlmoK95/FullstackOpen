import React, { useState, useEffect } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {

  const [data, setData] = useState(null)
  const [found, setFound] = useState(false)

  useEffect(()=>{

        const countryAPI = async ()=>{

            const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
            const response = await fetch(url)
            if (!response.ok){
                setData(null)
                setFound(false)
                throw new Error(`Response status: ${response.status}`)
                  
            }
            const result = await response.json()

            setData({name: result.name.common,
                     capital: result.capital,
                     population: result.population,
                     flag: result.flags.png })
            setFound(true)
        }
        countryAPI()

  }, [name])

  return name ? {data, found} : null

}

const Country = ({ country }) => {

  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App