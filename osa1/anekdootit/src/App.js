import React, { useState } from 'react'

const Header = ({ text }) => (<><h2>{text}</h2></>)

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const anecdotesVotes = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(anecdotesVotes)

  const [mostVotes, setMostVotes] = useState(0)

  const nextEventHandler = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length)))
  }

  const voteEventHandler = () => {
    const copy = { ...votes }
    copy[selected] += 1
    let mostVotesValue = copy[0]
    let mostVotesIndex = 0
    for (let index = 1; index < anecdotes.length; index++) {
      if (copy[index] > mostVotesValue) {
        mostVotesValue = copy[index]
        mostVotesIndex = index
      }      
    }
    setMostVotes(mostVotesIndex)
    setVotes(copy)
  }


  return (
    <div>
      <Header text="Anecdote of the day" />
      <b>{anecdotes[selected]}</b>
      <br></br>
      <i>This anecdote has {votes[selected]} votes.</i>
      <br></br>
      <Button text="vote" handleClick={voteEventHandler} />
      <Button text="next anecdote" handleClick={nextEventHandler} />
      <Header text="Anecdote with most votes" />
      <b>{anecdotes[mostVotes]}</b>
      <br></br>
      <i>This anecdote has {votes[mostVotes]} votes.</i>
    </div>
  )
}

export default App
