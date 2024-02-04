import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  id: String,
  username: String,
  image: String
}
const initialState: State = {
  username: "",
  image: "",
  id: ""
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action:PayloadAction<State>) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.image = action.payload.image
    },
    logout: state => {
      state.id = ""
      state.username = ""
      state.image = ""
    },
  }
})
export default userSlice.reducer
