//import makePage from './makePage'
import Home from '../pages/home';
import YearEndBonus from '../pages/yearEndBonus';
import FiveInsuranceOneFund from '../pages/fiveInsuranceOneFund';
import PIT2019 from '../pages/PIT2019';
// import Home2 from '../Home2';
// import Home3 from '../Home3';
const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/yearEndBonus/',
    exact: true,
    component: YearEndBonus
  },
  {
    path: '/fiveInsuranceOneFund/',
    exact: true,
    component: FiveInsuranceOneFund
  },
  {
    path: '/fiveInsuranceOneFund/:city',
    exact: true,
    component: FiveInsuranceOneFund
  },
  {
    path: '/2019PersonalIncomeTax/',
    exact: true,
    component: PIT2019
  }
];

// const extendRoutes = routes.map(({component, ...others}) => {
//   return {
//     ...others,
//     component: makePage(component)
//   }
// });


export default routes;
