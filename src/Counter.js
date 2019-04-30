import React, { useState, useEffect } from 'react';

const useFetch = (url, count) => {
  const [ person, setPerson ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await fetch(url)
      const data = await res.json()
      const [ item ] =  data.results
      setPerson(item)
      setLoading(false)
    }
    fetchData()
  }, [count])

  return { person, loading }
}

export default () => {
  const [ count, setCount ] = useState(0)
  const { person, loading } = useFetch('https://api.randomuser.me/', count)

  const increment = () => setCount( count + 1 )

  useEffect(() => {
    document.title = `The count is ${ count }`
  }, [count])

  return (
    <div>
      <p>The count is { count }</p>
      <button onClick={ increment }>Increment</button>
      { loading ? <div> Component is loading ... </div> : <div>{ person.name.title } { person.name.first } { person.name.last }</div> }
    </div>
  )
}