import { length, values, pipe, compose } from 'ramda';

// how many pairs in one json object

const data = {first: 123, second: 456, third: 789};
const compute = pipe(values, length);
const compute1 = compose(length, values);

const test = () => {
  console.log('result: ', compute1(data));
};

export default test;