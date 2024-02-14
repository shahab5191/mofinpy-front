import axiosInstance from "../utils/axios-instance"
import { InventoryProvider } from "./inventory-provider"

const Inventory = async () => {
  await axiosInstance('/users/current')

  return (
    <InventoryProvider />
  )
}

export default Inventory
