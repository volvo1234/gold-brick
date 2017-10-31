import React from 'react';
import { Button, Form, Popup } from 'semantic-ui-react';
import { handlers } from '../../controls/search/search';
import { lensPath, compose, view, lensProp } from 'ramda';
import ReloaditDetail from './ReloaditDetail'


function withPopup (Component1) {
  return function (Component2) {
    return function (props) {
      const local = {};
      if(!view(lensProp('isExtensionOpen'), props['0'])) local.open = view(lensProp('isExtensionOpen'), props['0']);
      if(view(lensProp('isExtensionOpen'), props['0'])) local.open = view(lensProp('isExtensionOpen'), props['0']);
      const _handleOpen = () => handlers.extensionOpen();

      const _handleClose = (e) => {
        if(e.target.tagName !== 'TD'){
          handlers.extensionClose();
        }
      };

      return (<Popup trigger={ Component2(props) } on='click' onOpen={_handleOpen} onClose={_handleClose} {...local}>{ Component1(props) }</Popup>)
    }
  }
}

const AdvancedSearchButton = (props) => {
  const disabled = getContentFn(props);
  const local = { disabled };
  return <Button  { ...local } primary icon='chevron down' />;
}

const getContentFn = props => view(lensPath(['0', 'disabled']), props);

function withContent (fn) {
  return function (Component) {
    return function (props) {
      const disabled = getContentFn(props);
      const local = { disabled };
      return <Component { ...props } { ...local } />
    }
  }
}

const SearchExtension = compose(
    withContent(getContentFn),
    compose(withPopup)(ReloaditDetail)
)(AdvancedSearchButton);


export default SearchExtension;

