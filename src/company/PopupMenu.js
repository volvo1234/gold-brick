import React from 'react';
import { handlers } from '../../controls/search/search';
import { lensPath, compose, view, lensProp } from 'ramda';
import "react-table/react-table.css";
import { Button, Popup, Menu } from 'semantic-ui-react';

import { Observable } from "rxjs/Observable";


function MenuWrapper(Component) {
  return function(children) {
    return <Component vertical>{children}</Component>
  }
}

const getContentFn = props => view(lensPath(['selections']), props);

function withMenuItem(fn) {
  return function(Component) {
    return function(props) {
      const items = fn(props);
      const cardNumber = view(lensPath(['cardNumber']), props);

      function menuItem(item) {
        const _handleItemClick = cardNumber  => (e, { name }) => handlers[item.handler](cardNumber);
        return <Menu.Item name={item.name} content={item.content} onClick={_handleItemClick(cardNumber)} />
      }

      const children = !items?  null:items.map(menuItem);
      return Component(children);
    }
  }
}

const getPopupInfoFn = props => {};

function withPopup(fn) {
  return function(Component) {
    return function(props) {
      const local = {};
      if(!view(lensProp('isPopupOpen'), props)) local.open = view(lensProp('isPopupOpen'), props);
      return <Popup trigger={<Button circular icon='setting'  />}
                    on="click" {...local} >{Component(props)}</Popup>
    }
  }
}

const PopupMenu = compose(
    withPopup(getPopupInfoFn),
    withMenuItem(getContentFn)
)(MenuWrapper(Menu));

export default PopupMenu;

/*
import React from 'react';
import { handlers } from '../../controls/search/search';
import { lensPath, compose, view } from 'ramda';
import "react-table/react-table.css";
import { Button, Popup, Menu } from 'semantic-ui-react';


function MenuWrapper(Component) {
  return function(children) {
    return <Component vertical>{children}</Component>
  }
}

const getContentFn = props => view(lensPath(['selections']), props);

function withMenuItem(fn) {
  return function(Component) {
    return function(props) {
      const items = fn(props);
      const cardNumber = view(lensPath(['cardNumber']), props);

      function menuItem(item) {
        const _handleItemClick = cardNumber  => (e, { name }) => handlers[item.handler](cardNumber);
        return <Menu.Item name={item.name} content={item.content} onClick={_handleItemClick(cardNumber)} />
      }

      const children = !items?  null:items.map(menuItem);
      return Component(children);
    }
  }
}

const getPopupInfoFn = props => {};

function withPopup(fn) {
  return function(Component) {
    return function(props) {
      return <Popup trigger={<Button circular icon='setting' />} on="click">{Component(props)}</Popup>
    }
  }
}

const PopupMenu = compose(
    withPopup(getPopupInfoFn),
    withMenuItem(getContentFn)
)(MenuWrapper(Menu));

export default PopupMenu;


*/