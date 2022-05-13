import React, { useState } from 'react'
import { ImBoxRemove } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { columnActions } from '../store/column-slice'
import Backdrop from './UI/Backdrop'
import Buttons from './UI/Buttons'
import Flex from './UI/Flex'
import { RiDeleteBin5Line } from 'react-icons/ri'

const TrelloEditTask = ({ task, id, parentId }) => {
	const [value, setValue] = useState(task)
	const dispatch = useDispatch()

	const saveEditedTaskHandler = () => {
		if (!value.trim()) return
		dispatch(columnActions.editTask({ task: value, id, parentId }))
	}

	const removeTaskHandler = () => {
		dispatch(columnActions.removeTask({ id, parentId }))
	}
	return (
		<>
			<Backdrop
				onClick={() => dispatch(columnActions.hideEditedTask())}
			/>
			<EditTask>
				<TextArea
					autoFocus
					onFocus={(e) => e.target.select()}
					onChange={(e) => setValue(e.target.value)}
					value={value}
				/>
				<br />
				<br />
				<DivGroup className='groupMenu'>
					<DivMenu onClick={removeTaskHandler}>
						<RiDeleteBin5Line />
						<Span>Удалить</Span>
					</DivMenu>
					<DivMenu onClick={removeTaskHandler}>
						<ImBoxRemove />
						<Span>Архивировать</Span>
					</DivMenu>
				</DivGroup>
				<Flex justify='space-between'>
					<Buttons
						className='btn'
						onClick={saveEditedTaskHandler}
						type={'submit'}
					>
						Cохранить
					</Buttons>
				</Flex>
			</EditTask>
		</>
	)
}
const TextArea = styled.textarea`
	border: none;
	width: 100%;
	height: 80px;
	padding: 5px;
	outline: none;
`
const DivGroup = styled.div`
	position: absolute;
	top: 5.5rem;
`
const DivMenu = styled.div`
	position: relative;
	left: 264px;
	bottom: 87px;
	width: 144px;
	background-color: rgba(0, 0, 0, 0.7);
	color: #ffffff;
	padding: 0.5rem 0.6rem;
	font-size: 13px;
	transition: 0.2s;
	margin-bottom: 5px;
	animation: menu ease-in-out 0.3s;
	cursor: pointer;
	&:hover {
		transform: translateX(0.5rem);
	}
	@keyframes menu {
		0% {
			opacity: 0;
			transform: translateX(-30px);
		}
		100% {
			opacity: 1;
			transform: translateX(0px);
		}
	}
`
const Span = styled.span`
	margin-left: 6px;
`
const EditTask = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	animation: EDIT ease-in-out 0.3s;
	@keyframes EDIT {
		0% {
			opacity: 0;
			transform: translateY(-30px);
		}
		100% {
			opacity: 1;
			transform: translateY(0px);
		}
	}
	.btn {
		z-index: 10;
	}
`

export default TrelloEditTask
