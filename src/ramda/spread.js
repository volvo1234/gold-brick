import { converge, merge, dissoc, propOr, prop } from 'ramda';


// only take 2 input, the last will attach or overwrite the first
// or the second will add new slice
const first = { name: 'yang', age: 100};
//const second = { age: 120 };
const third = { eyecolor: 'black'};

// dissoc will remove one slice, slice is my model
// and merge will add one slice

const data = {
  a: 1,
  b: {
    c: 3,
    d: 4
  }
};

const spread = converge(merge, [dissoc, propOr({})]);

const test = () => {
  console.log('test prop: ', prop('goodla', first));
  console.log('test propOr: ', propOr('return this one', 'name',  first));

  console.log('test spread: ', spread('b', data));


};

export default test;

