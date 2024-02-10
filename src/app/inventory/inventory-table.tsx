'use client'

import React, { useState } from "react"
import { DataTable } from "../components/data-table/data-table"
import { type Column } from "../components/data-table/data-table"
import axiosInstance from "../utils/axios-instance"
import { PAGES_PREFIX } from "../utils/page-prefixes"
import { TableImageItem } from "../components/data-table/table-item-image-label"
import { Button, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import { themeOptions } from "../theme"
import Dialog from "@mui/material/Dialog"
import { AddPODialog } from "../components/modals/add-po-dialog"

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

const convertData = (data: any): Record<string, any>[] => {
  const tableData: Record<string, any>[] = []
  data.map((row: any) => {
    const newRow: Record<string, any> = {}
    newRow['id'] = row['id']
    newRow['item'] = TableImageItem({ label: row['item']['name'], href: `${PAGES_PREFIX.item}/${row["item"]["id"]}`, image: row['item']['image'] ? row['item']['image']['filename'] : null })
    newRow['warehouse'] = <a href={`${PAGES_PREFIX.warehouse}/${row["warehouse"]["id"]}`}>{row['warehouse']['name']}</a>
    newRow['price'] = row['price']
    newRow['qty'] = row['quantity']
    newRow['provider'] = <a href={`${PAGES_PREFIX.provider}/${row['provider']['id']}`}>{row['provider']['name']}</a>
    const newDate = new Date(row['update_date'])
    newRow['date'] = newDate.toLocaleDateString("en-GB")
    newRow['purchase_order'] = <a href={`${PAGES_PREFIX.purchaseOrder}/${row['purchase_order']['id']}`}>{row['purchase_order']['id']}</a>
    tableData.push(newRow)
  })
  return tableData
}

export default function InventoryTable() {
  const [openPOModal, setOpenPOModal] = useState(false)
  const onPageChange = async (limit: number, offset: number) => {
    let result
    let tableData: Record<string, any>[] = []
    let count = 0
    try {
      result = await axiosInstance.get('/inventory')
      const data = result.data.items
      tableData = convertData(data)
      count = result.data.pagination.count
    } catch (error) {
      console.log(error)
    }
    return ({ data: tableData, pagination: { limit, offset, count } })
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
              deleteCallback={onDelete}
              columns={columns}
              checkbox
              actions
              fetchFunction={onPageChange}
            />
          </div>
        </div>
      </div>
      <AddPODialog open={openPOModal} onClose={() => setOpenPOModal(false)} />
    </ThemeProvider>
  )
}
