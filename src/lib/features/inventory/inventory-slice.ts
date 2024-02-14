import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/lib/store"
import { TableImageItem } from "@/app/components/data-table/table-item-image-label"
import { Link } from "../../../app/components/shared/link"

export enum LoadingStates {
  loading = "loading",
  loaded = "loaded"
}

interface ItemType {
  label: string
  href: string
  image: string
}

interface LinkType {
  href: string,
  name: string
}

export type InventoryItem = {
  id: string,
  item: ItemType,
  warehouse: LinkType,
  price: string,
  qty: string,
  provider: LinkType,
  date: string,
  purchaseOrder: LinkType,
  loadingState: LoadingStates
}

export type InventoryTableRow = {
  id: string,
  item: React.ReactNode,
  warehouse: React.ReactNode,
  price: string,
  qty: string,
  provider: React.ReactNode,
  date: string,
  purchaseOrder: React.ReactNode,
  loadingState: LoadingStates
}


const initialState: Array<InventoryItem> = []

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<InventoryItem[]>) => {
      state.map(_ => {
        state.pop()
      })
      action.payload.map(item => state.push(item))
    },
    editRow: (state, action: PayloadAction<InventoryItem & { rownum: number }>) => {
      state[action.payload.rownum].id = action.payload.id ? action.payload.id : state[action.payload.rownum].id
      state[action.payload.rownum].qty = action.payload.qty ? action.payload.qty : state[action.payload.rownum].qty
      state[action.payload.rownum].date = action.payload.date ? action.payload.date : state[action.payload.rownum].date
      state[action.payload.rownum].item = action.payload.item ? action.payload.item : state[action.payload.rownum].item
      state[action.payload.rownum].price = action.payload.price ? action.payload.price : state[action.payload.rownum].price
      state[action.payload.rownum].provider = action.payload.provider ? action.payload.provider : state[action.payload.rownum].provider
      state[action.payload.rownum].warehouse = action.payload.warehouse ? action.payload.warehouse : state[action.payload.rownum].warehouse
      state[action.payload.rownum].purchaseOrder = action.payload.purchaseOrder ? action.payload.purchaseOrder : state[action.payload.rownum].purchaseOrder
      state[action.payload.rownum].loadingState = action.payload.loadingState ? action.payload.loadingState : state[action.payload.rownum].loadingState
    },
    addRow: (state, action: PayloadAction<InventoryItem>) => {
      state.push(action.payload)
    },
    changeState: (state, action: PayloadAction<{ loadingState: LoadingStates, rowNum: number }>) => {
      state[action.payload.rowNum].loadingState = action.payload.loadingState
    }
  }
})
export const getInventoryTable = (state: RootState) => {
  const tableData: InventoryTableRow[] = []
  state.inventory.forEach(elem => {
    tableData.push({
      id: elem.id,
      warehouse: Link({ href: elem.warehouse.href, name: elem.warehouse.name }),
      price: elem.price,
      qty: elem.qty,
      provider: Link({href:elem.provider.href, name:elem.provider.name}),
      date: elem.date,
      purchaseOrder: Link({href:elem.purchaseOrder.href, name:elem.purchaseOrder.name}),
      loadingState: elem.loadingState,
      item: TableImageItem({ label: elem.item.label, image: elem.item.image, href: elem.item.href })
    })
  })
  return tableData
}
export const {
  setTable,
  editRow,
  addRow,
  changeState
} = inventorySlice.actions

export default inventorySlice.reducer
