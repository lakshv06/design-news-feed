import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavHeader from "./pages/Header-nav/NavHeader";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import CreatePost from "./pages/Create-post/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
