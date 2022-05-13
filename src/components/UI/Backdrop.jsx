import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Backdrop = (props) => {
	const BackdropPort = (props) => {
		return <BackdropModal onClick={props.onClick}/>
	}
	const elem = document.getElementById('backdrop')
	return (
		<Fragment>
			{ReactDOM.createPortal(<BackdropPort onClick = {props.onClick} />, elem)}
		</Fragment>
	)
}

const BackdropModal = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 20;
	background-color: rgba(0, 0, 0, 0.5);
`

export default Backdrop
