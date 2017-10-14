import { converge, sum, length, divide } from 'ramda';

const data = [ 1, 2, 3, 4, 5, 6, 7];

const average = converge(divide, [sum, length]);

const test = () => {
  console.log('test result: ', average(data));
};

export default test;