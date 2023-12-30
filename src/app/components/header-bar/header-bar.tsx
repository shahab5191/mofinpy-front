import { Box } from "@mui/material"
import { NotificationButton } from "./notification-button";
import { UserMenu } from "./user-menu";

export const HeaderBar = () => {
  return (
    <div className="w-max p-3 fixed right-0 top-0">
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'end',
        }}
      >
        <Box
          sx={{
            color: "white",
            display: 'flex',
            gap: '15px'
          }}
        >
          <NotificationButton />
          <div className="h-[calc(100%-1rem)] w-[1px] bg-white bg-opacity-10 my-2"></div>
          <UserMenu />
        </Box>
      </Box>
    </div>
  )
}
