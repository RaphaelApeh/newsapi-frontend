import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { About } from "./pages/About"
import { PostDetail } from "./pages/PostDetail"
import SignUp from "./pages/SignUp"

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts/:slug" element={<PostDetail/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
  )

}

export default App
