import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import TodoItemTrello from './TodoItemTrello'
import {createGlobalStyle} from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import Flex from './UI/Flex'

const TodoTrello = () => {
	const { colunmns, task, editShowTask } = useSelector((state) => state.column)
	const [searchParams,setSearchParams] = useSearchParams()
	const columnQuery = searchParams.get('column') || ''
	
	useEffect(()=>{
		localStorage.setItem('trello',JSON.stringify(colunmns))
	},[colunmns])
	return (
		<Flex>
			<GlobalStyle/>
			{colunmns.filter(el=>el.title.includes(columnQuery)).map((el) => (
				<TodoItemTrello
					showEditTask={editShowTask}
					task={task}
					key={el.id}
					id={el.id}
					title={el.title}
					todos={el.todos}
				/>
			))}
		</Flex>
	)
}
const GlobalStyle = createGlobalStyle`
body{
	background: var(--background);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
}
`

export default TodoTrello
