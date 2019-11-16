import React from 'react';
import './App.css';
import { Content } from './Content';

class Main extends React.Component {

  constructor(props) {
    super(props);

    const db = Content();

    this.state = {
      queue: db.entries(1, 1)
    };

    this.prepareNew = (firstId, lastId) => {
        this.setState({
            queue: db.entries(5, 7)
        })
    }


  }
  render() {

    const curr = this.state.queue[0];

    return (
      <div className="App">
            <header className="App-header">
              <button onClick={this.prepareNew}> new </button>
              #{curr.id} <br/>
              {curr.kanji} <br/>
              {curr.keyword} <br/>
            </header>
      </div>
    );
  }
}

export default Main;