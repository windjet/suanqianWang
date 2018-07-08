import React, {Component} from 'react';
import DocumentTitle from 'react-document-title'


export default class Home extends Component {
  static displayName = 'Home';

  goYearEndBonus = () => {
    this.props.history.go('/yearEndBonus')
  };
	goBack = () => {
		console.log(this.props.history)
	};

  render() {
    return (
	    <DocumentTitle title='Homesssss'>
	      <div className='home-page'>
	        homePage
		      <div onClick={this.goBack}>test back</div>
	        <div onClick={this.goYearEndBonus}>计算年终奖</div>
	      </div>
	    </DocumentTitle>
    );
  }
}