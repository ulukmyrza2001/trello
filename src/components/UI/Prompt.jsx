import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export function AlertDialog(props) {
	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{props.message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onConfirm}>OK</Button>
				<Button onClick={props.onClose} autoFocus>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
