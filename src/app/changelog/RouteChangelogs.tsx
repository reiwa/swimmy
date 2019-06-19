import { CircularProgress, Fade, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Header from 'app/shared/components/AppBarDefault'
import FragmentHead from 'app/shared/components/FragmentHead'
import SectionTitle from 'app/shared/components/SectionTitle'
import { px } from 'app/shared/styles/px'
import { resetList } from 'app/shared/styles/resetList'
import React, { Fragment, FunctionComponent } from 'react'
import CardChangelog from './components/CardChangelog'
import { usePrismicChangelogs } from './hooks/usePrismicChangelogs'

const RouteChangelogs: FunctionComponent = () => {
  const classes = useStyles({})
  const [[changelogs, inProgress]] = usePrismicChangelogs()

  return (
    <Fragment>
      <FragmentHead
        title={'アップデート履歴'}
        description={'スイミーの過去のアップデート履歴です。'}
      />
      <Header />
      {inProgress && <CircularProgress className={classes.progress} />}
      {!inProgress && (
        <Fade in>
          <main className={classes.root}>
            <SectionTitle
              hide={false}
              title={'アップデート履歴'}
              description={
                'バージョン3.0.0以降の過去のアップデート履歴を確認できます。'
              }
            />
            <ul className={classes.changelogs}>
              {changelogs.map(changelog => (
                <li key={changelog.version}>
                  <CardChangelog changelog={changelog} />
                </li>
              ))}
            </ul>
          </main>
        </Fade>
      )}
    </Fragment>
  )
}

const useStyles = makeStyles<Theme>(({ spacing }) => {
  return {
    changelogs: {
      ...resetList(),
      display: 'grid',
      gridRowGap: px(spacing(2)),
      paddingLeft: spacing(2),
      paddingRight: spacing(2)
    },
    progress: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: spacing(10)
    },
    root: {
      display: 'grid',
      gridRowGap: px(spacing(2))
    }
  }
})

export default RouteChangelogs