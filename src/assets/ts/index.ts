import send from './send';
const form: HTMLFormElement | null = document.querySelector('#form');
const target: HTMLDivElement | null = document.querySelector('#target');
const input: HTMLInputElement | null = document.querySelector('#content');


export const req = (inputEle: HTMLInputElement | null, targetEle: HTMLElement | null) => {
  if (inputEle === null) {
    throw Error('Input element does not exist');
  }
  if (targetEle === null) {
    throw Error('Target element does not exist');
  }
  let input = inputEle.value;
  const response = send({ input: input });
  response.then((result) => {
    // console.log('result', result);
    targetEle.innerHTML = JSON.stringify(result, null, 2);
  }).catch(err => {
    console.error(err);
    throw err;
  });
}

if (form !== null) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    req(input, target);
  });// end of event listenr
}
