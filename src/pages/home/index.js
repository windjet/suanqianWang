import React, {Component} from 'react';
import DocumentTitle from 'react-document-title'
import './index.scss';

const indexPage = [
  {
    title: '年终奖计算',
    path: '/yearEndBonus'
  },
  {
    title: '五险一金工资税后',
    path: '/fiveInsuranceOneFund'
  }
];

export default class Home extends Component {
  static displayName = 'Home';

  goYearEndBonus = () => {
    this.props.history.push('/yearEndBonus')
  };
  goBack = () => {
    this.props.history.goBack()
  };
  goPage = (path) => {
    return () => {
      this.props.history.push(path)
    }
  };

  render() {
    return (
      <DocumentTitle title='算钱网'>
        <div className='home-page'>
          <div className='nav-group'>
            {
              indexPage.map((item, index) => {
                return (
                  <div onClick={this.goPage(item.path)} className='nav' key={index}>
                    <div className='icon' />
                    <p>{item.title}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
