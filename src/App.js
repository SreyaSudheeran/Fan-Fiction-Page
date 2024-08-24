import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './components/Signup';
import Profile from './components/Profile';
import Write from './components/Write';
import Read from './components/Read';
import Search from './components/Search';
import ProtectedRoute from './components/ProtectedRoute';
import AddChapter from './components/AddChapter';
import Chapters from './components/Chapters';
import Mystory from './components/Mystory';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={Home} />} />
          <Route path="/about" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/Write" element={<ProtectedRoute element={Write} />} />
          <Route path="/read" element={<Read />} />
          <Route path="/search" element={<Search />} />
          <Route path="/chapter/:id" element={<Chapters />} />
          <Route path="/addchapter/:bookId" element={<AddChapter />} />
          <Route path="/Mystory" element={<Mystory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
