import React from 'react'
import Flex from '../../components/UI/Flex'
import TodoTrello from '../../components/TodoTrello'
import CardTasks from '../../components/CardTasks'
import Container from '../../components/UI/Container'
import Header from './Layout/Header'

const TrelloMain = () => {
	return (
		<>
			<Header />
			<Container>
				<Flex>
					<TodoTrello />
					<CardTasks />
				</Flex>
			</Container>
		</>
	)
}

export default TrelloMain
