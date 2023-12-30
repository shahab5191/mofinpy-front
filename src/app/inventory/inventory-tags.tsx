import {ColordTag } from "../components/colored-tag/colored-tag"
const tags = {
  'inventory': <ColordTag color="blue" label="Inventory" />,
  'shipped': <ColordTag color="yellow" label='Shipped' />,
  'sold': <ColordTag color="green" label="Sold" />
}
interface Props{
  type: keyof typeof tags
}

export const InventoryTag = (props: Props) =>{
  return tags[props.type]
}
