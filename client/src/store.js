import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './pages/currentUserSlice'

export default configureStore({
  reducer: {
    currentUser: currentUserReducer
  }
})