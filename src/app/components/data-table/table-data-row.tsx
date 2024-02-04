import { Checkbox } from "@mui/material"
import { TableActions } from "./table-actions"
import { Column } from "./data-table"

interface Props {
  id: number
  checkbox: boolean
  actions: boolean
  editCallback?: (id: string) => void
  deleteCallback?: (id: string) => void
  colWidths: string[]
  columns: Column[]
  data: Record<string, any>
  onCheckChanged?: (id: number) => void
  checked?: boolean
}

export const TableDataRow = (props: Props) => {
  return (
    <div
      className="flex border-b-[1px] border-[var(--border-bg-primary)] py-1 hover:bg-[var(--table-item-bg-hover)] transition-colors px-2"
    >
      {props.checkbox === true ?
        <Checkbox
          checked={props.checked}
          onClick={(_) => {
            if (props.onCheckChanged){
              props.onCheckChanged(props.id)
            }
          }}
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
            width: props.colWidths[j],
            textAlign: col.align ? col.align : 'center',
            justifyContent: col.align ? col.align : 'center'
          }}
          className="flex items-center"
        >{props.data[col.field as keyof typeof props.data]}</div>
      })}
      {props.actions ?

        <div
          style={{ width: props.colWidths[props.colWidths.length - 1] }}
        >
          <TableActions
            id={props.data['id']}
            deleteCallback={props.deleteCallback}
            editCallback={props.editCallback}
          />
        </div>
        :
        null}

    </div>
  )
}
