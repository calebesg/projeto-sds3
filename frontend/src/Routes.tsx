import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Dashboard from 'pages/Dashboard';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;