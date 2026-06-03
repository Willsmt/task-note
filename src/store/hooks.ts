import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootReducer } from './index'

/** Hooks tipados do Redux (evita anotar tipos em cada uso e mantém o TS estrito). */
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector
