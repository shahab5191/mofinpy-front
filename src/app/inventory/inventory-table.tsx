'use client'

import React, { useState } from "react"
import { DataTable, type Pagination } from "../components/data-table/data-table"
import { type Column } from "../components/data-table/data-table"
import axiosInstance from "../utils/axios-instance"
import { PAGES_PREFIX } from "../utils/page-prefixes"
import { Button, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { themeOptions } from "../theme"
import { AddPODialog } from "../components/modals/add-po-dialog"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { type InventoryItem, LoadingStates, getInventoryTable, setTable } from "../../lib/features/inventory/inventory-slice"


const columns: Column[] = [
  { field: 'id', label: 'ID', width: .2 },
  { field: 'item', label: 'Item' },
  { field: 'warehouse', label: 'Warehouse' },
  { field: 'price', label: 'Price' },
  { field: 'qty', label: 'QTY', width: .4 },
  { field: 'provider', label: 'Provider' },
  { field: 'date', label: 'Date' },
  { field: 'purchase_order', label: 'Purchase Order', width: .6 },
]

const onEdit = (id: string) => {
  console.log(id)
}

const onDelete = (id: string) => {
  console.log(id)
}

const convertData = (data: any): InventoryItem[] => {
  const tableData: InventoryItem[] = []
  data.map((row: any) => {
    const newRow: InventoryItem = {
      id: row['id'],
      item: {
        label: row['item']['name'],
        href: `${PAGES_PREFIX.item}/${row["item"]["id"]}`,
        image: row['item']['image'] ? row['item']['image']['filename'] : null
      },
      warehouse: {
        href: `${PAGES_PREFIX.warehouse}/${row["warehouse"]["id"]}`,
        name: row['warehouse']['name']
      },
      price: row['price'],
      qty: row['quantity'],
      provider: {
        href: `${PAGES_PREFIX.provider}/${row['provider']['id']}`,
        name: row['provider']['name']
      },
      date: new Date(row['update_date']).toLocaleDateString("en-GB"),
      purchaseOrder: {
        href: `${PAGES_PREFIX.purchaseOrder}/${row['purchase_order']['id']}`,
        name: row['purchase_order']['id']
      },
      loadingState: LoadingStates.loaded
    }
    tableData.push(newRow)
  })
  return tableData
}

export default function InventoryTable() {
  const dispatch = useAppDispatch()
  const inventoryTable = useAppSelector(getInventoryTable)
  const [openPOModal, setOpenPOModal] = useState(false)
  const [pagination, setPagination] = useState<Pagination>({ limit: 0, offset: 0, count: 0 })

  const fetchFunction = async (limit: number, offset: number) => {
    let result
    let tableData: InventoryItem[] = []
    let count = 0
    try {
      result = await axiosInstance.get('/inventory')
      const data = result.data.items
      tableData = convertData(data)
      dispatch(setTable(tableData))
      count = result.data.pagination.count
    } catch (error) {
      console.log(error)
    }
    setPagination({ limit, offset, count })
  }

  const addPOClicked = (_: any) => {
    setOpenPOModal(current => !current)
  }

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <div className="px-6 max-h-dvh overflow-hidden">
        <h1 className="flex items-center text-2xl font-light h-[calc(42px+0.75rem)]">Inventory</h1>
        <div className="h-[calc(100vh-2rem-42px)]">
          <div className="flex flex-col w-full h-[calc(100%-1rem)] box-border my-4 bg-[var(--bg-primary)] p-4 rounded-lg border-[1px] border-[var(--border-bg-primary)]">
            <div className="pb-2 flex gap-2">
              <Button
                color="primary"
                variant="contained"
                className="font-light"
                size="small"
                onClick={addPOClicked}
              >+ Add PO</Button>
              <Button variant="outlined" className="font-light" size="small">Export</Button>
            </div>
            <DataTable
              editCallback={onEdit}
              deleteCallback={onDelete} columns={columns}
              checkbox
              actions
              fetchFunction={fetchFunction}
              data={{ table: inventoryTable, pagination }}
            />
          </div>
        </div>
      </div>
      <AddPODialog open={openPOModal} onClose={() => setOpenPOModal(false)} />
    </ThemeProvider>
  )
}
