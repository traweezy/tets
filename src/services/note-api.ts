import HttpClient from './http-client';

class NoteApi extends HttpClient {
  public constructor() {
    super('https://jsonplaceholder.typicode.com');
  }

  public createNote = async (payload: NotePayload): Promise<void> =>
    this.instance.post('/posts', payload);
}

export default NoteApi;
