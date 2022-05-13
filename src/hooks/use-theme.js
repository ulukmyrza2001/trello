import { useEffect, useState } from 'react'

export const useTheme = () => {
	const [theme, setTheme] = useState('login')
	useEffect(() => {
		document.documentElement.className = theme
	}, [theme])

	return {
		theme,
		setTheme,
	}
}
