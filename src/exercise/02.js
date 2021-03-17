// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (
  key,
  initialValue,
  {serialize = JSON.stringify, deserialize = JSON.parse},
) => {
  const [item, setItem] = React.useState(() => {
    const localStorageValue = window.localStorage.getItem(key)
    if (typeof localStorageValue !== undefined) {
      deserialize(localStorageValue)
    }
    // expensive init computation (more expensive than localStorage.get())
    // give it an init function that only gets called on init
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })
  React.useEffect(() => {
    window.localStorage.setItem(serialize(key), item)
  }, [key, item, serialize])

  return [item, setItem]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [name, setName] = useLocalStorageState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
