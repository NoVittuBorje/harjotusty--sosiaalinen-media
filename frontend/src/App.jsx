import AppBar from "./components/Appbar";
import "./App.css";
import Homescreen from "./components/pages/homepage/Homepage";
import { Box } from "@mui/material";
import { Routes, Route, useMatch } from "react-router-dom";
import Profilepage from "./components/pages/profilepage/Profilepage";
import SinglePost from "./components/pages/singlepostpage/SinglePost";
import LoginPage from "./components/loginpage/Loginpage";
import RegisterPage from "./components/loginpage/Registerpage";
import MakeFeedPage from "./components/pages/feedpage/Makefeedpage";
import FeedPage from "./components/pages/feedpage/Feedpage";
import NewPostpage from "./components/pages/feedpage/NewPostpage";
import { useState } from "react";
import useMe from "./components/hooks/useMe";
function App() {
  const [User, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const { data, loading, error, refetch } = useMe();
  console.log(data)
  let match = useMatch("/post/:id");
  if (!match) {
    match = null;
  }
  let matchfeed = useMatch("/feed/:feedname");
  if (!matchfeed) {
    matchfeed = null;
  }
  let matchfeedpost = useMatch("/newpost/:postfeedname");
  if (!matchfeedpost) {
    matchfeedpost = null;
  }
  let matchuserid = useMatch("/profile/:userid")
  if (!matchuserid){
    matchuserid = null
  }
  if (loading) {
    return <Box>loading</Box>;
  }
  let me = data ? data.me : null;
  if (token && !User && me) {
    setUser(me);
  }

  console.log(User);
  return (
    <Box>
      <AppBar User={User} setUser={setUser} refetch={refetch} />
      <Routes>
        <Route path="/" element={<Homescreen User={User} />} />
        <Route path="/profile/:userid" element={<Profilepage User={User} match={matchuserid}/>} />
        <Route
          path="/post/:id"
          element={<SinglePost match={match} User={User} />}
        />
        <Route path="/login" element={<LoginPage setUser={setUser} User={User} refetch={refetch}/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/makefeed" element={<MakeFeedPage User={User} />} />
        <Route
          path="/feed/:feedname"
          element={<FeedPage match={matchfeed} User={User} setUser={setUser} />}
        />
        <Route
          path="/newpost/:postfeedname"
          element={<NewPostpage match={matchfeedpost} User={User} />}
        />
      </Routes>
    </Box>
  );
}

export default App;
