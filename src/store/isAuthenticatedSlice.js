import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_KEY, URL_SIGN_IN, URL_SIGN_UP } from '../helpers/constants'

export const signUp = createAsyncThunk(
	'authentificated/signUp',
	async function (userData, { rejectWithValue }) {
		try {
			const response = await fetch(`${URL_SIGN_UP}${BASE_KEY}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			})
			const data = await response.json()
			if (!response.ok) {
				let errorMessage = 'Authentciation failed'
				if (data && data.error && data.error.message) {
					errorMessage = data.error.message
				}
				throw new Error(errorMessage)
			}
			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)
export const signIn = createAsyncThunk(
	'authentificated/signIn',
	async function (userData, { rejectWithValue }) {
		try {
			const response = await fetch(`${URL_SIGN_IN}${BASE_KEY}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			})
			const data = await response.json()
			if (!response.ok) {
				let errorMessage = 'Authentciation failed'
				if (data && data.error && data.error.message) {
					errorMessage = data.error.message
				}
				throw new Error(errorMessage)
			}
			return data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)
const initState = {
	isAuth: JSON.parse(localStorage.getItem('auth')) || false,
	personalAccount: null,
	status: null,
	error: null,
}

const setError = (state, action) => {
	state.status = 'rejected'
	state.error = action.payload
}

const authSlice = createSlice({
	name: 'authentificated',
	initialState: initState,
	reducers: {
		logout(state) {
			state.isAuth = false
			state.status = null
			state.error = null
			state.personalAccount = null
		},
	},
	extraReducers: {
		[signUp.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[signUp.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.isAuth = true
			state.personalAccount = action.payload
		},
		[signUp.rejected]: setError,

		[signIn.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[signIn.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.isAuth = true
			state.personalAccount = action.payload
		},
		[signIn.rejected]: setError,
	},
})
export const authActions = authSlice.actions
export default authSlice
