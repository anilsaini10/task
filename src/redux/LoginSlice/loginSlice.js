import { createSlice, configureStore } from '@reduxjs/toolkit'

const loginNavigationSlice = createSlice({
    name: 'loginIndex',
    initialState: {
        currentLoginButton: 0
    },
    reducers: {
        updateLoginIndex: (state, action) => {
            state.currentLoginButton = action.payload
        },
    }
})

export const { updateLoginIndex } = loginNavigationSlice.actions

export const currentLoginButton = (state) => state.loginIndex.currentLoginButton;

export default loginNavigationSlice.reducer;