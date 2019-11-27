function questions(initialQueue)
{
  const queue = initialQueue;

  return {
    answeredCorrect: () => {
        return queue.isEmpty() ?
            questions(queue) :
            questions(queue.shift());
    },
    answeredWrong: () => {
        return queue.isEmpty() ?
            questions(queue) :
            questions(afterWrongAnswer(queue));
    },
    next: () => queue.first(),
    hasNext: () => !queue.isEmpty(),
    remainCount: () => queue.size,
    queue: () => queue
  };

  function afterWrongAnswer(q)
  {
    var result = q.shift().insert(10, q.first());
    if (result.size >= 20)
    {
        result = result.insert(20, q.first())
    }
    if (result.size >= 40)
    {
        result = result.insert(40, q.first())
    }
    return result;
  }
}


export default questions;