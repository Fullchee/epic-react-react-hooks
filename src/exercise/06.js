// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
} from '../pokemon'

const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  RESOLVED: 'RESOLVED',
}

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState('')
  const [status, setStatus] = React.useState(STATUS.IDLE)
  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setStatus(STATUS.PENDING)
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemon(pokemonData)
        setStatus(STATUS.RESOLVED)
      })
      .catch(error => {
        setStatus(STATUS.REJECTED)
        setError(error)
      })
    return () => {
      // cleanup
    }
  }, [pokemonName])

  if (status === STATUS.IDLE) {
    return 'Submit a pokemon'
  }
  if (status === STATUS.PENDING) {
    return <PokemonInfoFallback name={pokemonName} />
  }
  if (status === STATUS.REJECTED) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
  if (status === STATUS.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />
  }
  throw new Error("Shouldn't get here")
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
