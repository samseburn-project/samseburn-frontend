import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import GlobalStyles from "./GlobalStyles";
import ScrollToTop from "./ScrollToTop";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Register from './pages/Register';
import MyPage from "./pages/MyPage";

const App = () => {
	return (
		<BrowserRouter>
			<SnackbarProvider
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<GlobalStyles />
				<ScrollToTop>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/detail/:id" element={<Detail />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/my" element={<MyPage />} />
					</Routes>
				</ScrollToTop>
			</SnackbarProvider>
		</BrowserRouter>
	);

};

export default App;
