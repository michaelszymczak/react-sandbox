import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import Quiz from './Quiz.js';
import Home from './Home.js';

export default function Routing() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePath />
          </Route>
          <Route path="/quiz/:start/:end">
            <QuizPath />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function HomePath() {
  return (
    <Home />
  );
}


function QuizPath() {
  let { start, end } = useParams();
  return (
    <Quiz start={start} end={end}/>
  );
}

