import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/activities">Activities</Link> | <Link to="/leaderboard">Leaderboard</Link> | <Link to="/teams">Teams</Link> | <Link to="/users">Users</Link> | <Link to="/workouts">Workouts</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<div>Welcome to Octofit Tracker</div>} />
        </Routes>
      </main>
    </div>
  )
}
