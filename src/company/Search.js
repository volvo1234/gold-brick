import React from 'react';
import { Input, Grid, Button } from 'semantic-ui-react';
import { handlers } from '../../controls/search/search';
import { lensPath, compose, view } from 'ramda';
import SearchExtension from './SearchExtension';


const MyComponent = fn => Component => props => {
  const local = fn(props);
  return <Component { ...local } />
};

const initFn = props => {
  return {
    //content: view(lensPath([0, 'content']), props) || 'Card',
    content: view(lensPath([0, 'content']), props),
    primary: true,
    loading: view(lensPath([0, 'loader']), props),
    onClick: handlers[view(lensPath([0, 'searchAction']), props)],
  }
};

const contentFn = props => {};

function withContent(fn) {
  return function(Component) {
    return function(props) {
      function initInputFn(props) {
        return {
          style: {width: '100%'},
          focus: true,
          //placeholder: view(lensPath([0, 'placeholder']), props) || 'Input Card #',
          placeholder: view(lensPath([0, 'placeholder']), props),
          onChange: e => handlers[view(lensPath([0, 'inputAction']), props)](e.target.value),
          value: view(lensPath([0, 'inputValue']), props)
        }
      }
      return (<Grid textAlign="left" verticalAlign="middle" padded="vertically">
        <Grid.Column width={7} className="no-padding">
          {MyComponent(initInputFn)(Input)(props)}
        </Grid.Column>

        <Grid.Column width={1} className="no-padding">
          {SearchExtension(props)}
        </Grid.Column>

        <Grid.Column width={1}>
          {Component(props)}
        </Grid.Column>
      </Grid>)
    }
  }
}


const Search =   compose(withContent(contentFn))(MyComponent(initFn)(Button));
export default Search;


/*

import React from 'react';
import { Input, Grid, Button } from 'semantic-ui-react';
import { handlers } from '../../controls/search/search';
import { lensPath, compose, view } from 'ramda';
import SearchExtension from './SearchExtension';


const MyComponent = fn => Component => props => {
  const local = fn(props);
  return <Component { ...local } />
};

const initFn = props => {
  return {
    content: view(lensPath([0, 'content']), props) || 'Search',
    primary: true,
    onClick: handlers[view(lensPath([0, 'searchAction']), props)],
  }
};

const contentFn = props => {};

function withContent(fn) {
  return function(Component) {
    return function(props) {
      function initInputFn(props) {
        return {
          style: {width: '380px'},
          focus: true,
          placeholder: view(lensPath([0, 'placeholder']), props) || 'Enter External Account Number..',
          onChange: e => handlers[view(lensPath([0, 'inputAction']), props)](e.target.value),
          value: view(lensPath([0, 'inputValue']), props)
        }
      }
      return (<Grid>
        <Grid.Column width={7}>
          {MyComponent(initInputFn)(Input)(props)}
        </Grid.Column>

        <Grid.Column width={1}>
          {SearchExtension(props)}
        </Grid.Column>

        <Grid.Column width={1}>
          {Component(props)}
        </Grid.Column>
      </Grid>)
    }
  }
}


const Search =   compose(withContent(contentFn))(MyComponent(initFn)(Button));
export default Search;


*/