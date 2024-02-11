import Dialog from "@mui/material/Dialog"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { TableImageItem } from "../data-table/table-item-image-label"
import { NumberInput } from "../shared/number-input"
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useCallback } from "react"

interface Props {
  open: boolean
  onClose: () => void
}
const testOptions: Array<ItemAutocompletion> = [
  { name: "item1", image: "available", id: "1" },
  { name: "item2", image: "sold", id: "2" },
]

interface ItemAutocompletion {
  name: string
  image: string
  id: string
}

interface ProviderAutocompletion {
  name: string
  id: string
}

enum ItemStates {
  ordered = "Ordered",
  shipped = "Shipped",
  canceled = "Canceled",
  received = "Received",
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

export const AddPODialog = (props: Props) => {
  const { handleSubmit, control, setValue } = useForm<Inputs>()
  const onSubmit = (data: Inputs) => {
    console.log(data)
  }

  const itemIdChangeHandler = useCallback((item: ItemAutocompletion | string | null) => {
    if (typeof item === "string" || item === null) return
    setValue("item_id", item.id)
  }, [setValue])

  const providerIdChangeHandler = useCallback((item: ProviderAutocompletion | string | null) => {
    if (typeof item === "string" || item === null) return
    setValue("provider_id", item.id)
  }, [setValue])

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      PaperProps={{
        style: {
          backgroundImage: "none",
          backgroundColor: "transparent",
          maxWidth: "unset",
        },
      }}
    >
      <div className="p-3 bg-[#151518] rounded-md min-w-[700px]">
        <h2 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-3 text-2xl">
          Create new purchase order
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2">
            <div>
              <div className="mb-3 flex flex-col gap-2">

                <h3 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-1 text-lg">
                  Item
                </h3>

                <Autocomplete
                  freeSolo
                  id="Item-select-list"
                  options={testOptions}
                  getOptionLabel={(option: ItemAutocompletion | string) => {
                    if (typeof option === "string") return option
                    return option.name || ""
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Search or add item" />
                  )}
                  onChange={(_, item) => itemIdChangeHandler(item)}
                  renderOption={(props: any, option) => (
                    <OptionsRender
                      key={props["key"]}
                      parentProps={props}
                      option={option}
                    />
                  )}
                  size="small"
                />

                <div className="flex gap-2 justify-between items-center">
                  <p className="">Quantity</p>
                  <NumberInput initial={0} />
                </div>

                <Controller
                  name="state"
                  control={control}
                  defaultValue={ItemStates.ordered}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="po-item-state-label">State</InputLabel>
                      <Select
                        labelId="po-item-state-label"
                        id="pop-item-state-select"
                        label="State"
                        {...field}
                      >
                        <MenuItem value={ItemStates.ordered}>Ordered</MenuItem>
                        <MenuItem value={ItemStates.shipped}>Shipped</MenuItem>
                        <MenuItem value={ItemStates.canceled}>
                          Canceled
                        </MenuItem>
                        <MenuItem value={ItemStates.received}>
                          Received
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name="make_unique"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked/>}
                      label={
                        <Typography variant="body2" className="font-light text-md">
                          Create Unique Items
                        </Typography>
                      }
                    />
                  )}
                />
              </div>

              <div>
                <h3 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-3 text-lg">
                  Provider
                </h3>
                <Autocomplete
                  freeSolo
                  id="Item-select-list"
                  options={testOptions}
                  getOptionLabel={(option: ProviderAutocompletion | string) => {
                    if (typeof option === "string") return option
                    return option.name
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Search or add item" />
                  )}
                  onChange={(_, item) => providerIdChangeHandler(item)}
                  renderOption={(props: any, option) => (
                    <li {...props} key={props['key']}>{option.name}</li>
                  )}
                  size="small"
                />
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex gap-2 mt-2 justify-end">
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}

const OptionsRender = (props: {
  parentProps: any
  option: ItemAutocompletion | string
}) => {
  const { key, ...restProps } = props.parentProps
  if (typeof props.option === "string") {
    return <li {...restProps} className="">
      {props.option}
    </li>
  }
  return (
    <li {...restProps} className="">
      <TableImageItem label={props.option.name} image={props.option.image} />
    </li>
  )
}
