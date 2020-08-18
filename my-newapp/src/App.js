import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor() {
    super()

    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    }
  }

  countTotalFeedback() {
    return this.state.good + this.state.neutral + this.state.bad
  }

  countPositiveFeedbackPercentage() {
    const total = this.countTotalFeedback()
    const percentage = this.state.good / total
    return  ${percentage.toFixed(2)}$;
  }
  
  render() {
    return (
      <div>
        <FeedbackOptions
          title="Please leave feedback"
          options={
            [
              { title: 'Good', onLeaveFeedback: () => this.setState({ good: this.state.good + 1 }) },
              { title: 'Neutral', onLeaveFeedback: () => this.setState({ neutral: this.state.neutral + 1 }) },
              { title: 'Bad', onLeaveFeedback: () => this.setState({ bad: this.state.bad + 1 }) },
            ]}
        />
        <Statistics
          good={this.state.good}
          neutral={this.state.neutral}
          bad={this.state.bad}
          total={this.countTotalFeedback()}
          positivePercentage={this.countPositiveFeedbackPercentage()}
        />
      </div>
    )
  }
}

function Statistics(props) {
  return (
    <div>
      <p>Statistics</p>
      <NotificationMessage
        title="No feedback given"
        good={props.good}
        neutral={props.neutral}
        bad={props.bad}
        total={props.total}
        positivePercentage={props.positivePercentage}
      />
    </div>
  )
}

function FeedbackOptions(props) {
  return (
    <div>
      <p>{props.title}</p>
      {props.options.map(option => <button onClick={option.onLeaveFeedback}>{option.title}</button>)}
    </div>
  )
}

function NotificationMessage(props) {
  return (
    <span>
      {
        props.total === 0 ?
          <span>{props.title}</span> :
          <div>
            <span>Good: {props.good}</span>
            <span>Neutral: {props.neutral}</span>
            <span>Bad: {props.bad}</span>
            <span>Total: {props.total}</span>
            <span>Positive feedback: {props.positivePercentage}</span>
          </div>
      }
    </span>
  )
}

export default App