import React from "react"

const QuestionButtons = ({
  currQuestion,
  setCurrQuestion,
  numberOfQuestions,
}) => {
  return (
    <div>
      <button type="button" onClick={() => setCurrQuestion(currQuestion - 1)}>
        Poprzednie Pytanie
      </button>
      <button type="button" onClick={() => setCurrQuestion(currQuestion + 1)}>
        {currQuestion < numberOfQuestions - 1
          ? "Następne Pytanie"
          : "Zakończ Quizz"}
      </button>
    </div>
  )
}

export default QuestionButtons
