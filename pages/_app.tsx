import "infrastructure/errors"
import "interface/theme/global.css"
import { ApolloProvider } from "@apollo/client"
import { AppProps, ErrorBoundary } from "@blitzjs/next"
import { useQueryErrorResetBoundary } from "@blitzjs/rpc"
import { CacheProvider, EmotionCache } from "@emotion/react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Nocker, NockerProvider } from "@nocker/mui"
import { init } from "@sentry/browser"
import {
  getAnalytics,
  logEvent,
  setAnalyticsCollectionEnabled,
} from "firebase/analytics"
import { getApps, initializeApp } from "firebase/app"
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth"
import Head from "next/head"
import { Router } from "next/router"
import { SnackbarProvider } from "notistack"
import { FC, useEffect } from "react"
import { withBlitz } from "interface/blitz-client"
import { BoxErrorFallback } from "interface/components/box/BoxErrorFallback"
import { theme } from "interface/theme/theme"
import { createClient } from "interface/utils/createClient"
import { createEmotionCache } from "interface/utils/createEmotionCache"
import { unregister } from "interface/utils/serviceWorker"

const clientSideEmotionCache = createEmotionCache()

type Props = AppProps & {
  emotionCache?: EmotionCache
}

const nocker = new Nocker({
  projectId: "jX1A2O0pA1wR_6eqh_SGn",
  environment:
    process.env.NODE_ENV === "development" ? "DEVELOPMENT" : "PRODUCTION",
})

const client = createClient()

const App: FC<Props> = ({ Component, ...props }) => {
  const getLayout = Component.getLayout || ((page) => page)

  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  useEffect(() => {
    if (typeof window === "undefined") return
    if (process.env.NODE_ENV !== "production") return
    const routeChangeComplete = () => {
      if (getApps().length === 0) return
      logEvent(getAnalytics(), "page_view", {
        page_location: document.title,
        page_path: location.href,
        page_title: location.pathname,
      })
    }
    Router.events.on("routeChangeComplete", routeChangeComplete)
    routeChangeComplete()
    return () => {
      Router.events.off("routeChangeComplete", routeChangeComplete)
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <Head>
        {/** https://github.com/vercel/next.js/discussions/13387#discussioncomment-2387429 */}
        <style>{"nextjs-portal { display: none; }"}</style>
      </Head>
      <CacheProvider value={props.emotionCache || clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider maxSnack={3}>
            <ErrorBoundary
              FallbackComponent={BoxErrorFallback}
              onReset={queryErrorResetBoundary.reset}
            >
              <NockerProvider client={nocker}>
                {getLayout(<Component {...props.pageProps} />)}
              </NockerProvider>
            </ErrorBoundary>
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}

if (typeof window !== "undefined") {
  init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    tracesSampleRate: 1.0,
    release: `${process.env.NEXT_PUBLIC_SENTRY_RELEASE}`,
  })
}

if (getApps().length === 0) {
  initializeApp({
    apiKey: "AIzaSyBCojMAj-JQxc4-Ceu8nppJO_qx-gKYliU",
    authDomain: "fqcwljdj7qt9rphssvk3.firebaseapp.com",
    projectId: "fqcwljdj7qt9rphssvk3",
    storageBucket: "fqcwljdj7qt9rphssvk3.appspot.com",
    messagingSenderId: "511409109964",
    appId: "1:511409109964:web:1e5502c45cb09581223b69",
    measurementId: "G-HEP2VBXJZR",
  })
  // if (process.env.NODE_ENV === "development") {
  //   connectAuthEmulator(getAuth(), "http://localhost:9099")
  //   connectFirestoreEmulator(getFirestore(), "localhost", 8080)
  //   connectStorageEmulator(getStorage(), "localhost", 9199)
  // }
  if (typeof window !== "undefined") {
    setPersistence(getAuth(), inMemoryPersistence)
  }
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    setAnalyticsCollectionEnabled(getAnalytics(), false)
  }
}

if (typeof window !== "undefined") {
  unregister()
}

export default withBlitz(App)
