import React from 'react'
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Centered from './components/UI/Centered'
import Loader from './components/UI/Loader'
import RequireAuth from './hoc/require'
import Home from './pages/main/Home'

const FormTrello = React.lazy(() => import('./pages/login/FormTrello'))
const TrelloMain = React.lazy(() => import('./pages/trelloMain/TrelloMain'))
const SignUp = React.lazy(() => import('./pages/SignUp/SignUp'))
const NotFoundPage = React.lazy(() => import('./pages/notFound/NotFoundPage'))

function App() {
	return (
		<BrowserRouter>
			<Suspense
				fallback={
					<Centered>
						<Loader />
					</Centered>
				}
			>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<FormTrello />} />
					<Route
						path='/trelloMain/*'
						element={
							<RequireAuth>
								<TrelloMain />
							</RequireAuth>
						}
					/>
					<Route path='/signup' element={<SignUp />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
