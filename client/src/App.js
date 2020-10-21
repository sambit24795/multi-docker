import React from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <div className="App">
        <Link to="/">Home</Link>
        <Link to="/otherpage">Otherpages</Link>
      <Switch>
        <Route exact path="/" component={Fib} />
        <Route path="/otherpage" component={OtherPage} />
      </Switch>
    </div>
  );
}

export default App;
