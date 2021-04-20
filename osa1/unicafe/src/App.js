import React, { useState } from 'react'

const Statistics = ({ numberOfGood, numberOfNeutral, numberOfBad, totalVotes, totalValue }) => {
  if (totalVotes === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }
  return (
    <>
      <table cellSpacing="5">
        <tbody>
          <StatisticsLine text="Good" statsValue={numberOfGood} />
          <StatisticsLine text="Neutral" statsValue={numberOfNeutral} />
          <StatisticsLine text="Bad" statsValue={numberOfBad} />
          <StatisticsLine text="All" statsValue={totalVotes} />
          <StatisticsLine text="Average" statsValue={totalValue.toFixed(1)} />
          <StatisticsLine text="Positive" statsValue={(numberOfGood / totalVotes * 100).toFixed(1) + " %"} />
        </tbody>
      </table>
    </>
  )
}

const StatisticsLine = ({ text, statsValue }) => {
  return (
    <tr>
      <td><b>{text}</b></td><td><b>{statsValue}</b></td>
    </tr>
  )
}

const Header = ({ header }) => {
  return (
    <>
      <h2>{header}</h2>
    </>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const App = () => {

  const feedbackHeader = "Give feedback"
  const statisticsHeader = "Statistics"
  const choices = ["good", "neutral", "bad"]

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalVotes = good + neutral + bad
  const totalValue = (good - bad) / totalVotes

  const handleClick = (value, setValue) => {
    setValue(value + 1)
  }

  return (
    <div>
      <Header header={feedbackHeader} />
      <p>
        <Button text={choices[0]} handleClick={() => handleClick(good, setGood)} />
        <Button text={choices[1]} handleClick={() => handleClick(neutral, setNeutral)} />
        <Button text={choices[2]} handleClick={() => handleClick(bad, setBad)} />
      </p>
      <Header header={statisticsHeader} />
      <Statistics numberOfGood={good} numberOfNeutral={neutral} numberOfBad={bad}
        totalVotes={totalVotes} totalValue={totalValue} />



    </div>
  )
}

export default App;
