import React from "react";
import './App.css';
import { Link } from "react-router-dom";
import { Content } from './Content';
const { List } = require('immutable');

function questions(initialQueue)
{
  const queue = initialQueue;
  console.log(queue);

  return {
    answeredCorrect: () => {
      return questions(queue.shift());
    },
    answeredWrong: () => {
          const element = queue.first();
          return questions(queue.shift().push(element));
    },
    next: () => queue.first(),
    hasNext: () => !queue.isEmpty(),
    remainCount: () => queue.size
  };
}

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);

        const db = Content();
        const entries = List(db.entries(parseInt(props.start), parseInt(props.end))).sortBy(Math.random);

        this.state = {
          questions: questions(entries),
          showResult: false
        };

        this.showResult = () => {
            this.setState({ showResult: true })
        }

        this.correctAnswer = () => {
            this.setState({ showResult: false, questions: this.state.questions.answeredCorrect() })
        }

        this.wrongAnswer = () => {
            this.setState({ showResult: false, questions: this.state.questions.answeredWrong() })
        }
  }

    render() {
      const questions = this.state.questions;
      const finished = !questions.hasNext();
      const curr = questions.next();
      if (finished) {
      return (
      <div className="App">
                <div className="App-body">
              <h1>Done</h1>
              <Link className="linkStart" to="/"> Again </Link>
              </div>
              </div>
            )
      }


      return (
        <div>
          <div className="App">
          <div className="App-body">
          <div className="q">{curr.kanji}</div>
          { this.state.showResult ?
            <div>
            <div className="a"> {curr.keyword} </div>
            <button className="okAnswer" onClick={this.correctAnswer}> CORRECT </button>
            <button className="wrongAnswer" onClick={this.wrongAnswer}> WRONG </button>
            </div>
            :
            <div>
            <div className="a"> ... </div>
            <button className="show" onClick={this.showResult}> SHOW ANSWER </button>
            </div>
          }


          </div>

          </div>
          <h2>Quiz, start: {this.props.start}, end: {this.props.end}, current: {curr.id}, remain: {questions.remainCount()}</h2>
        </div>
      );


    }
}