export const fiofConfig = [
  {
    city: 'beijing',
    title: '北京',
    fiveInsuranceLimit: {min: 5080, max: 25401},
    housingLimit: {min: 2273, max: 25401},
    endowment: {b: 19, c: 8,},   //养老
    medical: {b: 10, c: 2}, //医疗
    unemployment: {b: 0.8, c: 0.2}, //失业
    employmentInjury: {b: 0.4, c: 0}, //工伤
    maternity: {b: 0.8, c: 0},  //生育
    housing: {b: 12, c: 12}  //公积金
  },
  {
    city: 'shanghai',
    title: '上海',
    fiveInsuranceLimit: {min: 4279, max: 21396},
    housingLimit: {min: 2300, max: 21400}, //由企业+用户合计缴存上限2996下限322 反推
    endowment: {b: 20, c: 8},   //养老
    medical: {b: 9.5, c: 2}, //医疗
    unemployment: {b: 0.5, c: 0.5}, //失业
    employmentInjury: {b: 0.2, c: 0}, //工伤
    maternity: {b: 1, c: 0},  //生育
    housing: {b: 7, c: 7}  //公积金
  },
  {
    city: 'guangzhou',
    title: '广州',
    fiveInsuranceLimit: {min: 2000, max: 22275},
    housingLimit: {min: 2000, max: 22275},
    endowment: {b: 14, c: 8},
    medical: {b: 7, c: 2},
    unemployment: {b: 0.64, c: 0.2},
    employmentInjury: {b: 0.2, c: 0},
    maternity: {b: 0.85, c: 0},
    housing: {b: 5, c: 5}
  },
  {
    city: 'shenzhen',
    title: '深圳',
    fiveInsuranceLimit: {min: 2150, max: 22440},
    housingLimit: {min: 2050, max: 22440},
    endowment: {b: 11, c: 8},
    medical: {b: 7, c: 2},
    unemployment: {b: 0.64, c: 0.2},
    employmentInjury: {b: 0.2, c: 0},
    maternity: {b: 0, c: 0},
    housing: {b: 5, c: 5}
  }
];
