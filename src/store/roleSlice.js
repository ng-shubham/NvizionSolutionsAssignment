import { createSlice } from "@reduxjs/toolkit"

const initialState = []
const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload)
        },

        remove(state, action) {
            return state.filter(item => item.roleKey !== action.payload)
        },

        update(state, action) {
            state.push(action.payload)
        }
    }
})

export const { add, remove, update } = roleSlice.actions;
export default roleSlice.reducer;