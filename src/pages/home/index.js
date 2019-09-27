import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import cn from "classnames";
import './index.scss';

const indexPage = [
  {
    title: '2019',
    subTitle: '个人所得税',
    icon: 'PIT2019',
    path: '/2019PersonalIncomeTax/'
  },
  {
    title: '年终奖',
    subTitle: '个税计算',
    icon: 'yearEndBonus',
    path: '/yearEndBonus/'
  },
  {
    title: '五险一金',
    subTitle: '税后工资',
    icon: 'fiveInsurance',
    path: '/fiveInsuranceOneFund/'
  }
];

export default class Home extends Component {
  static displayName = 'Home';

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
                    <div className={cn('icon', `icon-${item.icon}`)}/>
                    <p>{item.title}</p>
                    <p>{item.subTitle}</p>
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
