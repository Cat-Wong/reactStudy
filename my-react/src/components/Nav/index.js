import React from 'react'
import { Swtich, Route, Router, HashHistory, Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/page">page</Link></li>
        <li><Link to="/counter">Counter</Link></li>
      </ul>
    </div>
  )
}