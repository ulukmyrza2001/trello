import { useEffect, useContext } from 'react'
import { UNSAFE_NavigationContext } from 'react-router-dom'

export function useBlocker(blocker, when = true) {
	const history = useContext(UNSAFE_NavigationContext)
	const { navigator } = history

	useEffect(() => {
		if (!when) return

		const unblock = navigator.block((tx) => {
			const autoUnblockingTx = {
				...tx,
				retry() {
					unblock()
					tx.retry()
				},
			}

			blocker(autoUnblockingTx)
            
		})
		return unblock
	}, [navigator, blocker, when])
}
