import { useLocation } from 'react-router-dom';

import { Footer, Header } from './components';

import { AllRoutes } from './routes/AllRoutes';

import './App.css';

function App() {
  // const [signedIn, setSignedIn] = useState(false);
  const token = sessionStorage.getItem('token')
  const location = useLocation();
  const adminPath ="/admin/login/"
  console.log(location);

    return (
    <div className='' >

    { (token && location.pathname !== adminPath && location.pathname !==  "/admin/" )&& <Header  />}
    <AllRoutes />
 <Footer /> 
    </div>
  );
  // }

  
}

export default App;
