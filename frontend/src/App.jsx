import AppBar from "./components/Appbar";
import "./App.css";
import Homescreen from "./components/pages/homepage/Homepage";
import { Box,} from "@mui/material";
import { Routes, Route, useMatch } from "react-router-dom";
import Profilepage from "./components/pages/profilepage/Profilepage";
import SinglePost from "./components/pages/singlepostpage/SinglePost";
import LoginPage from "./components/loginpage/Loginpage";
import RegisterPage from "./components/loginpage/Registerpage";
import MakeFeedPage from "./components/pages/feedpage/Makefeedpage";
import FeedPage from "./components/pages/feedpage/Feedpage";
import NewPostpage from "./components/pages/feedpage/NewPostpage";
import useMe from "./components/hooks/useMe";
import MyAccountpage from "./components/myaccountpage/MyAccountpage";
import Alerts from "./components/utils/Alerts";
import { useEffect, useState } from "react";

function App() {
  const token = sessionStorage.getItem("token");
  const { data, loading, refetch } = useMe();
  const [message, setmessage] = useState(null);
  const [severity, setseverity] = useState(null);
  const [open, setOpen] = useState(false);
  console.log(data);
  useEffect(() => {
    if (message) {
      return setOpen(true);
    }
  }, [message, setOpen]);
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
  let matchuserid = useMatch("/profile/:userid");
  if (!matchuserid) {
    matchuserid = null;
  }
  if (loading) {
    return <Box>loading</Box>;
  }
  let User = data ? data.me : null;
  if (!token) {
    User = null;
  }

  console.log(User, data);

  return (
    <Box>
      <AppBar User={User} refetch={refetch} />

        <Alerts
          msg={message}
          setmessage={setmessage}
          severity={severity}
          setOpen={setOpen}
          open={open}
        ></Alerts>


      <Box sx={{marginTop:"64px"}}>
        <Routes >
          <Route
            path="/"
            element={
              <Homescreen
                User={User}
                setmessage={setmessage}
                setseverity={setseverity}
              />
            }
          />
          <Route
            path="/profile/:userid"
            element={
              <Profilepage
                User={User}
                setseverity={setseverity}
                setmessage={setmessage}
                match={matchuserid}
              />
            }
          />
          <Route
            path="/post/:id"
            element={
              <SinglePost
                match={match}
                setseverity={setseverity}
                setmessage={setmessage}
                User={User}
                refetchUser={refetch}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginPage User={User} refetch={refetch} />}
          />
          <Route
            path="/register"
            element={<RegisterPage refetch={refetch} />}
          />
          <Route path="/makefeed" element={<MakeFeedPage User={User} />} />
          <Route
            path="/feed/:feedname"
            element={
              <FeedPage
                match={matchfeed}
                setseverity={setseverity}
                setmessage={setmessage}
                User={User}
                refetchUser={refetch}
              />
            }
          />
          <Route
            path="/newpost/:postfeedname"
            element={
              <NewPostpage
                match={matchfeedpost}
                User={User}
                refetchUser={refetch}
              />
            }
          />
          <Route
            path="/myaccount"
            element={<MyAccountpage User={User}></MyAccountpage>}
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
