import send from '../src/assets/ts/send';
import nock from 'nock';


describe('return values', () => {

  it('should return a status of 200', async () => {
    const body = {input:'data'};
    nock('http://localhost:3000')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/submit')
      .reply(200, body);
    expect.assertions(1);
    const res = await send(body);
    expect(res.status).toBe(200);
  });

  it('should return the same object', async () => {
    const body = {input:'data'};
    nock('http://localhost:3000')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/submit')
      .reply(200, body);
    expect.assertions(1);
    const res = await send(body);
    expect(res.data).toMatchObject(body);
  });
  it('should return an network error', async () => {
    spyOn(console, 'error'); // In tests that you expect errors
    const body = {input:'data'};
    nock('http://localhost:3000')
      .defaultReplyHeaders({})
      .post('/submit')
      .reply(200, '');
    expect.assertions(1);
    const res = await send(body);
    expect(res).toEqual(Error('Network Error'));
  });
});
