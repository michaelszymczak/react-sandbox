import React from "react";
import {
  Link,
} from "react-router-dom";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          first: 0,
          last: 0
        };

        this.setFirst = (value) => {
            this.setState({ first: value })
        }

        this.setLast = (value) => {
            this.setState({ last: value })
        }
  }

    render() {

      const first = this.state.first;
      const last = this.state.last;

      return (
        <div className="App-body">
          <form>
            First: <input onChange={event => this.setFirst(event.target.value)} /> <br/>
            Last: <input onChange={event => this.setLast(event.target.value)} /> <br/>
          </form>
          <Link className="linkStart" to={"/quiz/" + first + "/" + last}> QUIZ </Link>
        </div>
      );
    }
}