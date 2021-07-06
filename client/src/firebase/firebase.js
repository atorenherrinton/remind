/** @format */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
	apiKey: 'AIzaSyBu9snYn6Pz_Fsp74SS71wsbbQnxH2CsTU',
	authDomain: 'remind-6aa6f.firebaseapp.com',
	projectId: 'remind-6aa6f',
	storageBucket: 'remind-6aa6f.appspot.com',
	messagingSenderId: '173243644315',
	appId: '1:173243644315:web:921c1a8a70d8776151893e',
	measurementId: 'G-038RZYBCV3',
};

firebase.initializeApp(config);

export default firebase;
