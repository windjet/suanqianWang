import React, {Component, createRef} from 'react';
import './index.scss';
import cn from 'classnames';
import DocumentTitle from 'react-document-title'
import {getgerensuodeTax, getgerensuodeTax2019} from '../../core/formulaData';


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
      taxType: 1
    };
  }

  inputRef = createRef();

  componentDidMount() {
    this.inputRef.current.focus();
  }


  nianzhongjiangFormula = (preTax) => {
    if (preTax) {
      const taxFormula = this.state.taxType === 1 ? getgerensuodeTax : getgerensuodeTax2019;
      const monthIncome = preTax / 12;
      const {taxE2, deduct} = taxFormula(monthIncome);
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
    if (e.target.value) {
      this.setState({
        preTax: parseInt(e.target.value, 10)
      })
    } else {
      this.setState({
        preTax: '',
        afterTax: ''
      })
    }
  };

  handleSelectTaxType = (type) => {
    return () => {
      this.setState({
        taxType: type
      })
    }
  };

  render() {
    return (
      <DocumentTitle title='年终奖计算器 - 算钱网'>
        <div className='page-year-end-bouns'>
          <div className='content'>
            <h2>年终奖税后计算器</h2>
            <div className='form-col'>
              <label>个税版本</label>
              <div className='radio'>
                <div onClick={this.handleSelectTaxType(1)} className={cn('radio-item', this.state.taxType === 1 && 'current')}><p>现行个税</p></div>
                <div onClick={this.handleSelectTaxType(2)} className={cn('radio-item', this.state.taxType === 2 && 'current')}><p>新个税<span>2018年10月1日实施</span></p></div>
              </div>
            </div>
            <div className='form-col current'>
              <label>税前收入</label>
              <div className='input'>
                <input ref={this.inputRef} type="tel" maxLength={9} value={this.state.preTax} onChange={this.handleChange} placeholder='请先输入年终奖金额'/>
              </div>
              <div className='unit'>元</div>
            </div>
            <div className='actions'>
              <button className={cn('submit-btn', !this.state.preTax && 'disabled')} onClick={() => this.nianzhongjiangFormula(this.state.preTax)}>计算
              </button>
            </div>
            <div className='form-col'>
              <label>税后收入</label>
              <div className='input'>
                <input type='tel' disabled value={this.state.preTax && this.state.afterTax} placeholder=''/>
              </div>
              <div className='unit'>元</div>

            </div>
          </div>
          {this.state.preTax && this.state.afterTax &&
          <div className='tax-detail'>
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
