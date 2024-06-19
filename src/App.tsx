import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavHeader from "./pages/Header-nav/NavHeader";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/page-not-found/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
