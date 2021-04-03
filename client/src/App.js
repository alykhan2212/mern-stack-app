import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import SinglePost from "./components/SinglePost";
import CreateCategories from "./components/CreateCategories"
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/create-post" exact component={CreatePost} />
        <Route path="/edit/:id" exact component={EditPost} />
        <Route path="/single/:postId" exact component={SinglePost} />
        <Route path="/create-categories" exact component={CreateCategories} />
      </div>
    </Router>
  );
}

export default App;
