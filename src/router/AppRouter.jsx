import { Route, Routes } from 'react-router-dom';
import ContactPage from '../pages/ContactPage';
//import Recipe from '../Recipe';
//import RecipeDetail from '../RecipeDetail';

// import ArticleDetail from '../pages/ArticleDetail';

import { Navbar } from '../Navbar';
import {
	HomePage,
	DashboardPage,
	LoginPage,
	RegisterPage,
} from '../pages';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<HomePage />} />
					<Route path='login' element={<LoginPage />} />
					<Route path='contact' element={<ContactPage />} />
					<Route path='register' element={<RegisterPage />} />
			
					{/*<Route path='recipedetail' element={<RecipeDetail />} />*/}
					{/*<Route path='recipe' element={<Recipe />} />/*/}
					{/* <Route path='articledetail' element={<ArticleDetail />} /> */}
					

					<Route
						path='dashboard'
						element={
							<PrivateRoute>
								<DashboardPage />
							</PrivateRoute>
						}
					/>
				</Route>
			</Routes>
		</>
	);
};
