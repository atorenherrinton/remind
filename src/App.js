/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { selectUid } from "./slices/authenticate-slice";
import Authenticate from "./pages/authenticate/authenticate";
import Main from "./pages/main/main";

const App = () => {
	const uid = useSelector(selectUid);
	return <div>{uid ? <Main /> : <Authenticate />}</div>;
};
export default App;
