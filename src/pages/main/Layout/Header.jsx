import React from 'react'
import styled from 'styled-components'
import Button from '../../../components/UI/Button'
import LogoTrello from '../../../components/UI/LogoTrello'
import media from '../../../helpers/media'

const Header = ({ navigate }) => {
	return (
		<HeaderStyled>
			<div>
				<LogoTrello />
			</div>
			<div className='btgroup'>
				<Button className='login' onClick={() => navigate('/login')}>
					Login
				</Button>
				<Button className='signUp' onClick={() => navigate('/signup')}>
					Sign Up
				</Button>
			</div>
		</HeaderStyled>
	)
}

const HeaderStyled = styled.header`
	width: 100%;
	padding: 1rem 2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #ece8ff;
	${media.tablet` 
	  padding : 1rem;
	  flex-direction: column;  
	  align-items: start;
	`}
	${media.mobile` 
	align-items: start;
	`}
	 @media (max-width:560px) {
		flex-direction: column;
	}

	.btgroup {
		${media.tablet`
			width: 100%;
			display: flex;
			justify-content: space-around;
			`}
	}

	.signUp {
		background-color: #0065ff;
		padding: 0.6rem 3rem;
		font-size: 24px;
		font-weight: 300;
		cursor: pointer;
		&:hover {
			opacity: 0.8;
		}
		${media.tablet` 
		font-size:19px;
		padding: 0.6rem 4rem;
		margin-top: 30px;
	`}
		${media.mobile` 
		font-size:13px;
		margin-top: 30px;
	`}
	}
	.login {
		color: #0065ff;
		margin-right: 10px;
		padding: 0.6rem 3rem;
		font-size: 24px;
		font-weight: 300;
		cursor: pointer;
		transition: 0.2s;
		background-color: rgba(0, 0, 0, 0.1);
		&:hover {
			background-color: rgba(0, 0, 0, 0.2);
			opacity: 0.8;
		}
		${media.tablet` 
		font-size:19px;
		padding: 0.6rem 5rem;
		margin-top: 30px;
	`}
	${media.mobile` 
		font-size:13px;
		margin-top: 30px;
	`}
	}
`

export default Header
