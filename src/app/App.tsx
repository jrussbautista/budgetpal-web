import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from '../core/layout';
import Dashboard from '../features/dashboard/Dashboard';
import Budgets from '../features/budgets/Budgets';
import Transactions from '../features/transactions/Transactions';
import Login from '../features/auth/login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route>
          <Layout>
            <Switch>
              <Route path='/' exact>
                <Dashboard />
              </Route>
              <Route path='/budgets' exact>
                <Budgets />
              </Route>
              <Route path='/transactions' exact>
                <Transactions />
              </Route>
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
