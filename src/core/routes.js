//import makePage from './makePage'
import Home from '../pages/home';
import YearEndBonus from '../pages/yearEndBonus';
// import Home2 from '../Home2';
// import Home3 from '../Home3';
const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/yearEndBonus',
    exact: true,
    component: YearEndBonus
  }
];

// const extendRoutes = routes.map(({component, ...others}) => {
//   return {
//     ...others,
//     component: makePage(component)
//   }
// });


export default routes;
