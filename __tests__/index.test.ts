
import { req } from '../src/assets/ts/index';
import nock = require('nock');

describe('default frontend errors', () => {

  nock('http://localhost:3000')
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .post('/submit')
    .reply(200);

  it('should throw an error due to missing inlut element', async () => {
    // spyOn(console, 'error'); // In tests that you expect errors
    expect.assertions(1);
    let error: any;
    try {
      await req(null, null);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(Error('Input element does not exist'));
  });
  it('should throw an error due to missing elements', async () => {
    const ele = document.createElement('input');
    // spyOn(console, 'error'); // In tests that you expect errors
    expect.assertions(1);
    let error: any;
    try {
      await req(ele, null);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(Error('Target element does not exist'));
  });
});

describe('error responses', () => {

  it.skip('should return an error', async () => {
    nock('http://localhost:3000')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .post('/submit')
      .reply(function (url, body, cb) {
        console.log(url);
        console.log(body);
        if(cb !== undefined){
          cb(null, [500, {}]);
        }
      });
    const inputEle = document.createElement('input');
    const targetEle = document.createElement('code');

    // spyOn(console, 'error'); // In tests that you expect errors
    expect.assertions(1);
    let error: any;
    try {
      await req(inputEle, targetEle);
    } catch (err) {
      error = err;
    }
    expect(error).toEqual(Error('Target element does not exist'));
  });
});

describe('setting content', () => {
  nock('http://localhost:3000')
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .post('/submit')
    .reply(200, { code: 0, data: { input: 'foo' }, errors: '' });

  it('should set content of target element', async () => {
    const inputEle = document.createElement('input');
    const targetEle = document.createElement('code');
    await req(inputEle, targetEle);
    const ele = document.querySelector('code');
    if (ele !== null) {
      expect.assertions(1);
      expect(ele.innerHTML).toBe('foo');
    }else{
      console.log('Element was not creted');
    }
  });
})