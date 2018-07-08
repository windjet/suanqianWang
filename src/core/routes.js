import Home from '../pages/home';
import YearEndBonus from '../pages/yearEndBonus';
import Home2 from '../Home2';
import Home3 from '../Home3';
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
	},
	{
		path: '/Home2',
		exact: true,
		component: Home2
	},
	{
		path: '/Home3',
		exact: true,
		component: Home3
	},
];

export default routes;