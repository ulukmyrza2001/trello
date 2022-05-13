import { useState } from 'react'

const useInput = (type) => {
	const [value, setValue] = useState('')
	const [inputTouched, setInputTouched] = useState(false)
	let error = ''

	const valueIsValid = value.trim() !== ''
	const valueInputIsInValid = !valueIsValid && inputTouched

	if (valueInputIsInValid) {
		error = `Введите ${type} `
	} 


	return {
		onChange: (e) => {
			setValue(e.target.value)
		},
		onBlur: () => {
			setInputTouched(true)
		},
		onClear: () => {
			setInputTouched(false)
			setValue('')
		},
		valueIsValid,
		valueInputIsInValid,
		value,
		error
	}
}

export default useInput
