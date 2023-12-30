'use client'
import { IconButton } from "@mui/material"
import { IoIosNotificationsOutline } from "react-icons/io"
const notificationNumber = 3
export const NotificationButton = () => {
  return (
    <div
      className="relative"
    >
      <IconButton
        className="bg-[#151518] bg-opacity-60"
        sx={{
          color: 'white',
          border: "1px solid #2e2e2e",
          borderRadius: "10px"
        }}
      >
        <IoIosNotificationsOutline />
      </IconButton>
      {notificationNumber > 0?
      <p
        className="bg-[#f50044] absolute top-1 right-1 text-xs w-[15px] h-[15px] flex justify-center items-center text-center rounded-full"
      >{notificationNumber}</p>
      :null}
    </div>
  )
}
