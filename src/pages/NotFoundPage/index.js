import React, {Component} from 'react';
import DocumentTitle from 'react-document-title'


export default class NotFoundPage extends Component {
  render() {
    return (
      <DocumentTitle title='算钱网'>
        <div style={{textAlign: 'center', padding: '50px'}}> - 404 - </div>
      </DocumentTitle>
    );
  }
}
