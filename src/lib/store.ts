import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user-slice";
import inventorySlice from "./features/inventory/inventory-slice"

export const store = configureStore({
  reducer: {
    users: userReducer,
    inventory: inventorySlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
