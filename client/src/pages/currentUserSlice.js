import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    id: -1,
    username: 'NOT_A_USER',
    password: '',
  },
  reducers: {
    updateCurrentUser: (state, action) => {
      return action.payload
    },
    logoutAction: state => {
      return state = {
        id: -1,
        username: 'NOT_A_USER',
        password: '',
      }
    },
  }
})

export const { updateCurrentUser, logoutAction } = currentUserSlice.actions
export const selectCurrentUser = (state) => state.currentUser

export default currentUserSlice.reducer