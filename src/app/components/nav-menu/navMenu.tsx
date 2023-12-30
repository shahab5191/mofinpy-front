'use client'
import { ThemeProvider } from "@emotion/react";
import { themeOptions } from "../../theme";
import { Box, CssBaseline, ListItem, List, Drawer, ListItemButton, ListItemIcon, ListItemText, Button, Tooltip } from "@mui/material";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";


const listStyles = (open: boolean) => ({
  width: open ? "200px" : '60px',
  whiteSpace: "nowrap",
  boxSizing: 'border-box',
  transition: '0.2s width ease-in-out',
  overflow: 'hidden'
})

interface Props {
  children?: {
    icon: React.ReactNode,
    label: string,
    href: string
  }[]
}
const NavBar = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <Button
          sx={{
            position: 'absolute',
            right: '0',
            top: 'calc(37px + 0.75rem)',
            width: '30px',
            height: '30px',
            zIndex: 9999,
            overflow: 'hidden',
            minWidth: '30px',
            translate: '50%',
            backgroundColor: 'rgba(23,23,23,0.9)!important',
            borderRadius: '50%'
          }}
          onClick={() => setOpen(open => !open)}
        >
          <div className={`${open? "rotate-0" : "rotate-180"} transition-transform duration-500`}>
            <IoIosArrowBack />
          </div>
        </Button>
        <Drawer
          variant="permanent"
          open={open}
          sx={listStyles(open)}
        >
          <div>
            <h1
              className={`font-black text-4xl text-center ${open ? `w-[200px]` : 'w-[60px]'
                } mb-3 overflow-hidden mt-3`}
              style={{ 'transition': '0.2s ease-in-out width' }}
            >
              <a href="/">
                <span className={`text-[#76528e] ml-[0.5ch]`}>M</span>
                <span className={`${open ? "opacity-100" : "opacity-0"} transition-opacity`}>OFIN</span>
              </a>
            </h1>
          </div>
          <div className="w-[calc(100%-1rem)] mx-2 h-[1px] bg-white opacity-10"></div>
          <List sx={{
            ...listStyles(open),
            overflowY: "auto",
            overflowX: 'hidden',
            height: '100%'
          }
          }>
            {props.children?.map((item, index) => {
              return (
                <ListItem disablePadding sx={{ display: 'block' }} key={index}>
                  <ListItemButton
                    href={item.href}
                    sx={{
                      minHeight: 48,
                      justifyContent: 'center',
                      p: 1,
                    }}
                  >
                    <Tooltip title={item.label}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          justifyContent: 'center',
                          px: 2,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                    </Tooltip>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        opacity: open ? 1 : 0,
                        transition: 'opacity 0.2s ease-in-out',
                        fontWeight: '200',
                        fontFamily: 'roboto'
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider >
  )
}
export default NavBar
