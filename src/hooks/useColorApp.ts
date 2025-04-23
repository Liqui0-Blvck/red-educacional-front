import { useContext } from 'react';
import ThemeContext from '../context/themeContext';

export default function useColorApp() {
	const { colorApp, setColorAppTheme } = useContext(ThemeContext);

	return { colorApp, setColorAppTheme };
}
