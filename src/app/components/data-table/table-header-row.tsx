import { Checkbox } from "@mui/material"
import { ACTIONS_WIDTH, Column } from "./data-table"

interface Props {
  checkbox?: boolean
  toggleCheckBoxes?: (_:any) => void
  allChecks?: boolean
  actions?: boolean
  columns: Column[]
  colWidths: string[]
}

export const TableHeaderRow = (props:Props) => {
  return(
    <div className="flex bg-[var(--bg-secondary)] rounded-xl py-1 px-2 mb-2 border-[1px] border-[var(--border-bg-secondary)] box-border">
      {props.checkbox === true ?
        <Checkbox
          onChange={props.toggleCheckBoxes}
          checked={props.allChecks}
          size="small"
          sx={{
            color: 'white',
            padding: '0.25rem',
          }}
        />
        : null}
      {props.columns.map((item, k) => {
        return (
          <h5
            key={k}
            style={{
              width: props.colWidths[k],
              justifyContent: item.align ? item.align : 'center'
            }}
            className="flex items-center"
          >
            {item.label}
          </h5>)
      })}
      {props.actions ?
        <h5
          key="actions"
          style={{
            width: props.colWidths[props.colWidths.length - 1],
            justifyContent: 'center'
          }}
          className="flex items-center"
        >
          Actions
        </h5>
        :
        null
      }
    </div>
  )
}
