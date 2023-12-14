import './App.css';
import { BrowserRouter, Link } from 'react-router-dom';
import Router from './Router';
import Login from './components/member/Login';
import Footer from './fragments/footer';
import {StompSessionProvider} from "react-stomp-hooks";
// import Sidebar from './fragments/sidebar';

function App() {

  return (
    <div className="App">
        <StompSessionProvider
            url={'http://localhost:8082/ws-stomp'}>
      {/* <Sidebar/> */}
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      {/* <Footer/> */}
        </StompSessionProvider>
    </div>
  );
}

export default App;
