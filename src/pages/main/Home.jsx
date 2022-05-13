import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import Header from './Layout/Header'
import { createGlobalStyle } from 'styled-components'
import media from '../../helpers/media'

const Home = () => {
	const navigate = useNavigate()
	return (
		<>
			<GlobalStyle />
			<Header navigate={navigate} />
			<Main>
				<Div>
					<Title>
						Trello помогает командам эффективно решать рабочие
						задачи.
					</Title>
					<Text>
						Работайте в команде, управляйте проектами и выводите
						продуктивность на новый уровень собственным уникальным
						способом вместе с Trello.
					</Text>
				</Div>
				<Div>
					<Img
						src='https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png'
						alt=''
					/>
				</Div>
			</Main>
		</>
	)
}

const Main = styled.div`
	padding-top: 50px 50px;
	max-width: 1400px;
	margin: 0 auto;
	display: flex;
	justify-content: space-around;
	align-items: center;
	${media.desktop`   
		flex-direction:column;
		padding:1rem;
	`}
	${media.tablet`   
		flex-direction:column;
		padding:1rem;
	`}
`

const Div = styled.div`
	max-width: 720px;
`

const Title = styled.h1`
	font-size: 60px;
	color: #091e42;
	${media.tablet`   
		font-size:40px;
		margin-bottom:40px;
	`}
	${media.mobile`   
	font-size:30px;
		margin-bottom:40px;
	`}
`


const Img = styled.img`
	max-width: 400px;
	max-height: 500px;
	${media.mobile`   
	max-width: 200px;
	max-height: 200px;
	`}
`

const Text = styled.p`
	margin-top: 20px;
	font-size: 24px;
	line-height: 150%;
	letter-spacing: 1px;
	${media.tablet`   
		font-size:22px;
		margin-bottom:40px;
	`}
	${media.mobile`   
	font-size:15px;
		margin-bottom:30px;
	`}
`

const GlobalStyle = createGlobalStyle`
body{
	background-color: #ece8ff;
}
`
export default Home
