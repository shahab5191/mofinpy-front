import { Button, IconButton } from "@mui/material";
import { FiEdit } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  id: string,
  editCallback?: (id: string) => void,
  deleteCallback?: (id: string) => void
}

export const TableActions = (props: Props) => {
  return (
    <div className="flex gap-1 items-center justify-center">
      <IconButton
        size="small"
        color="primary"
        onClick={() => props.editCallback? props.editCallback(props.id) : ()=>{}}
      >
        <FiEdit />
      </IconButton>
      <IconButton
        size="small"
        color="primary"
        onClick={() => props.deleteCallback? props.deleteCallback(props.id) : ()=>{}}>
        <RiDeleteBin6Line />
      </IconButton>
    </div>
  )
}
