import React, { FC } from 'react'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import SideBarItem from '../molecules/SidebarItem'

const SettingsSideBar: FC = () => (
    <Paper component="nav">
        <MenuList>
            <SideBarItem title="マイページ" linkUrl="/account/mypage" />
            <SideBarItem title="アカウント設定" linkUrl="/account/setting" />
            {/* <SideBarItem title="メールアドレス変更" linkUrl="/settings/mail" />
      <SideBarItem title="パスワード変更" linkUrl="/settings/password" /> */}
        </MenuList>
    </Paper>
)

export default SettingsSideBar
