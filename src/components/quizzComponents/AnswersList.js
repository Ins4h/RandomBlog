import React from "react"
import styled from "styled-components"

const AnswerButton = styled.button`
  background-color: ${props => (props.isSelected ? "green" : "gray")};
`

const AnswersList = ({ question, setQuestions, currentQuestion }) => {
  const numberOfSelected = question.answersList
    ? question.answersList.filter(item => item.isSelected).length
    : 0
  // const numberOfSelected = 2

  const handleSelect = index => {
    const isSelected = question.answersList[index].isSelected
    setQuestions(prev => {
      let newState = [...prev]
      newState[currentQuestion].answersList[index].isSelected = !isSelected
      return newState
    })
  }
  const handleMaxSelect = index => {
    setQuestions(prev => {
      let newState = [...prev]
      newState[currentQuestion].answersList[index].isSelected = false
      return newState
    })
  }

  const { answersList } = question

  return (
    <div>
      {answersList.map((answer, index) => (
        <AnswerButton
          isSelected={answer.isSelected}
          key={index}
          type="button"
          onClick={
            numberOfSelected === question.possibleAnswers
              ? () => handleMaxSelect(index)
              : () => handleSelect(index)
          }
        >
          {answer.answerContent}
        </AnswerButton>
      ))}
    </div>
  )
}

export default AnswersList
