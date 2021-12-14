import { List, ListItem, Stack } from "@mui/material"
import { BoxCardPhoto } from "app/core/components/box/BoxCardPhoto"
import { ButtonFetchMore } from "app/core/components/button/ButtonFetchMore"
import readFeedPhotos, {
  zReadFeedPhotos,
} from "app/photos/queries/readFeedPhotos"
import { useInfiniteQuery, useSession } from "blitz"
import React, { Fragment, FunctionComponent } from "react"
import { z } from "zod"

type Props = {
  threadId: string | null
  onChangeThreadId(threadId: string): void
}

export const BoxMainFeedPhoto: FunctionComponent<Props> = (props) => {
  const session = useSession()

  const [
    pages,
    { hasNextPage, isFetchingNextPage, fetchNextPage, isFetching },
  ] = useInfiniteQuery(
    readFeedPhotos,
    (page = { skip: 0 }): z.infer<typeof zReadFeedPhotos> => {
      return { skip: page.skip }
    },
    {
      refetchInterval: 4000,
      getNextPageParam(lastPage) {
        return lastPage.nextPage
      },
    }
  )

  return (
    <Stack
      component={"main"}
      flex={1}
      sx={{
        width: "100%",
        maxWidth(theme) {
          return theme.spacing(80)
        },
        minWidth(theme) {
          return {
            md: theme.spacing(40),
            lg: theme.spacing(60),
          }
        },
        margin: "0 auto",
      }}
    >
      <List>
        {pages.map((page, index) => (
          <Fragment key={index}>
            {page.items.map((post) => (
              <ListItem key={post.id}>
                <BoxCardPhoto
                  {...post}
                  isLoggedIn={session.userId !== null}
                  isActive={post.id === props.threadId}
                  onOpenThread={() => {
                    props.onChangeThreadId(post.id)
                  }}
                />
              </ListItem>
            ))}
          </Fragment>
        ))}
        <ListItem>
          <ButtonFetchMore
            isFetching={isFetching}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onClick={fetchNextPage}
          />
        </ListItem>
      </List>
    </Stack>
  )
}
