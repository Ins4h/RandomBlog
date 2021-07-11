import React from "react"

const QuestionButtons = ({
  currentQuestion,
  setCurrentQuestion,
  numberOfQuestions,
}) => {
  return (
    <div>
      {currentQuestion ? (
        <button
          type="button"
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          Poprzednie Pytanie
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => setCurrentQuestion(currentQuestion + 1)}
      >
        {currentQuestion < numberOfQuestions - 1
          ? "Następne Pytanie"
          : "Zakończ Quizz"}
      </button>
    </div>
  )
}

export default QuestionButtons
