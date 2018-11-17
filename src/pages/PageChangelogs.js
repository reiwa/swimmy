import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import Fade from '@material-ui/core/Fade/Fade'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import { firestore } from 'firebase/app'
import React from 'react'
import { collectionData } from 'rxfire/firestore'
import { take } from 'rxjs/operators'
import { PageTitle } from '../components/PageTitle'
import { CHANGELOGS } from '../constants/collection'
import { DESC } from '../constants/order'
import { CardChangelog } from '../containers/CardChangelog'
import { createdAt } from '../libs/createdAt'
import { px } from '../libs/styles/px'
import { resetList } from '../libs/styles/resetList'
import { toVersionStr } from '../libs/toVersionStr'

class Component extends React.Component<any, any> {
  state = { changelogs: [], inProgressSubmit: true }
  isUnmounted = false
  subscription

  render() {
    const { classes } = this.props
    const { changelogs, inProgress } = this.state

    if (inProgress) {
      return <CircularProgress className={classes.progress} />
    }

    return (
      <Fade in>
        <main className={classes.root}>
          <PageTitle
            title={'アップデート履歴'}
            description={
              'バージョン3.0.0以降の過去のアップデート履歴を確認できます。'
            }
          />
          <ul className={classes.changelogs}>
            {changelogs.map(changelog => (
              <li key={changelog.id}>
                <CardChangelog
                  version={changelog.ui.version}
                  date={changelog.ui.date}
                  contents={changelog.contents}
                />
              </li>
            ))}
          </ul>
        </main>
      </Fade>
    )
  }

  componentDidMount() {
    this.subscription = this.subscribe()
  }

  componentWillUnmount() {
    this.isUnmounted = true
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  subscribe() {
    const query = firestore()
      .collection(CHANGELOGS)
      .limit(40)
      .orderBy('version', DESC)
    return collectionData(query)
      .pipe(take(2))
      .subscribe(docs => {
        if (this.isUnmounted) return
        const changelogs = [
          ...docs.map(doc => ({
            ...doc,
            ui: {
              version: toVersionStr(doc.version),
              date: createdAt(doc.date, false)
            }
          }))
        ]
        this.setState({ changelogs, inProgressSubmit: false })
      })
  }
}

const styles = ({ spacing }) =>
  createStyles({
    root: {
      display: 'grid',
      gridRowGap: px(spacing.unit * 4)
    },
    changelogs: {
      ...resetList(),
      display: 'grid',
      gridRowGap: px(spacing.unit * 2),
      paddingLeft: spacing.unit * 2,
      paddingRight: spacing.unit * 2
    },
    progress: {
      display: 'block',
      marginTop: spacing.unit * 10,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  })

export const PageChangelogs = withStyles(styles)(Component)
