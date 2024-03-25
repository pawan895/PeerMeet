import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './components/SignIn.jsx';
import Dashboard from './components/dashboard.jsx';
import PeerJoine from './components/PeerJoine.jsx';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './context/AuthContext'
import RestrictedPage from './context/RestrictedPage'

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (<>
   <AuthContextProvider>
   <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<RestrictedPage><Dashboard /></RestrictedPage>} />
        <Route path='/peerjoin' element={<RestrictedPage><PeerJoine /></RestrictedPage>} />
        {/* <Route path='*' element={<PageNotFound />} />           */}
      </Routes>

    </div>

   </AuthContextProvider>
   

  </>

   

  );
}

export default App;
