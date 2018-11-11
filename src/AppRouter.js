import withStyles from '@material-ui/core/styles/withStyles'
import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AppHeader } from './containers/AppHeader'
import { PageAbout } from './pages/PageAbout'
import { PageChangelogCreate } from './pages/PageChangelogCreate'
import { PageChangelogs } from './pages/PageChangelogs'
import { PageHome } from './pages/PageHome'
import { PageImages } from './pages/PageImages'
import { PageIssues } from './pages/PageIssues'
import { PageSearch } from './pages/PageSearch'
import { PageSettingsEmail } from './pages/PageSettingsEmail'
import { PageSettingsPassword } from './pages/PageSettingsPassword'
import { PageStats } from './pages/PageStats'
import { PageThreads } from './pages/PageThreads'

class Component extends React.Component<any, any> {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <AppHeader />
          <Switch>
            <Route exact path="/" component={PageHome} />
            <Route exact path="/about" component={PageAbout} />
            <Route exact path="/changelogs" component={PageChangelogs} />
            <Route exact
                   path="/changelogs/create"
                   component={PageChangelogCreate} />
            <Route exact path="/images" component={PageImages} />
            <Route exact path="/issues" component={PageIssues} />
            <Route exact path="/search" component={PageSearch} />
            <Route exact path="/settings/email" component={PageSettingsEmail} />
            <Route exact
                   path="/settings/password"
                   component={PageSettingsPassword} />
            <Route exact path="/stats" component={PageStats} />
            <Route exact path="/threads" component={PageThreads} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    )
  }
}

const styles = () => ({})

export const AppRouter = withStyles(styles)(Component)
