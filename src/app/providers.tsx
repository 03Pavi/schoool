'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { uiSlice } from './store/ui-slice'

type Props = {
  children: React.ReactNode
}

const StoreHydrator = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    store.dispatch(uiSlice.actions.hydrateUiSettings())
  }, [])
  return <>{children}</>
}

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <StoreHydrator>{children}</StoreHydrator>
    </Provider>
  )
}
