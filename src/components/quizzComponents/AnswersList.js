import React from "react"

const AnswersList = ({ answers }) => {
  const handleSelect = answer => {
    answer.isSelected = !answer.isSelected
    console.log(answer)
  }

  return (
    <div>
      {answers.map((answer, index) => (
        <button key={index} type="button" onClick={() => handleSelect(answer)}>
          {answer.answerContent}
        </button>
      ))}
    </div>
  )
}

export default AnswersList
