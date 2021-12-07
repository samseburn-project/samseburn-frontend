import React from "react";

import GlobalStyles from "./GlobalStyles";
import Main from "./components/detail/Main";
import ChallengeCard from "./components/home/ChallengeCard";

const App = () => {
	return (
		<>
			<GlobalStyles />
			<Main />
			<ChallengeCard />
		</>
	);
};

export default App;
