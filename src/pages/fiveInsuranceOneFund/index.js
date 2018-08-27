import React, {Component} from 'react';
import DocumentTitle from 'react-document-title'
import cn from "classnames";
import {fiveInsuranceOneFundE2} from '../../core/configData';

export default class FiveInsuranceOneFund extends Component {
	constructor(props) {
		super(props);
		this.state = {
			preTax: '',
			afterTax: ''
		};
	}

	allGene = fiveInsuranceOneFundE2[this.props.match && this.props.match.params && this.props.match.params.city];

	handleChange = (e) => {
		this.setState({
			preTax: e.target.value
		})
	};

	getgerensuodeTax = (monthIncome) => {
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

	fiveInsuranceOneFundFormula = () => {
		const preTax = this.state.preTax;  //税前工资收入
		const {
			endowment: {c: endowment},
			medical: {c: medical},
			unemployment: {c: unemployment},
			employmentInjury: {c: employmentInjury},
			maternity: {c: maternity},
			housing: {c: housing}
		} = this.allGene;
		const payTax = preTax * (endowment + medical + unemployment + employmentInjury + maternity + housing) / 1e2;
		console.log('五险一金'+ payTax);
		//税后工资 = 工资收入金额 - 五险一金
		const shuihougongzi = preTax - payTax;
		//应纳税所得额 = 税后工资 - 起征点
		const yingnashuisuodee = shuihougongzi - 3500;
		console.log('交完五险一金后的 应纳税所得额'+ yingnashuisuodee);
		const {taxE2, deduct} = this.getgerensuodeTax(yingnashuisuodee);  //个人所得税税率，速算扣除数
		console.log('个人所得税税率，速算扣除数'+ taxE2, deduct);
		const gerensuodeTax = yingnashuisuodee * taxE2 / 1E2 - deduct;
		console.log('个人所得税额'+gerensuodeTax);
		const afterTax =  shuihougongzi - gerensuodeTax;
		console.log('afterTax: '+ afterTax);
		this.setState({
			afterTax
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
						<div className='actions'>
							<button
								className={cn('submit-btn', !this.state.preTax && 'disabled')}
								onClick={this.fiveInsuranceOneFundFormula}>计算
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
