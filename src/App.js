import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Signin from './views/auth/Signin'
import Home from './views/Home'

function App() {
  return (
    <Router>
        <Switch>

          <Route path="/login"> <Signin /> </Route>

          <Route path="/"> <Home /> </Route>
          
        </Switch>
    </Router>
  );
}

export default App;
