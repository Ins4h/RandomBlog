import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import AnswersList from "../quizzComponents/AnswersList"
import QuestionButtons from "../quizzComponents/QuestionButtons"
import EndQuizz from "../quizzComponents/EndQuizz"

const Quizz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState([])
  const quizz = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark(filter: { frontmatter: { id: { eq: "quizz" } } }) {
        edges {
          node {
            frontmatter {
              questionsList {
                questionContent
                possibleAnswers
                answersList {
                  isCorrect
                  answerContent
                }
              }
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    const questionsList =
      quizz.allMarkdownRemark.edges[0].node.frontmatter.questionsList

    setQuestions(questionsList)
  }, [quizz])

  if (currentQuestion < questions.length) {
    console.log(currentQuestion, questions)
    return (
      <>
        <h2>{questions[currentQuestion].questionContent}</h2>
        <AnswersList
          question={questions[currentQuestion]}
          setQuestions={setQuestions}
          currentQuestion={currentQuestion}
        />
        <QuestionButtons
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          numberOfQuestions={questions.length}
        />
      </>
    )
  } else {
    console.log(currentQuestion, questions.length)
    return (
      <EndQuizz
        questions={questions}
        setQuestions={setQuestions}
        setCurrentQuestion={setCurrentQuestion}
      />
    )
  }
}

export default Quizz
