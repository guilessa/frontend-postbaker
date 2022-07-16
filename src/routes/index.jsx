import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import DashBoardRoutes from './DashBoardRoutes';
import LoginRoutes from './LoginRoutes';

import Header from '../components/Header';
import SucessPopUp from '../components/SucessPopUp';
import ClientView from '../pages/ClientView';

const Routes = () => (
	<Router>
		<SucessPopUp />
		<Switch>
			<Route path="/dashboard" component={DashBoardRoutes} />
			<Route path="/login" component={LoginRoutes} />
			<Route exact path="/:id">
				<Header />
				<ClientView />
			</Route>
			<Route exact path="/">
				<Redirect to="/login" />
			</Route>
		</Switch>
	</Router>
);

export default Routes;
