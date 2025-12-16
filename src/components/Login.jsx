import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Login({setUser}){
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [err,setErr]=useState('')
const navigate = useNavigate()


function submit(e){
e.preventDefault()
const users = JSON.parse(localStorage.getItem('fl_users')||'[]')
const found = users.find(u=>u.email===email && u.password===password)
if(found){ setUser({name:found.name,email:found.email}); navigate('/') }
else setErr('Invalid credentials or user not found.')
}


return (
<div className="flex items-center justify-center h-screen">
<div className="card" style={{width:420}}>
<h3 className="big">Welcome back</h3>
<p className="small">Login to access your dashboard</p>
{err && <div style={{color:'red',marginTop:8}}>{err}</div>}
<form onSubmit={submit} style={{marginTop:12}}>
<div style={{marginBottom:8}}>
<input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
</div>
<div style={{marginBottom:12}}>
<input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
</div>
<button className="btn" type="submit">Login</button>
</form>
<div style={{marginTop:12}} className="small">Don't have an account? <Link to="/register">Sign up</Link></div>
</div>
</div>
)
}