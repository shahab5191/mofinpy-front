import Dialog from "@mui/material/Dialog"

interface Props {
  open: boolean
  onClose: () => void
}

export const AddPODialog = (props:Props) => {
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <div>
	<h2>Create new purchase order</h2>
	<div>
	  <div>
	    
	  </div>
	  <div>

	  </div>
	</div>
      </div>
    </Dialog>
  )
}
