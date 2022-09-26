import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      </header>
        <Routes>
            <Route path="/" element={<Home />}></Route>
          <Route>Page Not Found!</Route>
        </Routes>
    </div>
  );
}

export default App;
