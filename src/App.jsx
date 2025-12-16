import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './styles.css'
import { sampleData } from './data/sampleData'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import Budgets from './components/Budgets'
import Reports from './components/Reports'
import Settings from './components/Settings'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('fl_user')) || null)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('fl_user', JSON.stringify(user))
    if (!user) navigate('/login')
  }, [user])

  const [data, setData] = useState(JSON.parse(localStorage.getItem('fl_data')) || sampleData)

  useEffect(() => {
    localStorage.setItem('fl_data', JSON.stringify(data))
  }, [data])

  return (
    <div className="app-root font-sans text-gray-800">
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        <Route
          path="/*"
          element={
            user ? (
              <div className="layout flex h-screen">
                <Sidebar />
                <div className="main flex-1 flex flex-col">
                  <Topbar user={user} setUser={setUser} />
                  <div className="content p-6 overflow-auto">
                    <Routes>
                      <Route index element={<Dashboard data={data} />} />
                      <Route path="transactions" element={<Transactions data={data} setData={setData} />} />
                      <Route path="budgets" element={<Budgets data={data} setData={setData} />} />
                      <Route path="reports" element={<Reports data={data} />} />
                      <Route path="settings" element={<Settings data={data} setData={setData} user={user} setUser={setUser} />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
      </Routes>
    </div>
  )
}
