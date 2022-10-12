import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const all = good + neutral + bad;
  const average = ((good * 1 + neutral * 0 + bad * -1) / all).toFixed(1);
  const positive = ((good / all) * 100).toFixed(1);

  if (all > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good || 0} />
          <StatisticLine text="neutral" value={neutral || 0} />
          <StatisticLine text="bad" value={bad || 0} />
          <StatisticLine text="all" value={all || 0} />
          <StatisticLine text="average" value={average || 0} />
          <StatisticLine text="positive" value={positive + " %" || 0} />
        </tbody>
      </table>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
