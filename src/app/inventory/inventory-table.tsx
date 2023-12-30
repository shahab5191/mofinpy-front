'use client'

import React from "react"
import { DataTable } from "../components/data-table/data-table"
import { type Column } from "../components/data-table/data-table"
import { InventoryTag } from "./inventory-tags"
import axiosInstance from "../utils/axios-instance"

const columns: Column[] = [
  { field: 'id', label: 'ID', width: .2 },
  { field: 'item', label: 'Item' },
  { field: 'warehouse', label: 'Warehouse' },
  { field: 'price', label: 'Price' },
  { field: 'qty', label: 'QTY', width: .4 },
  { field: 'provider', label: 'Provider' },
  { field: 'date', label: 'Date' },
  { field: 'status', label: 'Status', align: 'center' },
  { field: 'created_by', label: 'Created By' },
]

const TableImageItem = ({ label }: { label: string }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-[35px] h-[35px] bg-black rounded-lg"></div>
      <p>{label}</p>
    </div>
  )
}

export default function InventoryTable() {
  const onPageChange = async (limit: number, offset: number) => {
    let result
    let data = []
    let count = 0
    try {
      result = await axiosInstance.get('/inventory')
      data = result.data.items
      count = result.data.pagination.count
    } catch (error) {
      console.log(error)
    }
    return ({ data: data, pagination: { limit, offset, count } })
  }

  return (
    <div className="px-6 max-h-dvh overflow-hidden">
      <h1 className="flex items-center text-2xl font-light h-[calc(42px+0.75rem)]">Inventory</h1>
      <div className="h-[calc(100vh-2rem-42px)]">
        <DataTable
          columns={columns}
          checkbox
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}
