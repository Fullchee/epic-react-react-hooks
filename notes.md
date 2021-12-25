useState: can accept a function which is a lazy initializer

- if you just want to calculate the initial state once (digits of pi)

useEffect

- fetch: forgot to return early if pokemonName is null
- I forgot about having a status variable
  - helps with determining what to display
  - https://kentcdodds.com/blog/stop-using-isloading-booleans
- the way that Kent does a sort of manual TDD where he always gets something to display
  - eg: create a variable with a stub error message to make sure that the error shows up
- Error Boundaries
  - can take in a FallbackComponent arg
- 
