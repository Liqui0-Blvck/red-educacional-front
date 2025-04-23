import { useState } from 'react';
import Cookies from 'js-cookie'

export interface ISetValue {
	(newValue: string | null): Promise<string | boolean>;
}

const useCookiesStorage = (keyName: string, defaultValue: string | null) => {
	const [storedValue, setStoredValue] = useState<string | null>(() => {
		try {
			const value = Cookies.get(keyName);
			if (value) {
				return JSON.parse(value) as string;
			}
			Cookies.set(keyName, JSON.stringify(defaultValue));
			return defaultValue;
		} catch (err) {
			return defaultValue;
		}
	});

	const setValue: ISetValue = (newValue) => {
		return new Promise((resolve) => {
			try {
				Cookies.set(keyName, JSON.stringify(newValue));
				resolve(true);
			} catch (err) {
				/* empty */
			}
			setStoredValue(newValue);
		});
	};
	return [storedValue, setValue];
};

export default useCookiesStorage;
