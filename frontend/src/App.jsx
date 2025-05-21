
import AppBar from './components/Appbar'
import './App.css'
import Homescreen from './components/homepage/Homepage'
import { Box } from '@mui/material'
import { Routes, Route, useMatch, } from 'react-router-dom'
import Profilepage from './components/profilepage/Profilepage'
import SinglePost from './components/singlepostpage/SinglePost'
import LoginPage from './components/loginpage/Loginpage'
import RegisterPage from './components/loginpage/Registerpage'
import MakeFeedPage from './components/feedpage/Makefeedpage'
import FeedPage from './components/feedpage/Feedpage'
import NewPostpage from './components/feedpage/NewPostpage'
import { useState } from 'react'
import useMe from './components/hooks/useMe'
function App() {
  const [User,setUser] = useState(null)
  const token = localStorage.getItem("token")
  const {data,loading,error,refetch} = useMe()
  let match = useMatch('/post/:id');
  if (!match){
    match = "none"
  }
  let matchfeed = useMatch('/feed/:feedname')
  if (!matchfeed){
    matchfeed = "none"
  }
  let matchfeedpost = useMatch('/newpost/:postfeedname')
  if (!matchfeedpost){
    matchfeedpost = null
  }
  if (loading){
    return <Box>loading</Box>
  }
  let me = data ? data.me : null
  if (token && !User && me){
    setUser(me)
  }

  console.log(User)
  return (
    <Box >
      <AppBar User={User} setUser={setUser} refetch={refetch} />
      <Routes>
        <Route path='/' element={<Homescreen  />}/>
        <Route path='/profile' element={<Profilepage/>} />
        <Route path='/post/:id' element={<SinglePost match={match} User={User} />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/makefeed' element={<MakeFeedPage/>} />
        <Route path='/feed/:feedname' element={<FeedPage match={matchfeed} User={User} setUser={setUser} />} />
        <Route path='/newpost/:postfeedname' element={<NewPostpage match={matchfeedpost}/>} />
      </Routes>
    </Box>
    
  )
}


export default App
