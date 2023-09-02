import { configureStore, createSlice } from "@reduxjs/toolkit"

//Slice for admin
const userSlice = createSlice({
    name:"user",
    initialState: {isLoggedIn: false},

    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state){
            state.isLoggedIn = false
        },
    }
})

//Slice for user
const adminSlice = createSlice({
    name:"auth",
    initialState: {isLoggedIn: false},

    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state){
            state.isLoggedIn = false
        }
    }
})

//exporting actions

export const userActions = userSlice.actions
export const adminActions = adminSlice.actions

//Store

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        admin: adminSlice.reducer
    }
})