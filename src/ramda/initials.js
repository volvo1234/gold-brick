import {compose, head, toUpper } from 'ramda';


// test 'split' first

const simple = compose(toUpper, head);
let initials = (name) => name.split(' ').map(simple).join('. ')

/*
let initials2 = compose(
    join('. '),
    map(compose(toUpperCase, head)),
    split(' ')
);
*/


const test = () => {
  console.log('result:', initials('this is interesting'));
  console.log('result2:', initials2('this is interesting'));
}

export default test;