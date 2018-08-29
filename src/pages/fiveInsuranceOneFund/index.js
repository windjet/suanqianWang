import React, {Component, Fragment} from 'react';
import DocumentTitle from 'react-document-title'
import cn from "classnames";
import {fiofConfig} from '../../core/configData';
import {getFiveInsuranceOneFund} from '../../core/formulaData';
import './index.scss';


export default class FiveInsuranceOneFund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preTax: '',
      afterTax: '',
      allGene: fiofConfig.filter((item) => item.city === this.getCurrentCity())[0]
    };
  }


  getCurrentCity = () => {
    return this.props.match && this.props.match.params && this.props.match.params.city
  };


  handleChange = (e) => {
    this.setState({
      preTax: e.target.value
    })
  };


  calculateFiveInsuranceOneFund = () => {
    const {
      endowment,
      medical,
      unemployment,
      employmentInjury,
      maternity,
      housing,
      personalIncomeTax,
      afterTax
    } = getFiveInsuranceOneFund(this.state.preTax, this.state.allGene);
    this.setState({
      endowment,
      medical,
      unemployment,
      employmentInjury,
      maternity,
      housing,
      personalIncomeTax,
      afterTax
    })
  };

  goOtherCity = (city) => {
    return () => {
      this.setState({
        allGene: fiofConfig.filter((item) => item.city === city)[0]
      }, () => this.props.history.push(city));
    }
  };
  renderSelectCity = () => {
    if (this.state.allGene) {
      return null
    }
    return (
      <div className='city-content'>
        <h2>选择城市</h2>
        <div className='city-col'>
          {fiofConfig.map((item, index) => {
            const isCurrent = (item.city === (this.props.match && this.props.match.params && this.props.match.params.city));
            return (<span className={cn('city-item', isCurrent && 'current')} key={index}
                          onClick={this.goOtherCity(item.city)}>{item.title}</span>)
          })}
        </div>
      </div>
    )
  };

  render() {
    const city = (this.state.allGene && this.state.allGene.title) || '';
    const title = `${city}五险一金、税后工资计算器`;
    return (
      <DocumentTitle title={`2018 ${title} - 算钱网`}>
        <div className='page-five-insurance-one-fund'>
          <div className='content'>
            {this.renderSelectCity()}
            {city &&
            <Fragment>
              <h2>{title}</h2>
              <div className='form-col current'>
                <label>税前收入</label>
                <input type="number" value={this.state.preTax} onChange={this.handleChange} placeholder='请先输入税前工资'/>
                <div className='unit'>元</div>
              </div>
              <div className='actions'>
                <button
                  className={cn('submit-btn', !this.state.preTax && 'disabled')}
                  onClick={this.calculateFiveInsuranceOneFund}>计算
                </button>
              </div>
              <div className='form-col'>
                <label>税后收入</label>
                <input type='number' disabled value={this.state.preTax && this.state.afterTax} placeholder=''/>
              </div>
            </Fragment>
            }
          </div>
          {this.state.preTax && this.state.afterTax &&
          <div className='tax-detail'>
            <h6>个人税金详情</h6>
            <p>养老保险: <strong>{this.state.endowment}</strong></p>
            <p>医疗保险: <strong>{this.state.medical}</strong></p>
            <p>失业保险: <strong>{this.state.unemployment}</strong></p>
            <p>工伤保险: <strong>{this.state.employmentInjury}</strong></p>
            <p>生育保险: <strong>{this.state.maternity}</strong></p>
            <p>住房公积金: <strong>{this.state.housing}</strong></p>
            <p>个人所得税：<strong>{this.state.personalIncomeTax}</strong></p>
          </div>
          }
        </div>
      </DocumentTitle>
    )
  }
}
