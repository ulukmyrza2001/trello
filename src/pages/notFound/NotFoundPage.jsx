import React from 'react'
import { Link } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import Centered from '../../components/UI/Centered'
import LinkHome from './LinkHome'

const NotFoundPage = () => {
	return (
		<>
			<GlobalStyle />
			<Title>404 Page Not Found</Title>
			<Centered>
				<Link to={'/trelloMain'}>
					<LinkHome />
				</Link>
			</Centered>
		</>
	)
}

const GlobalStyle = createGlobalStyle`
    body{
        background: var(--backgroundForm);
    }
`
const Title = styled.h1`
	font-size: 50px;
	color: #313b50;
	margin: 0 auto;
	text-align: center;
	a {
		text-decoration: none;
	}
`

export default NotFoundPage
