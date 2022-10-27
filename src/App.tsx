import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import Details from "./page/Details";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="details/:id" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
