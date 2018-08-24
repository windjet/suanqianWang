import React, {Component} from 'react';
import './index.scss';
import cn from 'classnames';
import DocumentTitle from 'react-document-title'


export default class YearEndBonus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preTax: '',
      afterTax: '',
      monthIncome: '--',
      taxE2: '--',
      deduct: '--',
      payTax: '--',
    };
  }

  getnianzhongjiangTax = (monthIncome) => {
    if (monthIncome < 1500) {
      return {
        taxE2: 3,
        deduct: 0,
      }
    } else if (monthIncome <= 4500) {
      return {
        taxE2: 10,
        deduct: 105,
      }
    } else if (monthIncome <= 9000) {
      return {
        taxE2: 20,
        deduct: 555,
      }
    } else if (monthIncome <= 35000) {
      return {
        taxE2: 25,
        deduct: 1005,
      }
    } else if (monthIncome <= 55000) {
      return {
        taxE2: 30,
        deduct: 2755,
      }
    } else if (monthIncome <= 80000) {
      return {
        taxE2: 35,
        deduct: 5055,
      }
    }
    return {
      taxE2: 45,
      deduct: 13505,
    }
  };

  nianzhongjiangFormula = (preTax) => {
    if (preTax) {
      const monthIncome = preTax / 12;
      const {taxE2, deduct} = this.getnianzhongjiangTax(monthIncome);
      const payTax = preTax * taxE2 / 1E2 - deduct;
      const afterTax = preTax - payTax;
      this.setState({
        afterTax,
        monthIncome,
        taxE2,
        deduct,
        payTax
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      preTax: e.target.value
    })
  };


  render() {
    return (
      <DocumentTitle title='年终奖计算器 - 算钱网'>
        <div className={'page-year-end-bouns'}>
          <div className={'content'}>
            <h2>年终奖税后计算器</h2>
            <div className={'form-col current'}>
              <label>税前收入</label>
              <input type="number" value={this.state.preTax} onChange={this.handleChange} placeholder='请先输入年终奖金额'/>
            </div>
            <div className={'actions'}>
              <button className={cn('submit-btn', !this.state.preTax && 'disabled')}
                      onClick={() => this.nianzhongjiangFormula(this.state.preTax)}>计算
              </button>
            </div>
            <div className={'form-col'}>
              <label>税后收入</label>
              <input type='number' disabled value={this.state.preTax && this.state.afterTax} placeholder=''/>
            </div>
          </div>
          {this.state.preTax && this.state.afterTax &&
          <div className={'tax-detail'}>
            <h6>纳税详情</h6>
            <p>纳税金额: <strong>{this.state.payTax}</strong></p>
            <p>纳税税率: <strong>{this.state.taxE2}%</strong></p>
            <p>速算扣除数: {this.state.deduct}元</p>
            <p style={{display: 'none'}}>月均工资: {this.state.monthIncome}</p>
          </div>
          }
        </div>
      </DocumentTitle>
    );
  }
}
