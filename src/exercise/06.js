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

class ErrorBoundary extends React.Component {
  state = {error: null}

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {error}
  }
  render() {
    const {error} = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }
    return this.props.children
  }
}

function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: STATUS.IDLE,
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: STATUS.PENDING})
    fetchPokemon(pokemonName)
      .then(pokemon => {
        setState({status: STATUS.RESOLVED, pokemon})
      })
      .catch(error => {
        setState({status: STATUS.REJECTED, error})
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
    throw error
  }
  if (status === STATUS.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />
  }
  debugger
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
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
