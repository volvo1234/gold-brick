import { keys, compose, is, pickBy } from 'ramda';

// get obj's function name

const obj = {
  foo: true,
  bar: function() {},
  baz: function() {},
};

const getName = compose(keys, pickBy(is(Function)));

const test = () => {
  console.log('results: ', getName(obj));

};

export default test;