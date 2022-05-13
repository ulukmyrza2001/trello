import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BiSearch,BiArchive,BiBlanket,BiLeftIndent,BiListUl } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { authActions } from '../../../store/isAuthenticatedSlice'
import { columnActions } from '../../../store/column-slice'
import { useSearchParams } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import media from '../../../helpers/media'
import { CgMenuGridR } from 'react-icons/cg'
import Drawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import { List } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon';
import Buttons from '../../../components/UI/Buttons'

const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
	const [drawer, setDrawer] = useState(false)
	const logoutHandler = () => {
		dispatch(columnActions.logout())
		dispatch(authActions.logout())
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.target
		const query = form.search.value
		if (query.trim() === '') navigate('/trelloMain')
		setSearchParams({ column: query })
	}
	const onConfirm = () => {
		setDrawer(true)
	}
	const onClose = () => {
		setDrawer(false)
	}
	return (
		<>
			<GlobalStyle />
			<HeaderDiv>
				<div className='block_for_icon_and_ul'>
					<img src='https://img.icons8.com/color/48/000000/trello.png' />
					<h1>TRELLO</h1>
					<ul>
						<li>Рабочие пространства</li>
						<li>Недавние</li>
						<li>В избранном</li>
						<li>Шаблоны</li>
					</ul>
					<button onClick={logoutHandler}>Logout</button>
					<Drawer
						anchor={'left'}
						open={drawer}
						onClose={onClose}
					>
						<List>
							<ListItem><ListItemIcon><BiLeftIndent/></ListItemIcon>Рабочие пространства</ListItem>
							<ListItem><ListItemIcon><BiArchive/></ListItemIcon> Недавние</ListItem>
							<ListItem><ListItemIcon><BiBlanket/></ListItemIcon>В избранном</ListItem>
							<ListItem><ListItemIcon><BiLeftIndent/></ListItemIcon>Шаблоны</ListItem>
							<ListItem><ListItemIcon><Buttons onClick={logoutHandler}>Logout</Buttons></ListItemIcon></ListItem>
						</List>
						
					</Drawer>
				</div>

				<div>
					<form onSubmit={handleSubmit} className='search'>
						<input
							placeholder='Search'
							name='search'
							type='search'
						/>
						<BiSearch
							className='img'
							color='white'
							fontSize={'15px'}
						/>
					</form>
				</div>
				<div onClick={onConfirm} className='menu'>
					<CgMenuGridR fontSize={'20px'} color='white' />
				</div>
			</HeaderDiv>
		</>
	)
}
const GlobalStyle = createGlobalStyle`
body{
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`
const HeaderDiv = styled.div`
	position: fixed;
	width: 100%;
	height: 50px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	padding: 0 1rem;
	align-items: center;
	background: #565958a8;
	z-index: 3;
	.menu {
		display: none;
		cursor: pointer;
		${media.desktop`
			display:block;
		`}
	}
	.block_for_icon_and_ul {
		display: flex;
		justify-content: space-around;
		align-items: center;
		h1 {
			color: #ffffff;
		}
		ul {
			display: flex;
			padding: 35px;
			li {
				list-style: none;
				padding: 15px;
				color: #ffffff;
				cursor: pointer;
			}
			${media.desktop`
				display:none;
			`}
		}
		img {
			width: 30px;
		}
		h1 {
			font-size: 25px;
		}
		button {
			width: 75px;
			height: 32px;
			background: rgba(0, 0, 0, 0.3);
			color: #ffffff;
			border-radius: 6px;
			border: none;
			&:hover {
				opacity: 0.8;
			}
			${media.desktop`
				display:none;
			`}
		}
	}
	.search {
		display: flex;
		align-items: center;
		background: rgba(0, 0, 0, 0.3);
		max-width: 250px;
		height: 34px;
		border-radius: 3px;
		padding: 2px 6px;

		input {
			background: none;
			border: none;
			outline: none;
			padding: 5px 9px;
			font-size: 12px;
			color: #ffff;
			&::placeholder {
				color: #ffffff;
			}
			${media.mobile`
			font-size:12px;
			padding: 3px 1px;
			max-width:120px;
			height:27px;
			`}
		}
	}
`

export default Header
