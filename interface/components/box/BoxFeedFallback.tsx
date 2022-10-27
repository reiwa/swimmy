import { List, ListItem } from "@mui/material"
import { FC } from "react"
import { BoxCardPostSkeleton } from "interface/components/box/BoxCardPostSkeleton"
import { BoxFormPost } from "interface/components/box/BoxFormPost"
import { BoxMain } from "interface/components/box/BoxMain"

export const BoxFeedFallback: FC = () => {
  const skeletons = [0, 1, 2, 3, 4, 5]

  return (
    <BoxMain>
      <BoxFormPost isLoading={true} />
      <List>
        {skeletons.map((skeleton) => (
          <ListItem key={skeleton}>
            <BoxCardPostSkeleton />
          </ListItem>
        ))}
      </List>
    </BoxMain>
  )
}
