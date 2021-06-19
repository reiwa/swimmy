import { Theme, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import firebase from 'firebase/app'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { ButtonMore } from 'src/core/components/ButtonMore'
import { FragmentHead } from 'src/core/components/FragmentHead'
import { useAnalytics } from 'src/core/hooks/useAnalytics'
import { useSearchOrderBy } from 'src/core/hooks/useSearchOrderBy'
import { WORD_PHOTO } from 'src/core/types/word'
import { CardImage } from 'src/photo/components/CardImage'
import { TextFieldPhoto } from 'src/photo/components/TextFieldPhoto'
import { useImages } from 'src/photo/hooks/useImages'
import { useImagesLimit } from 'src/photo/hooks/useImagesLimit'

export const MainPhotos: FunctionComponent = () => {
  const orderBy = useSearchOrderBy()

  const [limit, setLimit] = useImagesLimit(orderBy)

  const [posts] = useImages(limit, orderBy)

  const [loading, setLoading] = useState(posts.length === 0)

  const classes = useStyles()

  useAnalytics()

  useEffect(() => {
    if (posts.length === 0) return
    setLoading(false)
  }, [posts.length])

  const onReadNext = () => {
    setLoading(true)
    setLimit((_limit) => _limit + 16)
    firebase.analytics().logEvent('tap_to_read_next_photos')
  }

  const hasNext = posts.length !== 0 && limit < 400

  return (
    <main className={classes.root}>
      <FragmentHead
        title={WORD_PHOTO}
        description={`${WORD_PHOTO}の添付された書き込みです。`}
      />
      <Toolbar />
      <TextFieldPhoto />
      <ul className={classes.ul}>
        {posts.map((post) => (
          <li key={post.id}>
            <CardImage post={post} />
          </li>
        ))}
      </ul>
      {hasNext && (
        <div className={classes.next}>
          <ButtonMore onClick={onReadNext} inProgress={loading} />
        </div>
      )}
    </main>
  )
}

const useStyles = makeStyles<Theme>(({ breakpoints, spacing }) => {
  return {
    root: { display: 'grid', gridRowGap: spacing(2) },
    section: { display: 'grid', gridRowGap: spacing(2) },
    ul: {
      alignItems: 'center',
      display: 'grid',
      gridColumnGap: spacing(2),
      gridRowGap: spacing(2),
      margin: 0,
      paddingLeft: spacing(2),
      paddingRight: spacing(2),
      [breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
      [breakpoints.up('md')]: { gridTemplateColumns: 'repeat(3, 1fr)' },
      [breakpoints.up('lg')]: { gridTemplateColumns: 'repeat(4, 1fr)' },
    },
    next: {
      alignItems: 'center',
      display: 'grid',
      gridAutoColumns: 'max-content',
      justifyContent: 'center',
      padding: spacing(2),
    },
  }
})
