import React, {Component, createRef, Fragment} from 'react';
import DocumentTitle from 'react-document-title'
//import {fiofConfig} from '../../core/configData';
//import {getFiveInsuranceOneFund} from '../../core/formulaData';
import './index.scss';
import cn from "classnames";
import MinusPlus from '../../../src/component/MinusPlus';

const getTaxDeduct2019 = (yearIncome) => {
  if (yearIncome <= 36000) {
    return {
      taxE2: 3,
      deduct: 0,
    }
  } else if (yearIncome <= 144000) {
    return {
      taxE2: 10,
      deduct: 2520,
    }
  } else if (yearIncome <= 300000) {
    return {
      taxE2: 20,
      deduct: 16920,
    }
  } else if (yearIncome <= 420000) {
    return {
      taxE2: 25,
      deduct: 31920,
    }
  } else if (yearIncome <= 660000) {
    return {
      taxE2: 30,
      deduct: 52920,
    }
  } else if (yearIncome <= 960000) {
    return {
      taxE2: 35,
      deduct: 85920,
    }
  }
  return {
    taxE2: 45,
    deduct: 181920,
  }
};

export default class PIT2019 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perTaxIncome: '',
      threeInsuranceOneFund: '',
      allZHUANXIANGKOUCHU: 0,

      selectedZINV: false,
      ZINVtax: 1000,
      ZINVnums: 1,
      ZINVsolo: true,
      ZINVvalue: 0,

      selectedJIXU: false,
      JIXUvalue: 0,

      selectedZHUFANG: false,
      ZHUFANGvalue: 0,

      selectedZUFANG: false,
      ZUFANGlvl: 1,
      ZUFANGvalue: 0,

      selectedLAOREN: false,
      LAORENtax: 2000,
      LAORENnums: 1,
      LAORENvalue: 0,

      allMonthTax: [],
      allMonthTaxWithOutZHUANXIANG: []
    };
  }

  btnRef = createRef();

  getTotal = (ary) => {
    if (ary.length === 0) {
      return 0
    }
    return (
      ary.reduce((a, b) => a + b)
    )
  };


  getAllMonthTax = (perTaxIncome, sanxianyijin, zhuangxiangfujia) => {
    if (!perTaxIncome) {
      return null
    }
    const allMonthTax = [];
    for (let i = 1; i <= 12; i++) {
      const LEIJISHOURU = perTaxIncome * i; //累计收入
      const LEIJIMIANSHUISHOURU = 0; //累计免税收入：指免征个人所得税的收入
      const LEIJIJIANCHUFEIYONG = 5000 * i; //累计减除费用
      const LEIJIZHUANXIANGKOUCHU = sanxianyijin * i; //累计专项扣除 三险一金总额
      const LEIJIZHUANXIANGFUJIAKOUCHU = zhuangxiangfujia * i; //累计专项附加扣除
      const LEIJIYIFAQUEDINGQITSKOUCHU = 0; //累计依法确定的其他扣除

      const LEIJIYUKOUYUJIAOYINGNASHUISUODEE = LEIJISHOURU - LEIJIMIANSHUISHOURU - LEIJIJIANCHUFEIYONG - LEIJIZHUANXIANGKOUCHU - LEIJIZHUANXIANGFUJIAKOUCHU - LEIJIYIFAQUEDINGQITSKOUCHU; //累计预扣预缴应纳税所得额
      const {taxE2, deduct} = getTaxDeduct2019(LEIJIYUKOUYUJIAOYINGNASHUISUODEE);

      const LEIJIJIANMIANSHUIE = 0; //累计减免税额
      const LEIJIYIYUKOUYUJIAOSHUIE = this.getTotal(allMonthTax); //累计已预扣预缴税额

      const BENQIYINGYUKOUYUJIAOSHUIE = (LEIJIYUKOUYUJIAOYINGNASHUISUODEE * (taxE2 / 1e2) - deduct) - LEIJIJIANMIANSHUIE - LEIJIYIYUKOUYUJIAOSHUIE;//本期应预扣预缴税额
      const _BENQIYINGYUKOUYUJIAOSHUIE = BENQIYINGYUKOUYUJIAOSHUIE < 0 ? 0 : BENQIYINGYUKOUYUJIAOSHUIE;
      allMonthTax.push(parseInt(_BENQIYINGYUKOUYUJIAOSHUIE * 1e2, 10) / 1e2);
    }
    return allMonthTax
  };

  handlePerTaxIncomeChange = (e) => {
    if (e.target.value) {
      this.setState({
        perTaxIncome: parseInt(e.target.value, 10)
      })
    } else {
      this.setState({
        perTaxIncome: ''
      })
    }
  };
  handleThreeInsuranceOneFundChange = (e) => {
    if (e.target.value) {
      this.setState({
        threeInsuranceOneFund: parseInt(e.target.value, 10)
      })
    } else {
      this.setState({
        threeInsuranceOneFund: ''
      })
    }
  };

  calcPIT2019 = () => {
    if(!this.state.perTaxIncome) {
      return null
    }
    const {ZINVvalue, LAORENvalue, JIXUvalue, ZHUFANGvalue, ZUFANGvalue} = this.state;
    //console.log(ZINVvalue, LAORENvalue, JIXUvalue, ZHUFANGvalue, ZUFANGvalue);
    this.setState({
      allZHUANXIANGKOUCHU: ZINVvalue + LAORENvalue + JIXUvalue + ZHUFANGvalue + ZUFANGvalue
    }, () => {
      this.setState({
        allMonthTax: this.getAllMonthTax(this.state.perTaxIncome, this.state.threeInsuranceOneFund, this.state.allZHUANXIANGKOUCHU),
        allMonthTaxWithOutZHUANXIANG: this.getAllMonthTax(this.state.perTaxIncome, this.state.threeInsuranceOneFund, 0)
      }, () => window.scrollTo(0, this.btnRef.current.offsetTop))
    })
  };

  selectZINV = () => {
    this.setState({
      selectedZINV: !this.state.selectedZINV,
      ZINVvalue: !this.state.selectedZINV ? 1000 : 0
    })
  };
  ZINVchange = (v) => {
    this.setState({
      ZINVnums: v,
      ZINVvalue: this.state.ZINVtax * v
    })
  };
  ZINVsolo = (bool) => {
    return () => {
      this.setState({
        ZINVsolo: bool,
        ZINVtax: bool ? 1000 : 500,
        ZINVvalue: (bool ? 1000 : 500) * this.state.ZINVnums
      })
    }
  };
  selectLAOREN = () => {
    this.setState({
      selectedLAOREN: !this.state.selectedLAOREN,
      LAORENvalue: !this.state.selectedLAOREN ? this.state.LAORENtax / this.state.LAORENnums : 0,
      LAORENnums: 1
    })
  };
  LAORENchange = (v) => {
    this.setState({
      LAORENnums: v,
      LAORENvalue: parseInt(this.state.LAORENtax / v * 1e2, 10) / 1e2
    })
  };

  selectJIXU = () => {
    this.setState({
      selectedJIXU: !this.state.selectedJIXU,
      JIXUvalue: !this.state.selectedJIXU ? 400 : 0
    })
  };

  selectFANG = (item, disableItem) => {
    return () => {
      this.setState({
        [`selected${item}`]: !this.state[`selected${item}`],
        [`selected${disableItem}`]: this.state[`selected${disableItem}`] ? !this.state[`selected${disableItem}`] : this.state[`selected${disableItem}`],
      }, () => {
        this.setState({
          ZHUFANGvalue: this.state.selectedZHUFANG ? 1000 : 0,
          ZUFANGvalue: this.state.selectedZUFANG ? 1500 : 0,
          ZUFANGlvl: 1
        })
      })
    }
  };

  ZUFANGlvl = (lvl) => {
    return () => {
      if (lvl === 1) {
        this.setState({
          ZUFANGlvl: lvl,
          ZUFANGvalue: 1500
        })
      } else if (lvl === 2) {
        this.setState({
          ZUFANGlvl: lvl,
          ZUFANGvalue: 1000
        })
      } else if (lvl === 3) {
        this.setState({
          ZUFANGlvl: lvl,
          ZUFANGvalue: 800
        })
      }
    }
  };
  renderDetailList = () => {
    if (this.state.allMonthTax.length !== 0) {
      const yearTax = parseInt(this.state.allMonthTax.reduce((a, b) => a + b), 10);
      const yearTaxWithOutAllZHUANXIANG = parseInt(this.state.allMonthTaxWithOutZHUANXIANG.reduce((a, b) => a + b), 10);
      return (
      <div className='list-wrap'>
        <div className='list-title'>2019年收入明细</div>
        <div className='list-type'>
          <span className='txtBlack'>税前收入 </span>
          <span className='txtBlue'>三险一金 </span>
          <span className='txtRed'>新个税</span>
        </div>
        {
          this.state.allMonthTax.map((item, index) => {
            return (
              <div key={index} className='list'>
                {index + 1}月:
                <span className='txtBlack'>{this.state.perTaxIncome}</span> - <span className='txtBlue'>{this.state.threeInsuranceOneFund}</span> - <span className='txtRed'>{item}</span> = {this.state.perTaxIncome - this.state.threeInsuranceOneFund - item}
              </div>
            )
          })
        }
        <div>
          <p>专项扣除总额{this.state.allZHUANXIANGKOUCHU}, 全年个税缴纳总额为: {yearTax}</p>
          <p>若专项扣除总额为0, 全年个税缴纳总额为: {yearTaxWithOutAllZHUANXIANG}</p>
          <p>全年节省了{yearTaxWithOutAllZHUANXIANG - yearTax}元。</p>
        </div>
        <div>

        </div>
      </div>
    )
    }
  };

  render() {
    //const perTaxIncome = 24500;
    //const sanxianyijin = 3745;//1711.68 + 427.92+106.98+1498
    //const zhuanxiangmianshui = 2000;
    //const allMonthTax = this.getAllMonthTax(this.state.perTaxIncome, this.state.threeInsuranceOneFund, this.state.allZHUANXIANGKOUCHU);
    //console.log(this.state.allMonthTax);
    return (
      <DocumentTitle title={`2019 新个人所得税计算器`}>
        <div className='page-PIT2019'>
          <div className='content'>
            <h2>1. 输入月薪基本信息</h2>
            <div className='form-col'>
              <label>税前收入</label>
              <div className='input'>
                <input
                  maxLength={9}
                  type="tel"
                  value={this.state.perTaxIncome}
                  onChange={this.handlePerTaxIncomeChange}
                  placeholder='请输入税前工资'
                />
              </div>
              <div className='unit'>元</div>
            </div>
            <div className='form-col'>
              <label>三险一金<br/>总额</label>
              <div className='input'>
                <input
                  maxLength={9}
                  type="tel"
                  value={this.state.threeInsuranceOneFund}
                  onChange={this.handleThreeInsuranceOneFundChange}
                  placeholder='请输入三险一金总额'
                />
              </div>
              <div className='unit'>元</div>
            </div>
            <div className='col-tip'>*三险一金总额 = 养老保险 + 医疗保险 + 失业保险 + 公积金</div>
            <h2>2. 选择专项附加扣除项</h2>
            <div className={cn('form-action-col', this.state.selectedZINV && 'current')}>
              <div className='icon' onClick={this.selectZINV}>✓</div>
              <div className='form-action-content'>
                <span className='label'>子女教育</span>
                {this.state.selectedZINV && <Fragment>
                  <div className='flex-row' style={{marginTop: 10}}>
                    <div className='item-type' style={{width: 140, flexShrink: 0}}>
                      <span
                        onClick={this.ZINVsolo(true)}
                        className={cn('item-type-btn', this.state.ZINVsolo && 'current')}
                      >己方单扣</span>
                      <span
                        onClick={this.ZINVsolo(false)}
                        className={cn('item-type-btn', !this.state.ZINVsolo && 'current')}
                      >夫妻分摊</span>
                    </div>
                    <MinusPlus onClick={this.ZINVchange} text='个子女'/>
                  </div>
                  <div className='kouchu-value'>扣除额: <strong>{this.state.ZINVvalue}/月</strong></div>
                </Fragment>}
              </div>
            </div>
            <div className={cn('form-action-col', this.state.selectedLAOREN && 'current')}>
              <div className='icon' onClick={this.selectLAOREN}>✓</div>
              <div className='form-action-content'>
                <span className='label'>赡养老人</span>
                {this.state.selectedLAOREN && <Fragment>
                  <div className='flex-row' style={{marginTop: 10}}>
                    <MinusPlus onClick={this.LAORENchange} defaultText='独生子女单扣' text='兄弟姐妹分摊'/>
                  </div>
                  <div
                    className='kouchu-value'>扣除额: <strong>{this.state.LAORENvalue}/月</strong>
                  </div>
                </Fragment>}
              </div>
            </div>
            <div className={cn('form-action-col', this.state.selectedJIXU && 'current')}>
              <div className='icon' onClick={this.selectJIXU}>✓</div>
              <div className='form-action-content'>
                <span className='label'>继续教育</span>
                {this.state.selectedJIXU && <div style={{marginTop: 10}}>
                  <div className='item-type'>
                    <span
                      className={cn('item-type-btn', 'current')}
                    >学历学位继续教育</span>
                    <span
                      className={cn('item-type-btn', 'disabled')}
                    >职业资格继续教育</span>
                  </div>
                  <div className='kouchu-value'>扣除额: <strong>{this.state.JIXUvalue}/月</strong></div>
                </div>}
              </div>
            </div>
            <div className={cn('form-action-col', this.state.selectedZHUFANG && 'current')}>
              <div className={cn('icon', 'radius')} onClick={this.selectFANG('ZHUFANG', 'ZUFANG')}>✓</div>
              <div className='form-action-content'>
                <span className='label'>住房贷款利息</span>
                {this.state.selectedZHUFANG && <div style={{marginTop: 10}}>
                  <div className='kouchu-value'>扣除额: <strong>{this.state.ZHUFANGvalue}/月</strong></div>
                </div>}
              </div>
            </div>

            <div className={cn('form-action-col', this.state.selectedZUFANG && 'current')}>
              <div className={cn('icon', 'radius')} onClick={this.selectFANG('ZUFANG', 'ZHUFANG')}>✓</div>
              <div className='form-action-content'>
                <span className='label'>住房租金</span>
                {this.state.selectedZUFANG && <div style={{marginTop: 10}}>
                  <div className='item-type'>
                    {[1, 2, 3].map((item) => {
                      return (
                        <span key={item}
                              onClick={this.ZUFANGlvl(item)}
                              className={cn('item-type-btn', this.state.ZUFANGlvl === item && 'current')}
                        >第{item}档城市</span>
                      )
                    })}
                  </div>
                  <div className='kouchu-value'>扣除额: <strong>{this.state.ZUFANGvalue}/月</strong></div>
                </div>}
              </div>
            </div>

            <div className='form-action-col'>
              <div className={cn('icon', 'disable')}/>
              <div className='form-action-content'>
                <span className='label'>大病医疗</span>
                <div className='tips'>2019产生的大病医疗支出在2020才能办理.
                </div>
              </div>
            </div>


            <div className='actions'>
              <button
                ref={this.btnRef}
                className={cn('submit-btn', !this.state.perTaxIncome && 'disabled')}
                onClick={this.calcPIT2019}>计算
              </button>
            </div>
            {!!this.state.allZHUANXIANGKOUCHU && <div className='form-col'>
              <label>专项附加<br/>扣除总额</label>
              <div className='input'>
                <p>{this.state.allZHUANXIANGKOUCHU}</p>
              </div>
              <div className='unit'>元</div>
            </div>}
            {this.renderDetailList()}
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
