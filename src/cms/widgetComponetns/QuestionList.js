import React, { useState } from "react"
import styled from "styled-components"
import CMS from "netlify-cms-app"

const AnswerInput = styled.input`
  border: solid 1px black;
  margin: 5px 10px;
  height: 50px;
  width: 80%;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuButton = styled.button`
  padding: 0;
  margin: ${props => (props.remove ? "0 0 0 auto" : "0 auto")};
  border-radius: 10px;
  background-color: black;
  color: white;
  width: 150px;
`
const InputWrapper = styled.div`
  /* display: flex; */
`
const QuestionsList = props => {
  const [questionsList, setQuestionsList] = useState([])
  props.onChange(questionsList)
  // console.log("state: ", questionsList)
  // console.log("props value: ", props.value)

  const handleAddQuestion = () => {
    setQuestionsList([...questionsList, { answersList: [] }])
  }

  const handleRemoveQuestion = index => {
    setQuestionsList(prev => {
      const newState = [...prev]
      newState.splice(index, 1)
      return newState
    })
  }

  const handleQuestionContent = (e, index) => {
    setQuestionsList(prev => {
      const newState = [...prev]
      newState[index] = {
        ...newState[index],
        questionContent: e.target.value,
      }
      return newState
    })
  }

  const handlePossibleAnswers = (e, index) => {
    setQuestionsList(prev => {
      const newState = [...prev]
      newState[index] = {
        ...newState[index],
        possibleAnswers: e.target.value,
      }
      return newState
    })
  }

  const handleAddAnswer = questionIndex => {
    setQuestionsList(prev => {
      const newState = [...prev]
      newState[questionIndex].answersList.push({ isCorrect: false })
      return [...newState]
    })
  }

  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    setQuestionsList(prev => {
      const newState = [...prev]
      newState[questionIndex].answersList.splice(answerIndex, 1)
      return [...newState]
    })
  }
  const handleAnswerContent = (e, questionIndex, answerIndex) => {
    setQuestionsList(prev => {
      const newState = [...prev]
      newState[questionIndex].answersList[answerIndex] = {
        answerContent: e.target.value,
        isCorrect: newState[questionIndex].answersList[answerIndex].isCorrect,
      }
      return newState
    })
  }

  const handleCheckbox = (e, questionIndex, answerIndex) => {
    setQuestionsList(prev => {
      const newState = [...prev]
      newState[questionIndex].answersList[answerIndex] = {
        answerContent:
          newState[questionIndex].answersList[answerIndex].answerContent,
        isCorrect: e.target.checked,
      }
      return newState
    })
  }

  return (
    <>
      <Container>
        {questionsList.map((question, index) => (
          <>
            <InputWrapper>
              <h1>Pytanie</h1>
              <AnswerInput
                onChange={e => handleQuestionContent(e, index)}
                value={question.questionContent}
              />
            </InputWrapper>
            <InputWrapper>
              <h1>Możliwe odpowiedzi</h1>
              <AnswerInput
                type="number"
                value={question.possibleAnswers}
                onChange={e => handlePossibleAnswers(e, index)}
              />
            </InputWrapper>
            <MenuButton
              remove
              type="button"
              onClick={() => handleRemoveQuestion(index)}
            >
              remove question
            </MenuButton>
            <Container>
              <MenuButton onClick={() => handleAddAnswer(index)}>
                Add answer
              </MenuButton>
              {question.answersList.map((answer, answerIndex) => (
                <Container>
                  <InputWrapper>
                    <AnswerInput
                      onChange={e => handleAnswerContent(e, index, answerIndex)}
                      value={answer.answerContent}
                    />
                    <input
                      type="checkbox"
                      onChange={e => handleCheckbox(e, index, answerIndex)}
                    />
                  </InputWrapper>
                  <MenuButton
                    remove
                    type="button"
                    onClick={() => handleRemoveAnswer(index, answerIndex)}
                  >
                    remove
                  </MenuButton>
                </Container>
              ))}
            </Container>
          </>
        ))}
        <MenuButton onClick={handleAddQuestion}>add Question</MenuButton>
      </Container>
    </>
  )
}

export default QuestionsList
