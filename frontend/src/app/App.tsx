import Despesas from './Despesas';
import { getToday } from './dateFunctions';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link, 
  Redirect
} from "react-router-dom";


function App() {
  const mes = getToday().substring(0, 7);
  return <Router>
    <Switch>
      <Route path="/despesas/">
        <Despesas />
      </Route>
      <Route path="/despesas/:mes">
        <Despesas />
      </Route>
      <Redirect to={{ pathname: "/despesas/" + mes }}/>
    </Switch>
  </Router>
  
}

export default App;