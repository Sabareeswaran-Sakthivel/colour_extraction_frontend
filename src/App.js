import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Compare from "./Compare";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/detectchecking" element={<Compare />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
