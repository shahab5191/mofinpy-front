import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
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


interface State {
  table: Array<InventoryItem>
}

const initialState: State = { table: [] }


export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<InventoryItem[]>) => {
      state.table = []
      action.payload.forEach(item => {
        state.table.push(item)
      })
    },
    editRow: (state, action: PayloadAction<InventoryItem & { rownum: number }>) => {
      state.table[action.payload.rownum].id = action.payload.id ? action.payload.id : state.table[action.payload.rownum].id
      state.table[action.payload.rownum].qty = action.payload.qty ? action.payload.qty : state.table[action.payload.rownum].qty
      state.table[action.payload.rownum].date = action.payload.date ? action.payload.date : state.table[action.payload.rownum].date
      state.table[action.payload.rownum].item = action.payload.item ? action.payload.item : state.table[action.payload.rownum].item
      state.table[action.payload.rownum].price = action.payload.price ? action.payload.price : state.table[action.payload.rownum].price
      state.table[action.payload.rownum].provider = action.payload.provider ? action.payload.provider : state.table[action.payload.rownum].provider
      state.table[action.payload.rownum].warehouse = action.payload.warehouse ? action.payload.warehouse : state.table[action.payload.rownum].warehouse
      state.table[action.payload.rownum].purchaseOrder = action.payload.purchaseOrder ? action.payload.purchaseOrder : state.table[action.payload.rownum].purchaseOrder
      state.table[action.payload.rownum].loadingState = action.payload.loadingState ? action.payload.loadingState : state.table[action.payload.rownum].loadingState
    },
    addRow: (state, action: PayloadAction<InventoryItem>) => {
      state.table.push(action.payload)
    },
    changeState: (state, action: PayloadAction<{ loadingState: LoadingStates, rowNum: number }>) => {
      state.table[action.payload.rowNum].loadingState = action.payload.loadingState
    }
  }
})

const getStateTable = (state: RootState) => state.inventory.table

export const getInventoryTable = createSelector([getStateTable], inventory => {
  const tableData: InventoryTableRow[] = []
  inventory.forEach(elem => {
    tableData.push({
      id: elem.id,
      warehouse: Link({ href: elem.warehouse.href, name: elem.warehouse.name }),
      price: elem.price,
      qty: elem.qty,
      provider: Link({ href: elem.provider.href, name: elem.provider.name }),
      date: elem.date,
      purchaseOrder: Link({ href: elem.purchaseOrder.href, name: elem.purchaseOrder.name }),
      loadingState: elem.loadingState,
      item: TableImageItem({ label: elem.item.label, image: elem.item.image, href: elem.item.href })
    })
  })
  return tableData
})
export const {
  setTable,
  editRow,
  addRow,
  changeState
} = inventorySlice.actions

export default inventorySlice.reducer
