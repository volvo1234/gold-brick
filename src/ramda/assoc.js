import { assoc } from 'ramda';

const data = {
  first: '123',
  second: '456'
};

const myFn = assoc('first', 789);


//  just add something

const test = () => {
  console.log('result: ', myFn(data));
};

export default test;