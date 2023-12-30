'use client'

import { themeOptions } from "@/app/theme"
import { Checkbox, CssBaseline, Pagination, ThemeProvider } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"

export interface Column {
  field: string
  label: string
  align?: 'left' | 'center' | 'right'
  width?: number
}

interface PageChangeReturn {
  data: any,
  pagination: {
    limit: number
    offset: number
    count: number
  }
}

interface Props {
  columns: Column[]
  checkbox?: boolean
  onPageChange: (limit: number, offset: number) => Promise<PageChangeReturn>
}

export const DataTable = (props: Props) => {
  const [checks, setChecks] = useState<boolean[]>(props.columns.map(() => false))
  const [allChecks, setAllChecks] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(0)
  const [limit, setLimit] = useState(10)
  const [data, setData] = useState<Record<string, any>[]>([])

  const calcWidth = useCallback((w: number) => {
    const widthUnit = props.columns.reduce((acc, curr) => {
      return acc + (curr.width ? curr.width : 1)
    }, 0) * 100 / (props.columns.length + 1)

    return w * widthUnit + "%"
  }, [props.columns])

  const toggleAllChecks = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAllChecks(e.target.checked)
    const tempChecks: boolean[] = []
    data.forEach(() => {
      tempChecks.push(e.target.checked)
    })
    setChecks(tempChecks)
  }, [data])

  const checkClicked = useCallback((num: number) => {
    setChecks(curr => {
      if (curr === undefined) return curr
      curr[num] = !curr[num]
      let allChecked = true
      curr?.forEach((check, index) => {
        if (index === num) {
          allChecked &&= !check
        } else {
          allChecked &&= check
        }
      })
      setAllChecks(allChecked)
      return [...curr]
    })
  }, [])
  const pageChangeHandler = async (_: any, page: number) => {
    if (currentPage === page) return
    const offset = (page - 1) * limit
    const { pagination, data: fetchedData } = await props.onPageChange(limit, offset)
    setCurrentPage(page)
    setCount(pagination.count)
    setData(fetchedData)
  }

  useEffect(() => {
    (async () => {
      const { pagination, data: fetchedData } = await props.onPageChange(limit, 0)
      setCurrentPage(Math.floor(pagination.offset / limit))
      setCount(pagination.count)
      setData(fetchedData)
    })()

  }, [props, limit])

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <div className="flex flex-col w-full h-[calc(100%-1rem)] box-border my-4 bg-[var(--bg-primary)] p-4 rounded-lg border-[1px] border-[var(--border-bg-primary)]">
        <div className="flex bg-[var(--bg-secondary)] rounded-xl py-1 px-2 mb-2 border-[1px] border-[var(--border-bg-secondary)] box-border">
          {props.checkbox === true ?
            <Checkbox
              onChange={toggleAllChecks}
              checked={allChecks}
              size="small"
              sx={{
                color: 'white',
                padding: '0.25rem',
              }}
            />
            : null}
          {props.columns.map((item, k) => {
            return <h5
              key={k}
              style={{
                width: calcWidth(item.width ? item.width : 1),
                justifyContent: item.align ? item.align : 'center'
              }}
              className="flex items-center"
            >
              {item.label}
            </h5>
          })}
          <div style={{ width: calcWidth(0.5) }} className="flex items-center">Actions</div>
        </div>
        <div className="overflow-y-auto h-full box-border">
          {data.map((row, i) => {
            return (
              <div
                key={i}
                className="flex border-b-[1px] border-[var(--border-bg-primary)] py-1 hover:bg-[var(--table-item-bg-hover)] transition-colors px-2"
              >
                {props.checkbox === true ?
                  <Checkbox
                    checked={checks === undefined ? false : checks[i]}
                    onClick={(_) => checkClicked(i)}
                    size="small"
                    sx={{
                      color: 'white',
                      strokeWidth: '1px'
                    }}
                  />
                  : null}
                {props.columns.map((col, j) => {
                  return <div
                    key={j}
                    style={{
                      width: calcWidth(col.width ? col.width : 1),
                      textAlign: col.align ? col.align : 'center',
                      justifyContent: col.align ? col.align : 'center'
                    }}
                    className="flex items-center"
                  >{row[col.field as keyof typeof row]}</div>
                })}
                <div style={{ width: calcWidth(0.5) }} className="flex items-center justify-center">edit</div>
              </div>
            )
          })}
        </div>
        <div className="pt-4 border-t-[1px] border-t-[var(--border-bg-primary)]">
          <Pagination
            count={Math.ceil(count / limit)}
            shape='rounded'
            page={currentPage? currentPage : 1}
            onChange={pageChangeHandler}
            size="small"
          />
        </div>
      </div>
    </ThemeProvider>
  )
}
