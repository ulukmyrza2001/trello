import React from 'react'
import { VscEdit } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { columnActions } from '../store/column-slice'
import TrelloEditTask from './TrelloEditTask'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {HiMenuAlt3} from 'react-icons/hi'
import { Routes,Route } from 'react-router-dom'
import ModalTrello from './ModalTrello'

const CardTodo = ({ id, task, tasks, todo, showEditTask, parentId,title,description }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const editTodosHandler = (task) => dispatch(columnActions.showEditTasks(task))

	const ModalHandler = (e) =>{
		if(e.currentTarget.className === 'iconEdit')return
		navigate(`${task}`)
		dispatch(columnActions.showModal({id}))
	}

	return (
		<React.Fragment>
		<Routes>
		  <Route path=':column' element = {id === todo.id && <ModalTrello parentId = {parentId} id = {id} description = {description} task = {task} title={title} /> } />
		</Routes>
			<TodosStyled>
				<Task_Desc onClick={ModalHandler}>
					<Label>{task}</Label><br />
					{description &&<> <br /><HiMenuAlt3/></>}
				</Task_Desc>
				<IconEdit onClick={(e) => editTodosHandler(tasks)}>
					<VscEdit color='#3e4f6b' />
				</IconEdit>
				{showEditTask && id === todo.id && <TrelloEditTask
						task={todo.task}
						parentId={parentId}
						id={id}
					/>}
			</TodosStyled>
		</React.Fragment>
	)
}
const Task_Desc = styled.div`
	width: 88%;
`
const Label = styled.label`
	word-wrap: break-word;
	cursor: pointer;
`
const IconEdit = styled.div`
        display: flex;
        align-self: flex-start;
		padding: 5px;
		background-color: transparent;
		opacity: 0;
		border-radius: 3px;
		transition: 0.2s;
		&:hover {
			background-color: #d4d5d6;
	}
`
const TodosStyled = styled.li`
	padding: 0.3rem 0.2rem 0.3rem 0.5rem;
	list-style: none;
	background-color: #ffffff;
	color: #6d7d99;
	font-weight: 500;
	box-shadow: 2px 2px 5px rgb(0, 0, 0, 0.1);
	margin-bottom: 4px;
	border-radius: 3px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: 0.2s;
	position: relative;
	animation: yes ease-in 0.3s;
	font-size: 14px;
	cursor: pointer;
	@keyframes yes {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	&:hover ${IconEdit} {
		opacity: 1;
	}
	&:hover {
		background-color: whitesmoke;
	}
`

export default CardTodo
