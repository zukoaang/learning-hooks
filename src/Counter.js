import React, { useState, useEffect } from 'react';

export default () => {
  const [ count, setCount ] = useState(0)
  const [ person, setPerson ] = useState(null)

  const increment = () => setCount( count + 1 )

  useEffect(() => {
    document.title = `The count is ${ count }`
    async function fetchData() {
      const res = await fetch('https://api.randomuser.me/')
      const data = await res.json()
      const [ item ] =  data.results
      console.log(item)
      setPerson(item)
    }
    fetchData()
  }, [count])

  return (
    <div>
      <p>The count is { count }</p>
      <button onClick={ increment }>Increment</button>
      { person && <div>{ person.name.title } { person.name.first } { person.name.last }</div> }
    </div>
  )
}