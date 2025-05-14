
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
function App() {
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
  console.log(match,matchfeed,matchfeedpost)
  return (
    <Box>
      <AppBar/>
      <Routes>
        <Route path='/' element={<Homescreen  />}/>
        <Route path='/profile' element={<Profilepage/>} />
        <Route path='/post/:id' element={<SinglePost id={match}/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/makefeed' element={<MakeFeedPage/>} />
        <Route path='/feed/:feedname' element={<FeedPage match={matchfeed}/>} />
        <Route path='/newpost/:postfeedname' element={<NewPostpage match={matchfeedpost}/>} />
      </Routes>
    </Box>
    
  )
}


export default App
