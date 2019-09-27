import React, {PureComponent} from 'react';
import './index.scss';

export default class MinusPlus extends PureComponent {

  state = {
    value: 1
  };

  handleClick = (type) => {
    if(type === 'minus' && this.state.value === 1) {
      return null;
    }
    return () => {
      this.setState({
        value: type === 'minus' ? this.state.value - 1 : this.state.value + 1
      }, () => this.props.onClick(this.state.value))
    }
  };

  renderText = () => {
    if (this.state.value === 1 && this.props.defaultText) {
      return this.props.defaultText
    } return this.props.text
  };

  render() {


    return (
      <div className='minus-plus-content'>
        <span onClick={this.handleClick('minus')}>-</span>
        <p>{this.state.value}{this.renderText()}</p>
        <span onClick={this.handleClick('plus')}>+</span>
      </div>
    )
  }
}
