import { NoSsr, Stack } from "@mui/material"
import {
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { FC, ReactNode, Suspense, useState } from "react"
import { useLoginMutation } from "interface/__generated__/react"
import { BoxHeader } from "interface/components/box/BoxHeader"
import { BoxNavigation } from "interface/components/box/BoxNavigation"
import { BoxNavigationsFallback } from "interface/components/box/BoxNavigationsFallback"
import { DialogLogin } from "interface/components/dialog/DialogLogin"
import { DialogLogout } from "interface/components/dialog/DialogLogout"
import { DrawerNavigation } from "interface/components/drawer/DrawerNavigation"
import { useDense } from "interface/hooks/useDense"
import { useTwoColumn } from "interface/hooks/useTwoColumn"

type Props = {
  title?: string
  children: ReactNode
}

export const LayoutHome: FC<Props> = (props) => {
  const isTwoColumn = useTwoColumn()

  const isDense = useDense()

  const isOneColumn = !isTwoColumn

  const router = useRouter()

  const onLogout = async () => {
    try {
      router.replace("/")
      await logoutMutation()
      setOpenDialogLogout(false)
      enqueueSnackbar("ログアウトしました")
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message)
      }
    }
  }

  const [loginMutation, { loading: isLoading }] = useLoginMutation()

  const [logoutMutation] = useLoginMutation()

  const { enqueueSnackbar } = useSnackbar()

  const [isOpenDialogLogin, setOpenDialogLogin] = useState(false)

  const [isOpenDialogLogout, setOpenDialogLogout] = useState(false)

  const [isOpenDrawer, setOpenDrawer] = useState(false)

  const onLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const credential = await signInWithPopup(getAuth(), provider)
      const idToken = await getIdToken(credential.user)
      await loginMutation({ variables: { input: { token: idToken } } })
      setOpenDialogLogin(false)
      enqueueSnackbar("ログインしました")
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message)
      }
    }
  }

  const onLoginWithPassword = async (username: string, password: string) => {
    try {
      const email = username.includes("@") ? username : `${username}@swimmy.io`
      const credential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      )
      const idToken = await getIdToken(credential.user)
      await loginMutation({ variables: { input: { token: idToken } } })
      setOpenDialogLogin(false)
      enqueueSnackbar("ログインしました")
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message)
      }
    }
  }

  const onOpenDialogLogout = () => {
    if (isOpenDrawer) {
      setOpenDrawer(false)
    }

    setOpenDialogLogout(true)
  }

  const onOpenDialogLogin = () => {
    if (isOpenDrawer) {
      setOpenDrawer(false)
    }

    setOpenDialogLogin(true)
  }

  const onCloseDialog = () => {
    if (isOpenDialogLogin) {
      setOpenDialogLogin(false)
    }

    if (isOpenDialogLogout) {
      setOpenDialogLogout(false)
    }
  }

  return (
    <>
      <Head>
        <title>
          {typeof props.title === "string"
            ? `${props.title} | スイミー電子掲示板`
            : "スイミー電子掲示板"}
        </title>
        <link rel={"icon"} href={"/favicon.ico"} />
      </Head>
      <NoSsr>
        <Stack direction={isTwoColumn ? "row" : "column"} position={"relative"}>
          {isOneColumn && (
            <BoxHeader
              onLogout={onOpenDialogLogout}
              onLogin={onOpenDialogLogin}
              onOpenDrawer={() => {
                setOpenDrawer(true)
              }}
            />
          )}
          {isTwoColumn && (
            <Suspense fallback={<BoxNavigationsFallback />}>
              <BoxNavigation
                onLogout={onOpenDialogLogout}
                onLogin={onOpenDialogLogin}
                isDense={isDense}
              />
            </Suspense>
          )}
          {props.children}
        </Stack>
      </NoSsr>
      <DialogLogin
        isOpen={isOpenDialogLogin}
        isLoading={isLoading}
        onLoginWithGoogle={onLoginWithGoogle}
        onLoginWithPassword={onLoginWithPassword}
        onClose={onCloseDialog}
      />
      <DialogLogout
        isOpen={isOpenDialogLogout}
        onLogout={onLogout}
        onClose={onCloseDialog}
      />
      <Suspense fallback={null}>
        <DrawerNavigation
          pathname={router.pathname}
          onLogout={onOpenDialogLogout}
          onLogin={onOpenDialogLogin}
          isOpen={isOpenDrawer}
          isDense={false}
          onClose={() => {
            setOpenDrawer(false)
          }}
        />
      </Suspense>
    </>
  )
}
