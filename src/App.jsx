import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './components/dashboard.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (

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
        {/* <Route path='/signin' element={<SignIn />} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
        {/* <Route path='*' element={<PageNotFound />} />           */}
      </Routes>

    </div>

  );
}

export default App;
