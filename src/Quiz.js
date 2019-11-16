import React from "react";
import './App.css';
import { Content } from './Content';

function questions(initialQueue)
{
  const queue = initialQueue;
  console.log(queue);

  return {
    answeredCorrect: () => {
      return questions(queue); // TODO
    },
    answeredWrong: () => {
          return questions(queue); // TODO
    },
    next: () => queue[0],
    hasNext: () => queue.length > 0,
    remainCount: () => queue.length
  };
}

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        const db = Content();
        const entries = db.entries(parseInt(props.start), parseInt(props.end));

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
              <h1>Done</h1>
            )
      }


      return (
        <div>

            <h2>Quiz, start: {this.props.start}, end: {this.props.end}, current: {curr.id}, remain: {questions.remainCount()}</h2>

          <div className="App">
          <header className="App-header">
          <div className="q">{curr.kanji}</div>
          { this.state.showResult ?
            <div>
            <div className="a"> {curr.keyword} </div>
            <button className="okAnswer" onClick={this.correctAnswer}> CORRECT </button>
            <button className="wrongAnswer" onClick={this.wrongAnswer}> INCORRECT </button>
            </div>
            :
            <div>
            <button className="show" onClick={this.showResult}> Show </button>
            </div>
          }


          </header>

          </div>
        </div>
      );


    }
}

export default Quiz;