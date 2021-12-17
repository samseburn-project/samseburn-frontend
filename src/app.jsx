import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import RegisterPage from "./components/register/RegisterPage";
import MyPage from "./pages/MyPage";

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/my" element={<MyPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
