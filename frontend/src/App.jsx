
import AppBar from './components/Appbar'
import './App.css'
import Homescreen from './components/homepage/Homepage'
import { Box } from '@mui/material'
import { Routes, Route, useMatch, } from 'react-router-dom'
import Profilepage from './components/profilepage/Profilepage'
import SinglePost from './components/singlepostpage/SinglePost'
function App() {
  let match = useMatch('/post/:id');
  if (!match){
    match = "none"
  }
  console.log(match)
  
  return (
    <Box>
      <AppBar />
      <Routes>
        <Route path='/' element={<Homescreen/>}/>
        <Route path='/profile' element={<Profilepage />} />
        <Route path='/post/:id' element={<SinglePost id={match}/>} />
      </Routes>
    </Box>
    
  )
}

export default App
