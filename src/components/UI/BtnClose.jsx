import React from 'react'
import styled from 'styled-components'
import { MdOutlineClose } from 'react-icons/md'

const BtnClose = ({ onClick }) => {
	return (
		<Button onClick={onClick} type='button'>
			<MdOutlineClose color='#42526e' fontSize={'28px'} />
		</Button>
	)
}
const Button = styled.button`
		border: none;
		background-color: transparent;
		margin-left: 5px;
		cursor: pointer;
`

export default BtnClose
