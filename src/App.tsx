import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { About } from "./pages/About"
import { PostDetail } from "./pages/PostDetail"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import { PostCreate } from "./pages/PostCreate"
import { PostUpdate } from "./pages/PostUpdate"
import { PostDelete } from "./pages/PostDelete"

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts/:slug" element={<PostDetail/>} />
        <Route path="/posts/:slug/update" element={<PostUpdate />} />
        <Route path="/posts/:slug/delete" element={<PostDelete/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/create" element={<PostCreate/>} />
      </Routes>
    </Router>
  )

}

export default App
