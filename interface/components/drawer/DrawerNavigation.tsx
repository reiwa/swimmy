import { useSession } from "@blitzjs/auth"
import AssistantIcon from "@mui/icons-material/AssistantRounded"
import DescriptionIcon from "@mui/icons-material/DescriptionRounded"
import HomeIcon from "@mui/icons-material/HomeRounded"
import QuickreplyIcon from "@mui/icons-material/QuickreplyRounded"
import SecurityIcon from "@mui/icons-material/SecurityRounded"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { WidgetFloating } from "@nocker/mui"
import Link from "next/link"
import { FC, useState } from "react"

type Props = {
  pathname: string
  isOpen: boolean
  isDense: boolean
  onClose(): void
  onLogin(): void
  onLogout(): void
}

export const DrawerNavigation: FC<Props> = (props) => {
  const session = useSession()

  const [isOpenWidget, openWidget] = useState(false)

  const isLoggedIn = session.userId != null

  const listItems = [
    {
      primary: "ホーム",
      icon: <HomeIcon />,
      href: "/",
      isDisabled: false,
      isActive: props.pathname === "/",
    },
    {
      primary: "スレッド",
      icon: <QuickreplyIcon />,
      href: "/threads",
      isDisabled: false,
      isActive: props.pathname.startsWith("/threads"),
    },
    // {
    //   primary: "設定",
    //   icon: <SettingsIcon />,
    //   href: "/preferences",
    //   isDisabled: true,
    //   isActive: props.pathname.startsWith("/preferences"),
    // },
    {
      primary: "利用規約",
      icon: <DescriptionIcon />,
      href: "/terms",
      isDisabled: false,
      isActive: props.pathname === "/terms",
    },
    {
      primary: "個人情報保護方針",
      icon: <SecurityIcon />,
      href: "/privacy",
      isDisabled: false,
      isActive: props.pathname === "/privacy",
    },
  ]

  return (
    <>
      <WidgetFloating
        isOpen={isOpenWidget}
        onClose={() => {
          openWidget(false)
        }}
      />
      <Drawer
        anchor={"top"}
        open={props.isOpen}
        onClose={props.onClose}
        PaperProps={{
          sx: {
            borderBottomRightRadius: 8,
            borderBottomLeftRadius: 8,
          },
        }}
      >
        <List dense>
          {listItems.map((item) => (
            <Link href={item.href} key={item.primary}>
              <ListItem key={item.primary} sx={{ px: 0 }}>
                <ListItemButton
                  disabled={item.isDisabled}
                  selected={item.isActive}
                >
                  <ListItemIcon sx={{ minWidth: (theme) => theme.spacing(5) }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      props.isDense ? item.primary.slice(0, 1) : item.primary
                    }
                    primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <ListItem sx={{ px: 0 }}>
            <ListItemButton
              onClick={() => {
                props.onClose()
                openWidget(true)
              }}
            >
              <ListItemIcon sx={{ minWidth: (theme) => theme.spacing(5) }}>
                <AssistantIcon />
              </ListItemIcon>
              <ListItemText
                primary={"ご意見・ご要望"}
                primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
              />
            </ListItemButton>
          </ListItem>
          {/* <>
            {!isLoggedIn && (
              <ListItem sx={{ px: 0 }}>
                <ListItemButton onClick={props.onLogin}>
                  <ListItemIcon sx={{ minWidth: (theme) => theme.spacing(5) }}>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={"ログイン"}
                    primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </ListItem>
            )}
            {isLoggedIn && (
              <ListItem sx={{ px: 0 }}>
                <ListItemButton onClick={props.onLogout}>
                  <ListItemIcon sx={{ minWidth: (theme) => theme.spacing(5) }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={props.isDense ? "ロ" : "ログアウト"}
                    primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </> */}
        </List>
      </Drawer>
    </>
  )
}
