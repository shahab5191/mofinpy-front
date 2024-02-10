'use client'

import { themeOptions } from "@/app/theme"
import { CssBaseline, Pagination, ThemeProvider } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import { TableDataRow } from "./table-data-row"
import { TableHeaderRow } from "./table-header-row"

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

type Props = {
  columns: Column[]
  checkbox?: boolean
  fetchFunction: (limit: number, offset: number) => Promise<PageChangeReturn>
} & ({
  actions: true;
  editCallback: (id: string) => void
  deleteCallback: (id: string) => void
} | {
  actions?: false;
  editCallback?: (id: string) => void
  deleteCallback?: (id: string) => void
})
export const ACTIONS_WIDTH = 0.6
export const CHECKBOX_WIDTH = 0.4



export const DataTable = (props: Props) => {
  const [checks, setChecks] = useState<boolean[]>([])
  const [allChecks, setAllChecks] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(0)
  const [limit, setLimit] = useState(10)
  const [data, setData] = useState<Record<string, any>[]>([])
  const [editing, setEditing] = useState<boolean[]>(props.columns.map(() => false))

  const calcWidthUnit = useCallback(() => {
    let initval = 0
    let totalItems = props.columns.length

    if (props.actions) {
      initval += ACTIONS_WIDTH
      totalItems++
    }
    if (props.checkbox) {
      initval += CHECKBOX_WIDTH
      totalItems++
    }

    const widthUnit = props.columns.reduce(
      (acc, curr) => {
        return acc + (curr.width ? curr.width : 1)
      },
      initval
    ) * 100 / totalItems
    return widthUnit
  }, [props])

  const [colWidth, setColWidth] = useState<string[]>(props.columns.map((i) => {
    const unit = calcWidthUnit()
    return (i.width ? i.width * unit : unit) + '%'
  }))

  //next 2 functions just react to user clicking on checkboxes. if all checkboxes are checked then title checkbox should be checked and vise versa
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
      if (curr === undefined || curr.length === 0) return curr
      curr[num] = !curr[num]
      let allChecked = true
      curr.forEach((check, index) => {
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

  //when user changes the page we should call onPageChange to parent fetch new data and update table
  const pageChangeHandler = async (_: any, page: number) => {
    if (currentPage === page) return
    const offset = (page - 1) * limit
    const { pagination, data: fetchedData } = await props.fetchFunction(limit, offset)
    setCurrentPage(page)
    setCount(pagination.count)
    setData(fetchedData)
  }
  //useEffect to fetch data
  useEffect(() => {
    (async () => {
      const { pagination, data: fetchedData } = await props.fetchFunction(limit, 0)
      setCurrentPage(Math.floor(pagination.offset / limit))
      setCount(pagination.count)
      setData(fetchedData)
      setChecks(fetchedData.map(() => false))
    })()
  }, [props, limit])

  //Calculating each col width %
  useEffect(() => {
    const temp = props.columns.map(col => {
      return (col.width ? col.width * calcWidthUnit() : calcWidthUnit()) + '%'
    })
    setColWidth([...temp])
  }, [props, calcWidthUnit])

  const onEdit = useCallback((id: string) => {
    setEditing(current => {
      const temp = []
      for (let i in current) {
        if (id === i) temp.push(true)
        else temp.push(false)
      }
      return temp
    })
    props.editCallback!(id)
  }, [props])

  const onDelete = useCallback((id: string) => {
    props.deleteCallback!(id)
  }, [props])

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
              <TableHeaderRow
          checkbox={props.checkbox}
          actions={props.actions}
          toggleCheckBoxes={toggleAllChecks}
          allChecks={allChecks}
          columns={props.columns}
          colWidths={colWidth}
        />
        <div className="overflow-y-auto h-full box-border">
          {data.map((row, i) => {
            return (
              <TableDataRow
                id={i}
                key={i}
                checkbox={!!props.checkbox}
                actions={!!props.actions}
                editCallback={props.editCallback}
                deleteCallback={props.deleteCallback}
                colWidths={colWidth}
                columns={props.columns}
                checked={checks[i]}
                onCheckChanged={checkClicked}
                data={row}
              />
            )
          })}
        </div>
        <div className="pt-4 border-t-[1px] border-t-[var(--border-bg-primary)]">
          <Pagination
            count={Math.ceil(count / limit)}
            shape='rounded'
            page={currentPage ? currentPage : 1}
            onChange={pageChangeHandler}
            size="small"
          />
        </div>
    </ThemeProvider>
  )
}
