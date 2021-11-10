/* eslint-disable @typescript-eslint/naming-convention */
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: ![Character];
  created: string;
}

interface RickAndMortyLocation {
  id: number;
  url: string;
  name: string;
  type: string;
  dimension: string;
  created: string;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: RickAndMortyLocation | PickedRickAndMortyLocation;
  location: RickAndMortyLocation | PickedRickAndMortyLocation;
  image: string;
  episode: string[];
  created: string;
}

interface QueryResult<T> {
  __typename: string;
  results: T[];
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
}

type PickedRickAndMortyLocation = Pick<
  RickAndMortyLocation,
  'id' | 'name' | 'type'
>;

type PickedCharacter = Pick<
  Character,
  | 'id'
  | 'name'
  | 'status'
  | 'status'
  | 'species'
  | 'type'
  | 'status'
  | 'gender'
  | 'image'
  | 'location'
>;
