import React from 'react'
import styled from 'styled-components'

const Buttons = (props) => {
	return <ButtonTrello {...props}>{props.children}</ButtonTrello>
}

const ButtonTrello = styled.button`
	padding: 0.5rem 1rem;
	border: none;
	outline: none;
	color: #f1f8ef;
	border-radius: 3px;
	background-color: #0079bf;
	font-weight: 400;
	font-size: 14px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

	&:hover {
		background-color: #00629b;
	}
	@keyframes message {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	&:disabled,
	&:disabled:active {
		cursor: not-allowed;
	}
	&:disabled:hover .message-blue {
		display: block;
	}
`

export default Buttons
