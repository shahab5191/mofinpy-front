import { useCallback, useEffect, useState } from "react"

interface Props {
  initial?: number
  onChange?: (val: number) => void
}

export const NumberInput = (props: Props) => {
  const [value, setValue] = useState(props.initial ? props.initial : 0)
  const increment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setValue(current => {
      if (current === undefined) {
        return props.initial ? props.initial + 1 : 1
      }
      return current + 1
    })
  }
  const decrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setValue(current => {
      if (current === undefined) {
        return props.initial ? Math.max(props.initial - 1, 0) : 0
      }
      return Math.max(current - 1, 0)
    })
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.currentTarget.value)
    if (newVal === undefined || newVal === null || isNaN(newVal) || newVal < 0) return
    setValue(newVal || 0)

  }

  const onChange = useCallback(() => {
    if (props.onChange) {
      props.onChange(value)
    }
  }, [props, value])

  useEffect(() => {
    onChange()
  }, [onChange])

  return (
    <div className="flex border-[1px] border-[#2e2e2e] h-[40px] rounded-md overflow-hidden">
      <button className="w-[40px] border-r-[1px] border-r-[#2e2e2e] border-transparent border-solid bg-transparent cursor-pointer active:hover:bg-[#202025] transition-colors"
        onClick={decrement}
      >-</button>
      <input
        type="number"
        className="h-full max-w-[100px] bg-transparent text-white px-2 text-center focus-visible:outline-none focus-visible:bg-[#202025] transition-colors"
        value={value}
        onChange={changeHandler}
      />
      <button className="w-[40px] border-l-[1px] border-l-[#2e2e2e] border-transparent border-solid bg-transparent cursor-pointer active:hover:bg-[#202025] transition-colors"
        onClick={increment}
      >+</button>
    </div>
  )
}
