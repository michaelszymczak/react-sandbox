import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Quiz from './Quiz.js';

export default function Routing() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/quiz/:start/:end">
            <QuizPath />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="App-body">
      <Link className="linkStart" to="/quiz/10/17"> QUIZ </Link>
    </div>
  );
}

function QuizPath() {
  let { start, end } = useParams();
  return (
    <Quiz start={start} end={end}/>
  );
}

