import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import SinglePost from "./components/SinglePost";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={CreatePost} />
        <Route path="/edit/:id" exact component={EditPost} />
        <Route path="/single/:id" exact component={SinglePost} />
      </div>
    </Router>
  );
}

export default App;
