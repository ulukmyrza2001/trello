import React, { useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import LogoTrello from '../../components/UI/LogoTrello'
import useInput from '../../hooks/useInput'
import Input from '../../components/UI/input'
import Button from '../../components/UI/Button'
import { useDispatch, useSelector } from 'react-redux'
import { authActions, signIn } from '../../store/isAuthenticatedSlice'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const FormTrello = () => {
	const navigate = useNavigate()
	const { personalAccount,status,error, isAuth } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const userEmail = useInput('Email')
	const userPassword = useInput('пароль')
	let formIsValid = false

	formIsValid = userEmail.valueIsValid && userPassword.valueIsValid

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			signIn({
				email: userEmail.value,
				password: userPassword.value,
			}),
		)
		userEmail.onClear()
		userPassword.onClear()
	}
	useEffect(()=>{
		if (isAuth) navigate('/trelloMain')
		localStorage.setItem('auth',JSON.stringify(isAuth))
	},[isAuth])
	
	return (
		<>
			<GlobalStyle />
			<LogoTrello />
			<FormController>
				<Form onSubmit={submitHandler}>
					<H3>Вход в Тrello</H3>
					<P>{error}</P>
					<FormControl>
						<Input
							type='text'
							placeholder='Укажите адрес электронной почты'
							value={userEmail.value}
							onChange={userEmail.onChange}
							onBlur={userEmail.onBlur}
							isValidInput={userEmail.valueInputIsInValid}
						/>
						<P>{userEmail.error}</P>
					</FormControl>
					<FormControl>
						<Input
							type='password'
							placeholder='Введите пароль'
							value={userPassword.value}
							onChange={userPassword.onChange}
							onBlur={userPassword.onBlur}
							isValidInput={userPassword.valueInputIsInValid}
						/>
						<P>{userPassword.error}</P>
					</FormControl>
					<Button disabled={!formIsValid}>Войти</Button>
					<Links>
						<Link to = ''>Не удается войти?</Link> •
						<Link to = "/signup">Зарегистрировать аккаунт</Link>
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
