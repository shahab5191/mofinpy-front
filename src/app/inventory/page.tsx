import axiosInstance from "../utils/axios-instance"
import InventoryTable from "./inventory-table"

const Inventory = async () => {
  await axiosInstance('/users/current')

  return (
    <InventoryTable />
  )
}

export default Inventory
