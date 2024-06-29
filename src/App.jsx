import { Route, Routes } from "react-router-dom";
import Article from "./componentes/article";
import Comments from "./componentes/Comments"
import Recipe from "./componentes/recipe";
import Users from "./componentes/Users";
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
import Menu from "./componentes/Menu"; 
import Home from "./componentes/Home";
import ProtectedRoute from './auth/ProtectedRoute';
import Footer from "./componentes/footer";
import UpdateRecipe from "./componentes/recipe/UpdateRecipe";
import UpdateArticle from "./componentes/article/UpdateArticle";

function App() {
  return (
    <div className="container px-3 bg-slate-100 mx-auto">
      <Navbar />
      <Routes>
        <Route path="/recipes" element={<Recipe />} />
        <Route path="recipes/:id" element={<RecipeDetail />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/footer" element={< Footer />} />
        <Route path="/users" element={<Users />} />
        <Route exact path="/articles" element={<Article />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route element={<ProtectedRoute />}></Route>
        <Route path="/menu" element={<Menu />} />
        <Route element={<ProtectedRoute />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/update/recipe/:id" element={< UpdateRecipe />} />
        <Route path="/update/article/:id" element={< UpdateArticle />} />
      </Routes>
    </div>
  );
}

export default App;
