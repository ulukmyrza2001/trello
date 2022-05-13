import React from 'react'
import styled from 'styled-components'

const Input = (props) => {
	return <InputTrello  {...props} />
}
const InputTrello = styled.input`
	padding: 0.8rem 1rem;
	border: none;
	outline: none;
	color: #bbbbbb;
	font-size: 17px;
	background-color: #fafbfc;
	border: 2px solid ${props=>props.isValidInput  ? 'red' : '#e4e6ea'};
	transition: 0.2s;
	&::placeholder {
		color: #bbbbbb;
	}
	&:focus {
		border-color: ${props=>props.isValidInput ? 'orange' : '#70afff'};
	}
`

export default Input
