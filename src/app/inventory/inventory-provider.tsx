'use client'
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import InventoryTable from "./inventory-table"
export const InventoryProvider = () => {
  return(
    <Provider store={store}>
      <InventoryTable />
    </Provider>
  )
}
