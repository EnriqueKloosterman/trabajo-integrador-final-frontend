import {Navigate,Outlet,} from 'react-router-dom';
  
  //funcion que verifica si usuario esta loggeado
  function useAuth(){
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return storedUser;
    } else {
      return false
    }
  }
   
  //Componente
  function ProtectedRoute(){
    let user = useAuth()
    if(!user) {
      return <Navigate to="/" />
    } else{
      return <Outlet/>
    }
  }
  
  export default ProtectedRoute;