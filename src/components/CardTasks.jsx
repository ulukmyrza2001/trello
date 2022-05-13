import styled from 'styled-components'
import { AiOutlinePlus } from 'react-icons/ai'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { columnActions } from '../store/column-slice'
import AddCard from './UI/AddList'

const AddingCard = () => {
	const data = useSelector((state) => state.column.colunmns)
	const dispatch = useDispatch()
	const [show, setShow] = useState(false)
	const column = useInput()

	const showHandler = () => setShow(true)
	const hideHandler = () => setShow(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		if (column.value.trim() === '') return
		dispatch(
			columnActions.createColumn({
				title: column.value,
				id: Math.random().toString(),
			}),
		)
		column.onClear()
	}
	return (
		<WrapperList>
			<List show={show} onClick={showHandler}>
				<AiOutlinePlus color='white' />
				<span>
					{data.length === 0
						? 'Добавить список'
						: 'Добавить ещё одну колонку'}
				</span>
			</List>
			<AddCard
			    type = {'card'}
				value={column.value}
				onSubmit={handleSubmit}
				onChange={column.onChange}
				onClick={hideHandler}
				show={show}
			/>
		</WrapperList>
	)
}
const WrapperList = styled.section`
	position: relative;
	width: 270px;
`

const List = styled.div`
	width: 270px;
	height: 45px;
	padding: 0rem 0.5rem;
	background-color: rgba(0, 0, 0, 0.3);
	color: white;
	display: flex;
	align-items: center;
	border-radius: 3px;
	box-shadow: 2px 2px 8px rgb(0, 0, 0, 0.1);
	cursor: pointer;
	position: absolute;
	transition: 0.2s;
	z-index: ${(props) => (props.show ? '-1' : '1')};
	opacity: ${(props) => (props.show ? '0' : '1')};
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	&:hover {
		background-color: rgba(0, 0, 0, 0.4);
	}
	span {
		margin-left: 5px;
		font-size: 14px;
		font-weight: 500;
	}
`

export default AddingCard
