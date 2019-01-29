import axios from 'axios';

export default async function send(data: object) {
try{
    const result = await axios.post('http://localhost:3000/submit', data);
    return result;
  }catch(err) {
    return err;
  }
}
