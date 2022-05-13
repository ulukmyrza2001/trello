import React from 'react'
import styled from 'styled-components'
import { SiTrello } from 'react-icons/si'

const LogoTrello = () => {
	return (
		<Trello className='trello__logo'>
			{<SiTrello fontSize={'40px'} color='#0079bf' />}
			<h1>Trello</h1>{' '}
		</Trello>
	)
}

const Trello = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
    /* position: relative; */
    /* top: 50px; */
	h1 {
		font-size: 60px;
		color: #253858;
	}
`

export default LogoTrello
