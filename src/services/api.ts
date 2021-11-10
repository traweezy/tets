import HttpClient from './http-client';

class Api extends HttpClient {
  public constructor() {
    super('https://rickandmortyapi.com/api');
  }

  public getLocations = async (): Promise<PickedRickAndMortyLocation[]> => {
    const response = await this.instance.get<
      QueryResult<PickedRickAndMortyLocation>
    >(`/location`);

    const { pages } = response.data.info;

    const allCharacters = await Promise.all(
      Array.from(Array(pages).keys()).map(page =>
        this.instance
          .get<QueryResult<PickedCharacter>>(`/location?page=${page + 1}`)
          .then(({ data }) => data.results),
      ),
    );

    return allCharacters.flat();
  };

  public getCharacters = async (): Promise<PickedCharacter[]> => {
    const response = await this.instance.get<QueryResult<PickedCharacter>>(
      `/character`,
    );

    const { pages } = response.data.info;

    const allCharacters = await Promise.all(
      Array.from(Array(pages).keys()).map(page =>
        this.instance
          .get<QueryResult<PickedCharacter>>(`/character?page=${page + 1}`)
          .then(({ data }) => data.results),
      ),
    );

    return allCharacters.flat();
  };
}

export default Api;
