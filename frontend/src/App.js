import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { checkUser } from './actions/userActions'
import { useDispatch } from 'react-redux'
import { Register, Login, Profile, Laporan } from './pages';
import { Outlet,Navigate } from "react-router-dom";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkUser())
  }, [dispatch])
  
  const PrivateRoute= (props) => {
    let isLogin = false
    if(localStorage.token){
      isLogin = true
    }
    return(
        isLogin ? <Outlet /> : <Navigate to="login" />
    )
  }  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/laporan' element={<Laporan />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;