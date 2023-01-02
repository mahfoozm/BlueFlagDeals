import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PostsList from "./components/posts-list";
import AddPost from "./components/add-post";
import Post from "./components/post";

class App extends Component {
    render() {
      return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/posts" className="navbar-brand">
              BFD
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/posts"} className="nav-link">
                  Hot Deals
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>
  
          <div className="container mt-3">
            <Routes>
              <Route path="/" element={<PostsList/>} />
              <Route path="/posts" element={<PostsList/>} />
              <Route path="/add" element={<AddPost/>} />
              <Route path="/posts/:id" element={<Post/>} />
            </Routes>
          </div>
        </div>
      );
    }
  }
  
  export default App;