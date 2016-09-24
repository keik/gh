import React from 'react'

export default class Repository extends React.Component {
  constructor () {
    super()
  }

  render () {
    const commits = this.props.commits.map((commit, idx) => (
      <li key={idx}>
        id: {commit.id}<br/>
        message: {commit.message}<br/>
        date: {commit.date.toString()}<br/>
      </li>
    ))
    return (
      <div>
        <h1>{this.props.name}</h1>
        <h2>commits</h2>
        <ul>{commits}</ul>
      </div>
    )
  }
}

Repository.propTypes = {
  name: React.PropTypes.string,
  commits: React.PropTypes.array
}

Repository.defaultProps = {
  name: '',
  commits: []
}
