interface Props{
  href: string
  name: string
}

export const Link = (props:Props) => {
  return <a href={props.href}>{props.name}</a>
}
