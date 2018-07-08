import React, {Component} from 'react';
import history from "../../core/history";


export default class Home extends Component {
  static displayName = 'Home';

  goYearEndBonus = () => {
    history.push('/yearEndBonus')
  };

  render() {
    return (
      <div className='home-page'>
        homePage
        <div onClick={this.goYearEndBonus}>计算年终奖</div>
      </div>
    );
  }
}