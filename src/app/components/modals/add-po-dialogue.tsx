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
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useCallback, useEffect, useMemo, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import utc from 'dayjs/plugin/utc'
import dayjs from "dayjs"
import axiosInstance from "@/app/utils/axios-instance"

dayjs.extend(utc)

interface Props {
  open: boolean
  onClose: () => void
}

interface ItemAutocompletion {
  name: string
  image: string
  id: number
}

interface GeneralAutocompletion {
  name: string
  id: number
}

enum ItemStates {
  ordered = "Ordered",
  shipped = "Shipped",
  canceled = "Canceled",
  received = "Received",
}

interface Inputs {
  item_id: number
  price: number
  currency_id: number
  base_currency_rate: number
  quantity: number
  provider_id: number
  creation_date: Date
  make_unique: boolean
  state: ItemStates
  warehouse_id: number
}

export const AddPODialog = (props: Props) => {
  const { handleSubmit, control, setValue, register } = useForm<Inputs>()
  const [itemsList, setItemsList] = useState<Array<ItemAutocompletion>>([])
  const [providersList, setProvidersList] = useState<Array<ItemAutocompletion>>([])
  const [warehousesList, setWarehousesList] = useState<Array<ItemAutocompletion>>([])
  const [currencyList, setCurrencyList] = useState<Array<GeneralAutocompletion>>([])
  const [selectedItem, setSelectedItem] = useState<ItemAutocompletion | string>("")
  const controller = useMemo(() => new AbortController(), [])

  const onSubmit = useCallback(async (data: Inputs) => {
    const result = await axiosInstance.post('/purchases/', {
      item_id: data.item_id,
      price: data.price,
      currency_id: 1, //change it to dynamic
      base_currency_rate: data.base_currency_rate,
      quantity: data.quantity,
      provider_id: data.provider_id,
      creation_date: data.creation_date,
      make_unique: data.make_unique,
      state: data.state,
      warehouse_id: data.warehouse_id
    })
  }, [])

  const itemIdChangeHandler = useCallback((item: ItemAutocompletion | string | null) => {
    if (typeof item === "string" || item === null) return
    setSelectedItem(item)
    setValue("item_id", item.id)
  }, [setValue])

  const searchAndFillList = useCallback(async (value: string, endpoint: string, fillCallback: (result: any) => void): Promise<void> => {
    if (value.length < 3) return
    controller.abort()
    const result = await axiosInstance.get(`/${endpoint}/?query=${value}`)
    const items: ItemAutocompletion[] = result.data.items.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        image: item.image ? item.image.filename : null
      }
    })
    fillCallback(items)
  }, [controller])

  const warehouseIdChangeHandler = useCallback((item: GeneralAutocompletion | string | null) => {
    if (typeof item === "string" || item === null) return
    setValue("warehouse_id", item.id)
  }, [setValue])


  const providerIdChangeHandler = useCallback((item: GeneralAutocompletion | string | null) => {
    if (typeof item === "string" || item === null) return
    setValue("provider_id", item.id)
  }, [setValue])

  const quantityChangeHandler = useCallback((val: number) => {
    setValue("quantity", val)
  }, [setValue])

  const dateChangeHandler = useCallback((date: dayjs.Dayjs | null) => {
    if (date === null) return
    setValue("creation_date", date.utc().toDate())
  }, [setValue])

  const bcrChangeHandler = useCallback((val: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(val.currentTarget.value)
    if (isNaN(value)) return
    console.log(value)
    setValue("base_currency_rate", value)
  }, [setValue])

  const addItemHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const newItem = [{ id: 3, image: "image", name: "added" }]
    setItemsList(newItem)
    setSelectedItem(newItem[0])
  }, [])

  useEffect(() => {
    (async () => {
      const result = await axiosInstance.get('/currency/')
      setCurrencyList(result.data.items.map((item: any) => {
        return {
          id: item.id,
          name: item.unit
        }
      }))
    })()
  }, [])

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
      <div className="bg-[#151518] rounded-md ">
        <div className="px-2 bg-[#624178] flex justify-between items-center">
          <h2 className="font-light text-lg">
            Create new purchase order
          </h2>
          <IconButton onClick={(_) => { props.onClose() }} size="small">
            <IoCloseOutline />
          </IconButton>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
          <div className="flex flex-row gap-6">
            <div className="min-w-[308px]">
              <div className="mb-3 flex flex-col gap-2">

                <h3 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-1">
                  Item
                </h3>
                <div className="flex h-full">
                  <Autocomplete
                    freeSolo
                    id="Item-select-list"
                    options={itemsList}
                    value={selectedItem}
                    getOptionLabel={(option: ItemAutocompletion | string) => {
                      if (typeof option === "string") return option
                      return option.name || ""
                    }}
                    className="w-full"
                    renderInput={(params) => (
                      <TextField {...params} label="Search or add item" required />
                    )}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        borderTopLeftRadius: "4px",
                        borderBottomLeftRadius: "4px",
                        ":hover": {
                          outlineColor: "#2e2e2e"
                        }
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2e2e2e"
                      }
                    }}
                    onInputChange={(_, value) => searchAndFillList(value, 'items', setItemsList)}
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
                  <Button
                    variant="outlined"
                    size="small"
                    className="h-[40px] rounded-l-none border-l-transparent border-[#2e2e2e] min-w-0 w-[40px] text-white"
                    onClick={addItemHandler}
                  >+</Button>
                </div>

                <div className="flex gap-2 justify-between items-center">
                  <p className="">Quantity</p>
                  <NumberInput onChange={quantityChangeHandler} initial={1} />
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
                      {...field}
                      control={<Checkbox defaultChecked />}
                      label={
                        <Typography variant="body2" className="font-light">
                          Create Unique Items
                        </Typography>
                      }
                    />
                  )}
                />
              </div>

              <div className="mb-3">
                <h3 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-3">
                  Creation Date
                </h3>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={dayjs.utc(Date.now())}
                    timezone="UTC"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small"
                      }
                    }}
                    onChange={dateChangeHandler}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div>
              <div className="mb-3">
                <h3 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-3">
                  Payment
                </h3>
                <div className="flex gap-2 mb-3">
                  <TextField
                    id="price"
                    label="Price"
                    variant="outlined"
                    size="small"
                    type="number"
                    required
                    sx={{
                      minWidth: "50px",
                      width: "150px"
                    }}
                    {...register("price")}
                  />
                  <TextField
                    id="bcr"
                    label="BCR"
                    variant="outlined"
                    size="small"
                    defaultValue={1}
                    required
                    sx={{
                      minWidth: "50px",
                      width: "150px"
                    }}
                    onChange={bcrChangeHandler}
                  />
                </div>
                <Controller
                  name="currency_id"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <FormControl fullWidth size="small">
                      <InputLabel id="po-item-state-label">Currency</InputLabel>
                      <Select
                        labelId="po-item-state-label"
                        id="pop-item-state-select"
                        label="Currency"
                        {...field}
                      >
                        {currencyList.length > 0 && currencyList.map((currency) => {
                          return (<MenuItem key={currency.id} value={currency.id}>{currency.name}</MenuItem>)
                        })}
                      </Select>
                    </FormControl>
                  )}
                />
              </div>

              <div className="mb-3">
                <h3 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-3">
                  Provider
                </h3>
                <div className="flex h-full">
                  <Autocomplete
                    freeSolo
                    id="Item-select-list"
                    options={providersList}
                    getOptionLabel={(option: GeneralAutocompletion | string) => {
                      if (typeof option === "string") return option
                      return option.name
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Search or add Provider" required />
                    )}
                    onInputChange={(_, value) => searchAndFillList(value, 'providers', setProvidersList)}
                    onChange={(_, item) => providerIdChangeHandler(item)}
                    renderOption={(props: any, option) => (
                      <li {...props} key={props['key']}>{option.name}</li>
                    )}
                    size="small"
                    className="w-full"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        borderTopLeftRadius: "4px",
                        borderBottomLeftRadius: "4px",
                        ":hover": {
                          outlineColor: "#2e2e2e"
                        }
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2e2e2e"
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    className="h-[40px] rounded-l-none border-l-transparent border-[#2e2e2e] min-w-0 w-[40px] text-white"
                  >+</Button>
                </div>
              </div>

              <div className="mb-3">
                <h3 className="font-light pb-1 border-b-[#2e2e2e] border-b-[1px] mb-3">
                  Warehouse
                </h3>
                <div className="flex h-full">
                  <Autocomplete
                    freeSolo
                    id="warehouse-select-list"
                    options={warehousesList}
                    getOptionLabel={(option: GeneralAutocompletion | string) => {
                      if (typeof option === "string") return option
                      return option.name
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Search or add Warehouse" required />
                    )}
                    onInputChange={(_, value) => searchAndFillList(value, "warehouses", setWarehousesList)}
                    onChange={(_, item) => warehouseIdChangeHandler(item)}
                    renderOption={(props: any, option) => (
                      <li {...props} key={props['key']}>{option.name}</li>
                    )}
                    size="small"
                    className="w-full"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        borderTopLeftRadius: "4px",
                        borderBottomLeftRadius: "4px",
                        ":hover": {
                          outlineColor: "#2e2e2e"
                        }
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#2e2e2e"
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    className="h-[40px] rounded-l-none border-l-transparent border-[#2e2e2e] min-w-0 w-[40px] text-white"
                  >+</Button>
                </div>
              </div>


            </div>
          </div>
          <div className="flex gap-2 mt-2 justify-end">
            <Button variant="outlined" onClick={() => { props.onClose() }} className="font-light" size="small">Cancel</Button>
            <Button variant="contained" type="submit" className="font-light" size="small" >
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
    <li {...restProps}>
      <TableImageItem label={props.option.name} image={props.option.image} />
    </li>
  )
}
