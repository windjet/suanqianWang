export const fiofConfig = [
  {
  	city: 'beijing',
    title: '北京',
    endowment: {b: 19, c: 8, min: 4279, max: 21396},   //养老
    medical: {b: 10, c: 2, min: 4279, max: 21396}, //医疗
    unemployment: {b: 0.8, c: 0.2, min: 4279, max: 21396}, //失业
    employmentInjury: {b: 0.4, c: 0, min: 4279, max: 21396}, //工伤
    maternity: {b: 0.8, c: 0, min: 4279, max: 21396},  //生育
    housing: {b: 12, c: 12, min: 4279, max: 21396}  //公积金
  },
  {
    city: 'shanghai',
    title: '上海',
    endowment: {b: 20, c: 8, min: 4279, max: 21396},   //养老
    medical: {b: 9.5, c: 2, min: 4279, max: 21396}, //医疗
    unemployment: {b: 0.5, c: 0.5, min: 4279, max: 21396}, //失业
    employmentInjury: {b: 0.2, c: 0, min: 4279, max: 21396}, //工伤
    maternity: {b: 1, c: 0, min: 4279, max: 21396},  //生育
    housing: {b: 7, c: 7, min: 2300, max: 21400 }  //公积金  由企业+用户合计缴存上限2996下限322 反推
  },
  {
    city: 'guangzhou',
    title: '广州',
    endowment: {b: 14, c: 8, min: 4279, max: 21396},   //养老
    medical: {b: 7, c: 2, min: 4279, max: 21396}, //医疗
    unemployment: {b: 0.64, c: 0.2, min: 4279, max: 21396}, //失业
    employmentInjury: {b: 0.2, c: 0, min: 4279, max: 21396}, //工伤
    maternity: {b: 0.85, c: 0, min: 4279, max: 21396},  //生育
    housing: {b: 5, c: 5, min: 4279, max: 21396}  //公积金
  }
];
