import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PostsDiv from "./posts";
import SignInForm from "./SignInForm";
import useAuth from "./useAuth";
import "./App.css";

function App() {
  const { token, user } = useAuth();
  return (
    <div className="App">
      <header>
        <h1>Stranger's Things</h1>
        <Link to="/">Posts</Link>
        <Link to="/sign-in">Sign In</Link>
      </header>
      <div id="main-section">
        <Routes>
          <Route path="/" element={<PostsDiv />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
