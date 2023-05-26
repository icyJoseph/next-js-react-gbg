# Pokemon Adventure

## About

This is a demo made for React Gothenburg MeetUp.

Users can catch pokemon, see them on a collection, or explore a Pokedex.

There's no database backing this up. A very bad, but simple design decision was made.

Pokemon are stored on a cookie with this shape:

```json
{
  "pokemon": "x00x9x..210"
}
```

> This application supports 251 Pokemon.

- `x` means the pokemon has not been seen
- `0` means, seen, but not captured,
- `1`..`9`, means how many times it has been captured. After 9 of the same species, we stop counting.

## Supporting Slide Deck

You can find a supporting slide deck about Next.js at:

- https://windy-fold.surge.sh
