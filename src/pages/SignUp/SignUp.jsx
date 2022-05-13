import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import LogoTrello from '../../components/UI/LogoTrello'
import useForm from '../../hooks/useForm'
import Input from '../../components/UI/input'
import Button from '../../components/UI/Button'
import { regEmail, regPass } from '../../helpers/regex'
import { Link } from 'react-router-dom'
import { authActions, signUp } from '../../store/isAuthenticatedSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, AlertTitle } from '@mui/material'
import Flex from '../../components/UI/Flex'
import { useCallbackPrompt } from '../../hooks/useCallbackPrompt'
import { AlertDialog } from '../../components/UI/Prompt'

const FormTrello = () => {
	const { status, error } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const userEmail = useForm(regEmail)
	const userPassword = useForm(regPass)
	const [showDialog, setShowDialog] = useState(false)
	const [showPrompt, confirmNavigation, cancelNavigation] =
		useCallbackPrompt(showDialog)
	let errors = { emailError: '', passwordError: '' }
	let formIsValid = false

	formIsValid = userEmail.inputValidRegex && userPassword.inputValidRegex

	if (userEmail.valueInputIsInValid) {
		errors.emailError = 'Введите Email!!!'
	} else if (userEmail.validateRejex) {
		errors.emailError = 'Email неккоректен!!!'
	}

	if (userPassword.valueInputIsInValid) {
		errors.passwordError = 'Введите пароль!!!'
	} else if (userPassword.validateRejex) {
		errors.passwordError = 'не надежный пароль!!!'
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			signUp({
				email: userEmail.value,
				password: userPassword.value,
			}),
		)
		setShowDialog(false)
		userEmail.onClear()
		userPassword.onClear()
	}

	return (
		<>
			<AlertDialog
				open={showPrompt}
				onClose={cancelNavigation}
				onConfirm={confirmNavigation}
				message='Are sure to leave this page'
			/>
			<GlobalStyle />
			<Flex justify='center'>
				<LogoTrello />
			</Flex>
			<FormController>
				<Form onFocus={() => userPassword.value || (userEmail.value && setShowDialog(true))} onSubmit={submitHandler}>
					<H3>Зарегистрироваться в Тrello</H3>
					<P>{error}</P>
					<FormControl>
						<Input
							type='text'
							placeholder='Укажите адрес электронной почты'
							value={userEmail.value}
							onChange={userEmail.onChange}
							onBlur={userEmail.onBlur}
							isValidInput={userEmail.isvalidInput}
						/>
						<P>{errors.emailError}</P>
					</FormControl>
					<FormControl>
						<Input
							type='password'
							placeholder='Введите пароль'
							value={userPassword.value}
							onChange={userPassword.onChange}
							onBlur={userPassword.onBlur}
							isValidInput={userPassword.isvalidInput}
						/>
						<P>{errors.passwordError}</P>
					</FormControl>
					<Button disabled={!formIsValid}>Зарегистрироваться</Button>
					<Links>
						<Link to=''>Не удается войти?</Link> •
						<Link to='/login'>Войти</Link>
						<Message status={status}>Нажмите здесь чтобы войти</Message>
					</Links>
				</Form>
			</FormController>
		</>
	)
}
const Links = styled.span`
	position: relative;
	width: 70%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	a {
		font-size: 12px;
		color: #598ede;
	}
`
const H3 = styled.h3`
	color: #5e6c84;
`
const P = styled.p`
	color: red;
	margin-top: 10px;
	font-size: 12px;
`
const FormControl = styled.div`
	width: 90%;
	input {
		width: 100%;
	}
`
const Form = styled.form`
	width: 450px;
	height: 340px;
	padding: 1rem;
	background-color: #ffffff;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	margin: 80px auto;
	button {
		width: 90.5%;
	}
`
const FormController = styled.div`
	width: 100%;
	height: 80vh;
	position: relative;
	display: flex;
	justify-content: center;
`
const Message = styled.div`
	position: absolute;
	top: 16px;
	left: 278px;
	color: #ffffff;
	padding: 0.3rem 2.2rem;
	background-color: #a8ddfd;
	width: 200px;
	height: 50px;
	border-radius: 10px;
	animation: message ease-in 0.4s;
	font-weight: 500;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	display: ${(props) => (props.status === 'resolved' ? 'block' : 'none')};
	@keyframes message {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	&:after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-top: 15px solid #a8ddfd;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;
		top: 0;
		left: -15px;
	}
`
const GlobalStyle = createGlobalStyle`
body{
	background: var(--backgroundForm);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
}
`
export default FormTrello
