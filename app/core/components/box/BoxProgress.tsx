import { Box } from "@mui/material"
import { useRouter } from "blitz"
import React, { FunctionComponent, useEffect } from "react"

const BoxProgress: FunctionComponent = () => {
  const router = useRouter()

  useEffect(() => {
    const onRouteChangeStart = () => {
      console.log("routeChangeStart")
    }

    const onRouteChangeComplete = () => {}

    router.events.on("routeChangeStart", onRouteChangeStart)
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart)
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Box />
}