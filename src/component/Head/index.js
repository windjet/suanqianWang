import React, {Component} from 'react';
import './index.scss';


export default class Head extends Component {
  static displayName = 'Head';

  render() {
    return (
      <div className="head"><h1>算钱网</h1></div>
    )
  }
}