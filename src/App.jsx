import { Routes, Route } from 'react-router-dom';
import Nosotros from './componentes/Nosotros';
import Users from './componentes/Users';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import Contacto from './componentes/Contacto';
import List from './componentes/List';
import { UserProvider } from './UserContext';
import './App.css';
import NotFound from './componentes/NotFound';
import category from './componentes/category';
import description from './componentes/description';
import detail from './componentes/detail';
import discount from './componentes/discount';
import Footer from './componentes/Footer';
import Header from './componentes/Header';
import productImage from '.componentes/productImage';
import product from './componentes/product';


function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/register" element={<Registro />} />
                <Route path="/category" element={<Category />} />
                <Route path="/description" element={<Description />} />
                <Route path="/detail" element={<Contacto />} />
                <Route path="/discount" element={<Discount />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/footer" element={<Footer />} />
                <Route path="/header" element={<Header />} />
                <Route path="/productImage" element={<ProductImage />} />
                <Route path="/product" element={<Product />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/list" element={<List />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/users" element={<Users />} />
                </Route>
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </UserProvider>
    );
}



export default App;