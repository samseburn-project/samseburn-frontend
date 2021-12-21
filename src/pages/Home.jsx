import React, { useState, useEffect } from "react";

import Navbar from "../components/common/Navbar";
import Main from "../components/home/Main";
import Footer from "../components/common/Footer";

const Home = () => {
	const [scrollTop, setScrollTop] = useState(0);
	const [isSticky, setIsSticky] = useState(false);

	const handleScroll = () => {
		window.addEventListener("scroll", () => {
			setScrollTop(window.scrollY);
		});
		if (scrollTop >= 88) setIsSticky(true);
		else setIsSticky(false);
	};

	useEffect(() => {
		handleScroll();
	}, [scrollTop]);

	return (
		<>
			<Navbar
				isSticky={isSticky}
				handleScroll={handleScroll}
				scrollTop={scrollTop}
			/>
			<Main />
			<Footer />
		</>
	);
};

export default Home;
