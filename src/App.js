import React, { useState } from 'react';
import './App.css'
import Counter from './Counter'

function Todo({ todo, index, complete, remove }) {
  return <div className='todo' style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
    { todo.text }
    <div>
      <button onClick={ () => complete(index) }>Complete</button>
      <button onClick={ () => remove(index) }>X</button>
    </div>
  </div>
}

function TodoForm({ add }) {
  const [ value, setValue ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!value) return
    add(value)
    setValue('')
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input 
        type='text' 
        className='add-todo' 
        value={value} 
        onChange={ ({ target }) => setValue(target.value) } 
        placeholder='Type new todo...'
      />
      <button type='submit' onClick={ handleSubmit } >Add</button>
    </form>
  )
}

function App() {
  const [ todos, setTodos ] = useState([
    {
      text: 'learn hooks!',
      completed: false
    },
    {
      text: 'brag about it',
      completed: false
    },
    {
      text: 'get back to work',
      completed: false
    }
  ])

  const addTodo = text => {
    const newState = [ ...todos, { text } ]
    setTodos(newState)
  }

  const complete = index => {
    const newState = [...todos]
    newState[index].completed = true
    setTodos(newState)
  }
  
  const removeTodo = index => {
    const newState = [...todos]
    newState.splice(index, 1)
    setTodos(newState)
  }

  return (
    <div className='app'>
      <div className='todo-list'>
        {todos.map((todo, i) => (
          <Todo remove={ removeTodo } complete={ complete } key={ i } index={ i } todo={ todo } />
        ))}
        <TodoForm add={ addTodo } />
      </div>
      <hr />
      <h3>Counter</h3>
      <Counter />
    </div>
  )
}

export default App