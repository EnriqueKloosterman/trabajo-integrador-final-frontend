import { Route, Routes } from 'react-router-dom';
import ContactPage from '../pages/ContactPage';
//import RecipePage from '..pages/RecipePage';
//import RecipeDetailPage from '..pages/RecipeDetailPage';

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