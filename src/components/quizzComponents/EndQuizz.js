import React from "react"

const EndQuizz = ({ questions, setQuestions, setCurrentQuestion }) => {
  let correctAnswers = 0
  let allCorrectAnswers = 0

  questions.forEach(question => {
    question.answersList.forEach(answer => {
      if (answer.isCorrect && answer.isSelected) correctAnswers++
      if (answer.isCorrect) allCorrectAnswers++
    })
  })

  const handleRestart = () => {
    setCurrentQuestion(0)
    setQuestions(prev => {
      let newState = [...prev]
      newState.forEach(questionItem =>
        questionItem.answersList.forEach(
          answerItem => (answerItem.isSelected = false)
        )
      )
      return newState
    })
  }
  return (
    <div>
      <p>
        {correctAnswers}/{allCorrectAnswers}
      </p>
      <button type="button" onClick={handleRestart}>
        Reset quizz
      </button>
    </div>
  )
}

export default EndQuizz
