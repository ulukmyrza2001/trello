import { useState } from 'react'

const useInput = (validation) => {
	const [value, setValue] = useState('')
	const [inputTouched, setInputTouched] = useState(false)

	const valueIsValid = value.trim() !== ''
	const valueInputIsInValid = !valueIsValid && inputTouched

	const inputValidRegex = validation.test(value)
	const validateRejex = !validation.test(value) && inputTouched

	const isvalidInput = valueInputIsInValid || validateRejex
	const isvalidInputNoTouched = !validateRejex && !valueIsValid

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
		valueInputIsInValid,
		inputValidRegex,
		value,
		isvalidInput,
		isvalidInputNoTouched,
		validateRejex,
	}
}

export default useInput
