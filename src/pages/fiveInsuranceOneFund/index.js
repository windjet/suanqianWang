import React, {Component} from 'react';
import DocumentTitle from 'react-document-title'
import cn from "classnames";

export default class FiveInsuranceOneFund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preTax: '',
      afterTax: '',
      housingFundsE2: '7'
    };
  }

  handleChange = (e) => {
    this.setState({
      preTax: e.target.value
    })
  };
  handleChangeHousingFunds = (e) => {
    this.setState({
      housingFundsE2: e.target.value
    })
  };

  fiveInsuranceOneFundFormula = (preTax) => {
    const medicalTaxE2 = 2, //医疗
      endowmentE2 = 8,   //养老
      unemploymentE2 = 0.5, //失业
      employmentE2 = 0, //工伤
      maternityE2 = 0;  //生育
    this.setState({
      afterTax: preTax - (preTax * (medicalTaxE2 + endowmentE2 + unemploymentE2 + employmentE2 + maternityE2 + Number(this.state.housingFundsE2)) / 1e2)
    })
  };


  render() {
    return (
      <DocumentTitle title='五险一金、税后工资计算器 - 算钱网'>
        <div className='page-five-insurance-one-fund'>
          <div className='content'>
            <h2>五险一金、税后工资计算器</h2>
            <div className='form-col current'>
              <label>税前收入</label>
              <input type="number" value={this.state.preTax} onChange={this.handleChange} placeholder='请先输入税前工资'/>
              <div className='unit'>元</div>
            </div>
            <div className='form-col '>
              <label>本地公积金缴费比例</label>
              <input type="number" value={this.state.housingFundsE2} onChange={this.handleChangeHousingFunds}/>
              <div className='unit'>%</div>
            </div>
            <div className='actions'>
              <button
                className={cn('submit-btn', !this.state.preTax && 'disabled')}
                onClick={() => this.fiveInsuranceOneFundFormula(this.state.preTax)}>计算
              </button>
            </div>
            <div className='form-col'>
              <label>税后收入</label>
              <input type='number' disabled value={this.state.preTax && this.state.afterTax} placeholder=''/>
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }
}
