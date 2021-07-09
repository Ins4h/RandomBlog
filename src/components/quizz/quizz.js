import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import AnswersList from "../quizzComponents/AnswersList"
import QuestionButtons from "../quizzComponents/QuestionButtons"
import EndQuizz from "../quizzComponents/EndQuizz"

const Quizz = () => {
  const quizz = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark(filter: { frontmatter: { id: { eq: "quizz" } } }) {
        edges {
          node {
            frontmatter {
              questionsList {
                questionContent
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

  const [questions, setQuestions] = useState(
    quizz.allMarkdownRemark.edges[0].node.frontmatter.questionsList
  )
  const [currQuestion, setCurrQuestion] = useState(0)

  return (
    <div>
      <h1> Quizz </h1>
      {currQuestion < questions.length ? (
        <>
          <h2>{questions[currQuestion].questionContent}</h2>
          <AnswersList
            answers={questions[currQuestion].answersList}
            setQuestions={setQuestions}
          />
          <QuestionButtons
            currQuestion={currQuestion}
            setCurrQuestion={setCurrQuestion}
            numberOfQuestions={questions.length}
          />
        </>
      ) : (
        <EndQuizz questions={questions} />
      )}
    </div>
  )
}

export default Quizz
