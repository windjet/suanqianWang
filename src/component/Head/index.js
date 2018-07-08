import React, {Component} from 'react';
//import './index.scss';


export default class Head extends Component {
  static displayName = 'Head';

	goBack = () => {
	  console.log(this.props.history)
  };

  render() {
    return (
      <div className="head" onClick={this.goBack}><h1>算钱网</h1></div>
    )
  }
}