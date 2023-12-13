import './App.css';
import { BrowserRouter, Link } from 'react-router-dom';
import Router from './Router';
import Login from './components/member/Login';
import Footer from './fragments/footer';
import Sidebar from './layout/sidebar';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar/>
        <Router />
      </BrowserRouter>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
