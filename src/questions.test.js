import questions from './questions';
const { List, Range } = require('immutable');

it('can be empty', () => {
  expect(q([]).hasNext()).toBe(false);
  expect(q([]).next()).toBe(undefined);
  expect(q([]).answeredCorrect().hasNext()).toBe(false);
  expect(q([]).answeredWrong().hasNext()).toBe(false);
});

it('tells when has some more questions', () => {
  expect(q(['a']).hasNext()).toBe(true);
  expect(q(['a']).next()).toBe('a');
});

it('asks in order provided', () => {
  expect(q(['a', 'b', 'c'])
    .answeredCorrect()
    .next()
  ).toBe('b');

  expect(q(['a', 'b', 'c'])
      .answeredCorrect()
      .answeredCorrect()
      .next()
    ).toBe('c');
});

it('repeats the question when wrong answer', () => {
  expect(q(['a']).answeredWrong().next()).toBe('a');
  expect(q(['a']).answeredWrong().answeredCorrect().hasNext()).toBe(false);
});

it('has no more questions when all answered correct', () => {
  expect(q(['a']).answeredCorrect().hasNext()).toBe(false);
});


it('places the question at the end when wrong answer', () => {
  expect(q(['a', 'b', 'c'])
    .answeredWrong()
    .answeredCorrect()
    .answeredCorrect()
    .next()
  ).toBe('a');
});

it('asks again if many questions ahead when wrong answer', () => {
  expect(afterAnswerCorrectNTimes(qRange(1, 10).answeredWrong(), 9).next()).toBe(1);
  expect(afterAnswerCorrectNTimes(qRange(1, 10).answeredWrong(), 10).hasNext()).toBe(false);
  expect(afterAnswerCorrectNTimes(qRange(1, 19).answeredWrong(), 19).hasNext()).toBe(false);
  expect(afterAnswerCorrectNTimes(qRange(1, 20).answeredWrong(), 20).next()).toBe(1);
  expect(afterAnswerCorrectNTimes(qRange(1, 20).answeredWrong(), 21).hasNext()).toBe(false);
  expect(afterAnswerCorrectNTimes(qRange(1, 39).answeredWrong(), 40).next()).toBe(1);
  expect(afterAnswerCorrectNTimes(qRange(1, 39).answeredWrong(), 41).hasNext()).toBe(false);
  expect(afterAnswerCorrectNTimes(qRange(1, 500).answeredWrong(), 502).hasNext()).toBe(false);
});

function qRange(numberFrom, numberToInclusive)
{
  return questions(Range(numberFrom, numberToInclusive + 1).toList());
}

function q(questionList)
{
  return questions(List(questionList));
}

function afterAnswerCorrectNTimes(questions, correctAnswersCount)
{
   var result = questions;
   for (let i = 0; i < correctAnswersCount; i++)
   {
    result = result.answeredCorrect();
   }
   return result;
}