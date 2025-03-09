import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { About } from "./pages/About"
import { PostDetail } from "./pages/PostDetail"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Logout from "./pages/Logout"

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts/:slug" element={<PostDetail/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </Router>
  )

}

export default App
