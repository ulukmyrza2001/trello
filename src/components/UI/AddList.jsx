import React from 'react'
import Input from './input'
import Buttons from './Buttons'
import Flex from './Flex'
import BtnClose from './BtnClose'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const AddCard = ({ show, onSubmit, onChange, onClick, value, type,onBlur }) => {
	return (
		<>
			<GlabalStyle />
			<AddList type={type} show={show}>
				<form onSubmit={onSubmit}>
					<Input
						type='text'
						value={value}
						placeholder='Ввести заголовок списка'
						onChange={onChange}
						autoFocus
					/>
					<Flex align='center'>
						<Buttons>Добавить список</Buttons>
						<BtnClose onClick={onClick} />
					</Flex>
				</form>
			</AddList>
		</>
	)
}

const AddList = styled.div`
	width: ${(props) => (props.type === 'card' ? '270px' : '')};
	height: ${(props) => (!props.show ? '0px' : '83px')};
	background-color: #ebecf0;
	padding: ${(props) => (props.type === 'card' ? '0.25rem' : '0')};
	box-shadow: ${(props) =>
		props.type === 'card' ? '2px 2px 8px rgb(0, 0, 0, 0.1)' : 'none'};
	border-radius: 3px;
	transition: 0.3s;
	display: ${(props) => (!props.show ? 'none' : 'block')};
	form {
		animation: yes ease-in 0.3s;
	}
	@keyframes yes {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	input {
		width: 100%;
		padding: 0.5rem 1rem;
		border-radius: 3px;
		font-size: 14px;
		margin-bottom: 0.25rem;
		color: #3b3b55;
	}
	input::placeholder {
		color: #838ea0;
	}
`
const GlabalStyle = createGlobalStyle`
body{

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`

export default AddCard
