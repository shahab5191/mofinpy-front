interface Props {
	color: keyof typeof COLORS
  label: string
}

const COLORS = {
  'red': {
    bg: 'rgba(255,50,50,0.1)',
    color: 'rgb(255,50,50)'
  },
  'blue': {
    bg: 'rgba(50,100,255,.1)',
    color: 'rgb(50,100,255)'
  },
  'yellow':{
    bg: 'rgba(250, 200, 50, .1)',
    color: 'rgb(250, 200, 50)'
  },
  'green':{
    bg: 'rgba(50, 220,100, .1)',
    color: 'rgb(50, 220, 100)'
  }
}

export const ColordTag = (props: Props) => {
  return(
    <div
      style={{
	borderColor: COLORS[props.color].color,
	color: COLORS[props.color].color,
	backgroundColor: COLORS[props.color].bg,
      }}
      className="border-[1px] bg-opacity-20 font-light text-xs px-1 rounded-lg"
    >{props.label}</div>
  )
}
