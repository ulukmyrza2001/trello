import React, { useState } from 'react'
import styled from 'styled-components'
import Input from './UI/input'
import { AiOutlinePlus, AiTwotoneDelete } from 'react-icons/ai'
import { BiBox } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import Flex from './UI/Flex'
import { columnActions } from '../store/column-slice'
import CardTodo from './CardTodo'
import AddCard from './UI/AddList'
import { createGlobalStyle } from 'styled-components'
import { useCallbackPrompt } from '../hooks/useCallbackPrompt'
import { AlertDialog } from '../components/UI/Prompt'

const TodoItemTrello = ({ title, id, todos, task, showEditTask }) => {
	const [todoValue, setTodoValue] = useState('')
	const [titleInp, setTitleInp] = useState(title)
	const dispatch = useDispatch()
	const [showDialog, setShowDialog] = useState(false)
	const [show, setShow] = useState(false)
	const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(showDialog)

	const changeHandler = (e) => setTitleInp(e.target.value)

	const changeTodoHandler = (e) => {
		setShowDialog(true)
		setTodoValue(e.target.value)
	}

	const showHandler = () => setShow(true)
	const hideHandler = () => setShow(false)

	const deleteColumnHandler = () => dispatch(columnActions.deleteColumn(id))

	const handleSubmit = (e) => {
		e.preventDefault()
		setShowDialog(false)
		if (todoValue.trim() === '') return
		setTodoValue('')
		dispatch(columnActions.createTask({ task: todoValue, id: id }))
	}

	const editTitleHandler = (e) => {
		if (e.key === 'Enter') {
			if (!titleInp.trim()) return
			dispatch(columnActions.editTitle({ id, value: titleInp }))
			e.target.blur()
		}
	}

	let content = (
		<Flex align='center'>
			<BtnTaskAdd onClick={showHandler}>
				<AiOutlinePlus color='#3e4f6b' />
				<span> Добавить карточку</span>
			</BtnTaskAdd>
			<Icon className='icon'>
				<BiBox color='#3e4f6b' fontSize={'15px'} />
			</Icon>
		</Flex>
	)
	if (show) {
		content = (
			<AddCard
				value={todoValue}
				onClick={hideHandler}
				onChange={changeTodoHandler}
				onSubmit={handleSubmit}
				show={show}
				onBlur={() => setShow(false)}
			/>
		)
	}

	return (
		<WrapperList>
			<AlertDialog
				open={showPrompt}
				onClose={cancelNavigation}
				onConfirm={confirmNavigation}
				message='Are sure to leave this page'
			/>
			<GlobalStyle />
			<Card show={show}>
				<CardDiv>
					<Flex align='center'>
						<Input
							onKeyDown={editTitleHandler}
							className='title'
							value={titleInp}
							onChange={changeHandler}
						/>
						<Icon onClick={deleteColumnHandler}>
							<AiTwotoneDelete
								color='#3e4f6b'
								fontSize={'15px'}
							/>
						</Icon>
					</Flex>
				</CardDiv>
				<Flex justify='center'>
					<Ul>
						{todos.map((el) => (
							<CardTodo
								title={title}
								key={el.id}
								id={el.id}
								task={el.task}
								tasks={el}
								todo={task}
								description={el.description}
								showEditTask={showEditTask}
								parentId={id}
							/>
						))}
					</Ul>
				</Flex>
				{content}
			</Card>
		</WrapperList>
	)
}

const WrapperList = styled.section`
	position: relative;
	width: 270px;
	margin-right: 10px;
	animation: yes ease-in-out 0.3s;
	@keyframes yes {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`
const CardDiv = styled.div`
	padding: 0.3rem 0;
	background-color: #ebecf0;
`
const Icon = styled.div`
	background-color: transparent;
	&:hover {
		background-color: #d4d5d6;
	}
	padding: 0.3rem 0.4rem;
	border-radius: 4px;
	background-color: #ebecf0;
`
const Ul = styled.ul`
	width: 98.5%;
	position: relative;
	margin-bottom: 5px;
`
const BtnTaskAdd = styled.button`
    
	border: none;
	width: 95%;
	height: 30px;
	padding: 0rem 0.5rem;
	background-color: transparent;
	color: #3e4f6b;
	display: flex;
	align-items: center;
	border-radius: 3px;
	cursor: pointer;
	transition: 0.2s;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	span {
		margin-left: 5px;
		font-size: 14px;
		font-weight: 500;
	}
	&:hover {
		background-color: #d4d5d6;
	}
`
const Card = styled.div`
	width: 100%;
	background-color: #ebecf0;
	padding: 0.3rem;
	padding-bottom: ${(props) => (!props.show ? '0.4rem' : '0rem')};
	padding-top: 0rem;
	box-shadow: 2px 2px 8px rgb(0, 0, 0, 0.1);
	border-radius: 3px;
	transition: 0.2s;

	.title {
		width: 100%;
		padding: 0.2rem 0.7rem;
		background-color: transparent;
		border: 2px solid transparent;
		cursor: pointer;
		border-radius: 3px;
		font-size: 14px;
		color: #3e4f6b;
		font-weight: 500;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		&:focus {
			background-color: #ffffff;
			border: 2px solid #0079bf;
			cursor: text;
		}
	}
`
const GlobalStyle = createGlobalStyle`
body{

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`

export default TodoItemTrello
