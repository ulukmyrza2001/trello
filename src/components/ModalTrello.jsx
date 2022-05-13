import React, {  useState } from 'react'
import styled from 'styled-components'
import Backdrop from './UI/Backdrop'
import { AiFillCreditCard } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { AiOutlineAlignRight } from 'react-icons/ai'
import Input from './UI/input'
import Buttons from './UI/Buttons'
import Flex from './UI/Flex'
import { createGlobalStyle } from 'styled-components'
import { BsPerson } from 'react-icons/bs'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { columnActions } from '../store/column-slice'
import { useNavigate } from 'react-router-dom'
import BtnClose from './UI/BtnClose'

const ModalTrello = ({ parentId, title, description, id, task }) => {
	console.log(parentId)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [showDesc, setShowDesc] = useState(false)
	const [inpValue, setInpValue] = useState(task)
	const [textAreaValue, setTextAreaValue] = useState(description)

	const inpChangeHandler = (e) => setInpValue(e.target.value)

	const areaChangeHandler = (e) => setTextAreaValue(e.target.value)

	const showHandler = () => setShowDesc(true)

	const saveDescriptionHandler = () => {
		dispatch(
			columnActions.saveDescription({
				description: textAreaValue,
				id,
				parentId,
			}),
		)
		setShowDesc(false)
	}

	const editTitleHandler = (e) => {
		if (e.key === 'Enter') {
			if (!inpValue.trim()) return
			dispatch(columnActions.editTask({ task: inpValue, id, parentId }))
			e.target.blur()
		}
	}

	let content = (
		<Description
			style={{ background: textAreaValue ? 'transparent' : '#eaecf0' }}
			onClick={showHandler}
		>
			{textAreaValue || ' Добавить более подробнее описание...'}
		</Description>
	)

	if (showDesc) {
		content = (
			<Flex direction='column' align='start'>
				<TextArea
					onFocus={(e) => e.target.select()}
					value={textAreaValue}
					onChange={areaChangeHandler}
					onClick={showHandler}
					autoFocus
					placeholder='Добавить более подробнее описание...'
				></TextArea>
				<Flex align='center'>
					<Buttons
						onClick={saveDescriptionHandler}
						className='btn_desc'
					>
						Cохранить
					</Buttons>
					<IoMdClose
						onClick={() => setShowDesc(false)}
						color='#42526e'
						fontSize={'27px'}
						cursor='pointer'
					/>
				</Flex>
			</Flex>
		)
	}
	return ReactDOM.createPortal(
		<>
			<GlabalStyle />
			<Backdrop />
			<ModalDiv>
				<SetionGroup1>
					<AiFillCreditCard color='#42526e' fontSize='18px' />
					<Input
						type='text'
						className='title'
						value={inpValue}
						onChange={inpChangeHandler}
						onKeyDown={editTitleHandler}
					/>
					<ButtonClose onClick={() => navigate('/trelloMain')}>
						<IoMdClose color='#42526e' fontSize={'17px'} />
					</ButtonClose>
				</SetionGroup1>
				<P>в колонке {title}</P>
				<DivSection>
					<Flex>
						<AiOutlineAlignRight color='#42526e' fontSize='18px' />
						<BlockItem>
							<Flex>
								<H3>Описание</H3>
								{textAreaValue && !showDesc && (
									<Buttons
										onClick={() => setShowDesc(true)}
										className='btn'
									>
										изменить
									</Buttons>
								)}
							</Flex>
							{content}
						</BlockItem>
					</Flex>
					<Block2>
						<H6>Добавить на карточку</H6>
						<Lists>
							<BsPerson /> <Span>Участники</Span>
						</Lists>
						<Lists>
							<BsPerson /> <Span>Meтки</Span>
						</Lists>
						<Lists>
							<BsPerson /> <Span>Чек-лист</Span>
						</Lists>
						<Lists>
							<BsPerson /> <Span>Даты</Span>
						</Lists>
					</Block2>
				</DivSection>
			</ModalDiv>
		</>,
		document.getElementById('modal'),
	)
}

const GlabalStyle = createGlobalStyle`
body{

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`
const BlockItem = styled.div`
	margin-left: 20px;
	display: flex;
	flex-direction: column;
`
const H3 = styled.h3`
	font-size: 19px;
	color: #3e4f6b;
	margin-bottom: 10px;
`
const Block2 = styled.div`
	width: 170px;
	display: flex;
	flex-direction: column;
`
const H6 = styled.h6`
	margin-bottom: 10px;
	font-size: 12px;
	color: #5e6c84;
`
const Lists = styled.div`
	width: 168px;
	display: flex;
	align-items: center;
	font-size: 14px;
	color: #172b4d;
	padding: 0.4rem 1rem;
	background-color: #eaecf0;
	border-radius: 2px;
	margin-bottom: 7px;
	cursor: pointer;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`
const Span = styled.span`
	margin-left: 10px;
`
const Description = styled.div`
	word-wrap: break-word;
	background-color: #eaecf0;
	padding: 0.6rem 0.8rem;
	width: 500px;
	height: 60px;
	color: #3e4f6b;
	font-size: 14px;
	letter-spacing: 0.4px;
	transition: 0.3s;
	cursor: pointer;
`
const TextArea = styled.textarea`
	padding: 0.6rem 0.8rem;
	outline: none;
	width: 500px;
	color: #3e4f6b;
	font-size: 16px;
	transition: 0.3s;
	height: 100px;
	border: 12px solid;
	background-color: #ffffff;
	border: 2px solid #70afff;
	margin-bottom: 20px;
	animation: DESC ease-in-out 0.3s;
	&::placeholder {
		color: #3e4f6b;
	}
	@keyframes DESC {
		0% {
			opacity: 0;
			height: 0px;
		}
		100% {
			opacity: 1;
			height: 100px;
		}
	}
`
const DivSection = styled.div`
	margin-top: 30px;
	display: flex;
	justify-content: space-between;
	.btn {
		margin-left: 10px;
		background-color: #eaecf0;
		color: #172b4d;
		margin-bottom: 20px;
		&:hover {
			background-color: rgb(216, 216, 216);
		}
	}

	.btn_desc {
		margin-right: 10px;
		transition: 0.3s;
		cursor: pointer;
	}
`
const ModalDiv = styled.div`
	position: absolute;
	padding: 1rem 1rem 1rem 1rem;
	top: 50%;
	left: 50%;
	width: 769px;
	height: 466px;
	z-index: 1000;
	margin-top: 20px;
	background-color: #f4f5f7;
	transform: translate(-50%, -50%);
	animation: Modal ease-in-out 0.5s;
	@keyframes Modal {
		0% {
			top: 40%;
			opacity: 0;
		}
		100% {
			top: 50%;
			opacity: 1;
		}
	}
`
const P = styled.p`
	margin-left: 37px;
	font-size: 13px;
	color: #42526e;
`
const SetionGroup1 = styled.section`
	position: relative;
	display: flex;
	align-items: center;
	.title {
		width: 100%;
		padding: 0.2rem 0.7rem;
		background-color: transparent;
		border: 2px solid transparent;
		cursor: pointer;
		border-radius: 3px;
		font-size: 19px;
		color: #3e4f6b;
		font-weight: 500;
		margin-left: 8px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		&:focus {
			background-color: #ffffff;
			border: 2px solid #70afff;
			cursor: text;
		}
	}
`
const ButtonClose = styled.button`
	border: none;
	color: #42526e;
	background-color: transparent;
	position: relative;
	bottom: 0.7rem;
	left: 0.9rem;
	border-radius: 50%;
	padding: 0.8rem;
	transition: 0.2s;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`

export default ModalTrello
