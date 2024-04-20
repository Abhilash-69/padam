import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const url = "http://localhost:8000/auth/"

const Dashboard = ({setAuth}) => {
  const [name, setName] = useState({})

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = () =>{
    axios.get(`${url}`, {
      headers: {token: localStorage.getItem('token')}
    }).then((response) => {
      setName(response.data)
    })
  }

  const logOut = () => {
    if(name){
      localStorage.clear("token")
      setAuth(false)
      toast.success("LogOut Successful")
    }
  }
  return (
    <div>
      <h1 className="mt-5">Dashboard</h1>
      <h2>Welcome {name.user_name}</h2>
      <button onClick={logOut} className='btn btn-primary'>LogOut</button>
    </div>
  )
}

export default Dashboard