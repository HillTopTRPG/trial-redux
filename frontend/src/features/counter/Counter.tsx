import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import {decrement, increment, selectCount} from './counterSlice'

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
