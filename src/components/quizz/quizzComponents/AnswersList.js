import React, { useState } from "react"
import styled from "styled-components"

const AnswerButton = styled.button`
  background-color: ${props => (props.isSelected ? "green" : "gray")};
`

const AnswersList = ({ question, setQuestions, currentQuestion }) => {
  const [indexOfSelected, setIndexOfSelected] = useState([])
  const numberOfSelected = question.answersList
    ? question.answersList.filter(item => item.isSelected).length
    : 0

  const handleSelect = index => {
    const isSelected = question.answersList[index].isSelected
    setQuestions(prev => {
      let newState = [...prev]
      newState[currentQuestion].answersList[index].isSelected = !isSelected
      return newState
    })
    if (question.possibleAnswers > 1)
      if (!question.answersList[index].isSelected)
        setIndexOfSelected(prev => [...prev, index])
      else setIndexOfSelected(prev => prev.filter(item => item !== index))
  }
  const handleMaxSelect = index => {
    const isSelected = question.answersList[index].isSelected
    const arrayOfSelected = [...indexOfSelected]
    if (question.possibleAnswers === 1) {
      setQuestions(prev => {
        let newState = [...prev]
        newState[currentQuestion].answersList.forEach(
          item => (item.isSelected = false)
        )
        newState[currentQuestion].answersList[index].isSelected = !isSelected
        return newState
      })
    } else {
      if (question.answersList[index].isSelected) {
        setIndexOfSelected(prev => prev.filter(item => item !== index))
        setQuestions(prev => {
          let newState = [...prev]
          newState[currentQuestion].answersList[index].isSelected = !isSelected
          return newState
        })
      } else {
        arrayOfSelected.shift()
        arrayOfSelected.push(index)
        setIndexOfSelected(prev => {
          prev.shift()
          prev.push(index)
          return prev
        })
        setQuestions(prev => {
          let newState = [...prev]
          newState[currentQuestion].answersList.forEach(
            item => (item.isSelected = false)
          )
          arrayOfSelected.forEach(
            item =>
              (newState[currentQuestion].answersList[item].isSelected = true)
          )
          return newState
        })
      }
    }
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
