'use client'
import { Dropdown } from '@mui/base/Dropdown'
import { MenuButton } from '@mui/base/MenuButton'
import { Menu } from '@mui/base/Menu'
import { MenuItem } from '@mui/material';
import { IoIosArrowDown } from "react-icons/io";

interface Props {}
export const UserMenu = (props:Props) => {
  return (
    <Dropdown>
      <MenuButton
        className='flex gap-2 content-center items-center border-[1px] border-[#2e2e2e] rounded-lg px-2 text-sm bg-[var(--bg-primary)]'
      >
        <div className='w-[30px] h-[30px] rounded-[10px] bg-black'></div>
        Mostafa Oveysi
        <IoIosArrowDown />
      </MenuButton>
      <Menu>
        <ul>
          <MenuItem>
            test
          </MenuItem>
        </ul>
      </Menu>
    </Dropdown>
  )
}
