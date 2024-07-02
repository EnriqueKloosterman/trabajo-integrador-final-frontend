import { Route, Routes } from "react-router-dom";
import Article from "./componentes/article";
import Comments from "./componentes/Comments";
import Recipe from "./componentes/recipe";
// import Users from "./componentes/Users";
import Navbar from "./componentes/Navbar";
import Contact from "./componentes/Contact";
import NotFound from './componentes/NotFound';
import CreateRecipe from './componentes/CreateRecipe';
import RecipeDetail from "./componentes/RecipeDetail";
import ArticleDetail from "./componentes/ArticleDetail";
import CreateArticle from "./componentes/CreateArticle";
import RegisterPage from "./componentes/RegisterPage";
import LoginPage from "./componentes/LoginPage";
import UserProfile from "./componentes/UserProfile"; 
import Welcome from "./componentes/Welcome"; 
import Home from "./componentes/Home";
import ProtectedRoute from './auth/ProtectedRoute';
import Footer from "./componentes/footer";
import UpdateRecipe from "./componentes/recipe/UpdateRecipe";
import UpdateArticle from "./componentes/article/UpdateArticle";
import ProtectedRouteLogin from "./auth/ProtectedRouteLogin";
import UserList from "./componentes/UsersList";
import ProtectedAdminRoutes from "./auth/ProtectedAdminRoutes";

function App() {
  return (
    <div className="container px-3 bg-slate-100 mx-auto">
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Article />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route element={<ProtectedRouteLogin />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route> 

        <Route element={<ProtectedAdminRoutes />} >
          <Route path="/users" element={<UserList />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/update/recipe/:id" element={<UpdateRecipe />} />
          <Route path="/update/article/:id" element={< UpdateArticle />} />
        </Route>
        
        {/* Ruta de error 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
