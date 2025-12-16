import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Register({setUser}){
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [confirm,setConfirm]=useState('')
const [err,setErr]=useState('')
const navigate = useNavigate()


function submit(e){
e.preventDefault()
if(password !== confirm){ setErr('Passwords do not match'); return }
const users = JSON.parse(localStorage.getItem('fl_users')||'[]')
if(users.some(u=>u.email===email)){ setErr('Email already in use'); return }
const u = {name,email,password}
users.push(u)
localStorage.setItem('fl_users', JSON.stringify(users))
setUser({name,email})
navigate('/')
}


return (
<div className="flex items-center justify-center h-screen">
<div className="card" style={{width:420}}>
<h3 className="big">Create an account</h3>
<p className="small">Sign up to start managing your finances</p>
{err && <div style={{color:'red',marginTop:8}}>{err}</div>}
<form onSubmit={submit} style={{marginTop:12}}>
<div style={{marginBottom:8}}>
<input className="input" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required />
</div>
<div style={{marginBottom:8}}>
<input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
</div>
<div style={{marginBottom:8}}>
<input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
</div>
<div style={{marginBottom:12}}>
<input className="input" type="password" placeholder="Confirm Password" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
</div>
<button className="btn" type="submit">Create Account</button>
</form>
</div>
</div>
)
}