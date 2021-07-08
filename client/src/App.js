/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUid, selectUid } from "./slices/authenticate-slice";
import Authenticate from "./pages/authenticate/authenticate";
import Main from "./pages/main/main";

const App = () => {
	const dispatch = useDispatch();
	const uid = useSelector(selectUid);
	useEffect(() => {
		const cachedUser = JSON.parse(localStorage.getItem("user"));
		if (cachedUser) {
			dispatch(setUid(cachedUser.uid));
		}
	}, [dispatch]);

	return <div>{uid ? <Main /> : <Authenticate />}</div>;
};
export default App;
