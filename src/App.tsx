import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import TodaysPlans from "./Components/TodaysPlans";
import AllPlans from "./Components/AllPlans";
import EditPlan from './Components/EditPlan';

function App() {
  return (
    <Router>
      <div className='nav-bar'>
        <Link to="/">Home</Link>
        <Link to="/today's-plans">Today's Plans</Link>
        <Link to="/all-plans">All Plans</Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/today's-plans" component={TodaysPlans} />
        <Route path="/all-plans" component={AllPlans} />
        <Route path="/edit-plan/:id" component={EditPlan} />
      </Switch>
    </Router>
  );
}

export default App;
