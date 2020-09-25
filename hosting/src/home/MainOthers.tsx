import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Theme,
  Toolbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { FragmentHead } from '../web/FragmentHead'
import { useAnalytics } from '../web/useAnalytics'

export const MainOthers: FunctionComponent = () => {
  useAnalytics()

  const classes = useStyles()

  return (
    <main className={classes.main}>
      <FragmentHead title={null} />
      <Toolbar />
      <List disablePadding>
        <Link to={'/archives'}>
          <ListItem button>
            <ListItemText primary={'過去ログ'} />
          </ListItem>
        </Link>
        <Divider />
        <ListItem disabled>
          <ListItemText primary={'統計データ'} />
        </ListItem>
        <Divider />
        <Link to={'/changelogs'}>
          <ListItem button>
            <ListItemText primary={'アップデート履歴'} />
          </ListItem>
        </Link>
        <Divider />
        <a
          href={
            'https://twitter.com/messages/compose?recipient_id=806076986682548224'
          }
          target={'_blank'}
          rel="noopener noreferrer"
        >
          <ListItem button>
            <ListItemText primary={'TwitterでDMを送る'} />
          </ListItem>
        </a>
        <Divider />
        <a
          href={'https://github.com/swimmy/swimmy/issues/new'}
          target={'_blank'}
          rel="noopener noreferrer"
        >
          <ListItem button>
            <ListItemText primary={'ISSUEをつくる'} />
          </ListItem>
        </a>
        <Divider />
        <Link to={'/privacy'}>
          <ListItem button>
            <ListItemText primary={'プライバシー・ポリシー'} />
          </ListItem>
        </Link>
        <Divider />
      </List>
    </main>
  )
}

const useStyles = makeStyles<Theme>(({ spacing }) => {
  return {
    main: { display: 'grid', gridGap: spacing(1) },
  }
})
