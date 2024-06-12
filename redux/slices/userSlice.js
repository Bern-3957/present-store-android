import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        changeUserInfo: (state, action) => {
            state.userInfo = {...state.userInfo, ...action.payload}
        },
        logoutUser: (state, action) => {
            state.userInfo = {}
        }
    }
})

export const {setUserInfo, changeUserInfo, logoutUser} = userSlice.actions

export default userSlice.reducer