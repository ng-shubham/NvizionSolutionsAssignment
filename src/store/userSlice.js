import { createSlice } from "@reduxjs/toolkit"

const initialState = []
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload)
        },

        remove(state, action) {
            return state.filter(item => item.userEmail !== action.payload)
        },

        update(state, action) {
            state.push(action.payload)
        }
    }
})

export const { add, remove, update } = userSlice.actions;
export default userSlice.reducer;