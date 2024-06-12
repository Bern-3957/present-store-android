// import { StatusBar } from 'expo-status-bar';
import {StatusBar, StyleSheet, View,} from 'react-native';
import { useFonts } from 'expo-font';
import { Navigation } from './Navigation';
import {Provider, useDispatch} from 'react-redux'
import { store } from './redux/store';

export default function App() {
	
	const [fontsLoaded, fontError] = useFonts({
		Pomidorko: require("./assets/fonts/Pomidorko_cyr.ttf"),
	});
	
	
  	return (
		<Provider store={store}>
			<StatusBar backgroundColor={"white"}/>
			<Navigation/>	
		</Provider>
  	);
}
