import React, { Component } from 'react';
import 'rxjs';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Input, Header } from 'semantic-ui-react';

//////////////////////// state management with RxJS ////////////////////////////

const myInput$ = new Subject;

const handlers = {
  myInput: val => myInput$.next(val)
};

const myInputCmd = paragraph => state => Object.assign(state, { paragraph });
const appState$ = Observable.merge(myInput$.map(myInputCmd)).scan((acc, c) => c(acc), {});


////////////////////// React Components /////////////////////////////////////////////////


const PalindromeWord = word => <Header as='h3' color="green">{word}</Header>
const NonPalindromeWord = word => <Header as='h3' color="black">{word}</Header>


const MyParagrahp = paragraph => {
  let stringArray;

  if(paragraph){
    stringArray = paragraph.split(/(\s+)/);
  }

  const _isPalindrome = word => {
    const removeChar = word.replace(/[^A-Z0-9]/ig, "").toLowerCase();
    const checkPalindrome = removeChar.split('').reverse().join('');
    return (removeChar === checkPalindrome);
  };

  const displayAll = (stringArray) => {
    if(stringArray ) {
      return stringArray.map(word => _isPalindrome(word) ? PalindromeWord(word) : NonPalindromeWord(word))
    }
  };

  const _handleChange = e => {
    handlers.myInput(e.target.value);
  };
  return (
      <div>
        <Input focus placeholder='Please enter a paragraph ...' onChange={_handleChange} style={{width: '600px'}}/>
        { displayAll(stringArray) }
      </div>)
};

class App extends Component {
  state = {};

  componentDidMount() {
    appState$.subscribe(val => {
      this.setState(val);
    });
  }

  render() {
    return MyParagrahp(this.state.paragraph)
  }
}


export default App;
