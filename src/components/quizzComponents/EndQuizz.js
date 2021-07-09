import React from "react"

const EndQuizz = ({ questions }) => {
  console.log(questions)
  let correctAnswers = 0
  let allCorrectAnswers = 0

  questions.forEach(question => {
    question.answersList.forEach(answer => {
      if (answer.isCorrect && answer.isSelected) correctAnswers++
      if (answer.isCorrect) allCorrectAnswers++
    })
  })
  console.log(correctAnswers)
  return (
    <div>
      {correctAnswers}/{allCorrectAnswers}
    </div>
  )
}

export default EndQuizz
