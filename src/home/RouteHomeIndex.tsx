import { Theme } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'
import { Route, Switch, useParams } from 'react-router-dom'
import AppBarDefault from '../core/AppBarDefault'
import FragmentHead from '../web/FragmentHead'
import ToolbarDefault from '../layout/ToolbarDefault'
import { useColumns } from '../hooks/useColumns'
import DrawerThread from './components/DrawerThread'
import MainHome from './components/MainHome'
import MainThread from './components/MainThread'

const RouteHomeIndex: FunctionComponent = () => {
  const { threadId } = useParams<{ threadId: string }>()

  const { spacing } = useTheme()

  const classes = useStyles()

  const columns = useColumns()

  return (
    <div
      className={classes.root}
      style={{ gridTemplateColumns: columns ? `${spacing(50)}px 1fr` : '1fr' }}
    >
      <FragmentHead />
      {columns && <DrawerThread threadId={threadId} />}
      <div>
        <AppBarDefault />
        <ToolbarDefault />
        <Switch>
          <Route exact path={'/'}>
            <MainHome />
          </Route>
          <Route exact path={'/threads/:threadId'}>
            <MainThread />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

const useStyles = makeStyles<Theme>(() => {
  return { root: { display: 'grid' } }
})

export default RouteHomeIndex
