import Dialog from "@mui/material/Dialog"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { HTMLAttributes } from "react"
import { TableImageItem } from "../data-table/table-item-image-label"
import { NumberInput } from "../shared/number-input"
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from "@mui/material"

interface Props {
  open: boolean
  onClose: () => void
}
const testOptions:Array<AutocompleteOption> = [
  {name: "item1", image:"available", id:"1"},
  {name: "item2", image:"sold", id:"2"}
]

interface AutocompleteOption {
  name: string
  image: string
  id: string
}

enum ItemStates{
  ordered,
  shipped,
  canceled,
  received
}

interface Inputs {
  item_id: string
  price: number
  currency_id: string
  base_currency_rate: number
  quantity: number
  provider_id: string
  creation_date: Date
  make_unique: boolean
  state: ItemStates
  warehouse_id: string
}

export const AddPODialog = (props:Props) => {
  const submitHandler = (e:React.FormEvent) => {
    e.preventDefault()
    console.log(e.target)
  }
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      PaperProps={{
        style:{
	  backgroundImage: "none",
	  backgroundColor: "transparent",
	  maxWidth: "unset",
	}
      }}
    >
      <div className="p-3 bg-[#151518] rounded-md min-w-[700px]">
	<h2 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-3 text-2xl">
	  Create new purchase order
	</h2>
	<form 
	  onSubmit={submitHandler}
	>
	  <div className="grid grid-cols-2">
	    <div>
	      <div className="mb-3 flex flex-col gap-2">
		<h3 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-1 text-lg">Item</h3>
		<Autocomplete
		  id="Item-select-list"
		  options={testOptions}
		  getOptionLabel={(option:AutocompleteOption) => option.name}
		  renderInput={(params)=> <TextField {...params} label="Search or add item" />}
		  onChange={(_, newValue)=>{console.log(newValue)}}
		  renderOption={(props, option)=> <OptionsRender key={option.id} parentProps={props} option={option} />}
		  size="small"
		/>
		<div className="flex gap-2 justify-between items-center">
		  <p className="">Quantity</p>
		  <NumberInput initial={0} />
		</div>
		  <FormControl 
		    fullWidth
		    size="small"
		  >
		    <InputLabel id="po-item-state-label">State</InputLabel>
		    <Select 
		      labelId="po-item-state-label"
		      id="pop-item-state-select"
		      defaultValue={"Ordered"}
		      label="State"
		    >
		      <MenuItem value={"Ordered"}>Ordered</MenuItem>
		      <MenuItem value={"Shipped"}>Shipped</MenuItem>
		      <MenuItem value={"Canceled"}>Canceled</MenuItem>
		      <MenuItem value={"Received"}>Received</MenuItem>
		    </Select>
		  </FormControl>
		  <FormControlLabel
		    control={
		      <Checkbox />
		    }
		    label={<Typography variant="body2" className="font-light text-md">Create Unique Items</Typography>}
		  />
	      </div>
	      <div>
		<h3 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-3 text-lg">Provider</h3>
		<Autocomplete
		  id="Item-select-list"
		  options={testOptions}
		  getOptionLabel={(option:AutocompleteOption) => option.name}
		  renderInput={(params)=> <TextField {...params} label="Search or add item" />}
		  onChange={(_, newValue)=>{console.log(newValue)}}
		  renderOption={(props, option)=> <OptionsRender key={option.id} parentProps={props} option={option} />}
		  size="small"
		/>
	      </div>
	    </div>
	    <div>
	    </div>
	  </div>
	  <div className="flex gap-2 mt-2 justify-end">
	    <Button variant="outlined">Cancel</Button>
	    <Button variant="contained" type="submit">Create</Button>
	  </div>
	</form>
      </div>
    </Dialog>
  )
}

const OptionsRender = (props:{parentProps:HTMLAttributes<HTMLElement>, option:Option})=>{
  return(
    <li {...props.parentProps} key={props.option.id} className="">
      <TableImageItem label={props.option.name} image={props.option.image} />
    </li>
  )
}
