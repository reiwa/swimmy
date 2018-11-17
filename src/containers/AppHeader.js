import AppBar from '@material-ui/core/AppBar/AppBar'
import IconButton from '@material-ui/core/IconButton/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import Close from '@material-ui/icons/Close'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import Photo from '@material-ui/icons/Photo'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import TurnedIn from '@material-ui/icons/TurnedIn'
import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { AppTitle } from '../components/AppTitle'
import { AuthContext } from '../contexts/auth'
import { pct } from '../libs/styles/pct'
import { px } from '../libs/styles/px'
import { DialogAppMenu } from './DialogAppMenu'
import { DialogAppSignIn } from './DialogAppSignIn'

class Component extends React.Component {
  state = { isOpenSignInDialog: false, isOpenMenuDialog: false }

  onOpenMenuDialog = () => {
    this.setState({ isOpenMenuDialog: true })
  }

  onOpenSignInDialog = () => {
    this.setState({ isOpenSignInDialog: true })
  }

  onCloseMenuDialog = () => {
    this.setState({ isOpenMenuDialog: false })
  }

  closeDialog = () => {
    this.setState({ isOpenSignInDialog: false })
  }

  onGoBack = () => {
    const { history } = this.props

    history.goBack()
  }

  render() {
    const { classes } = this.props
    const { isOpenSignInDialog, isOpenMenuDialog } = this.state

    return (
      <Fragment>
        <AppBar position="sticky" color="default" className={classes.appBar}>
          <AuthContext.Consumer>
            {auth =>
              auth.isLoggingIn && (
                <LinearProgress className={classes.progress} />
              )
            }
          </AuthContext.Consumer>
          <Toolbar>
            <AppTitle />
            {this.isDetailPage && (
              <IconButton
                onClick={this.onGoBack}
                aria-label={'Close this page'}
              >
                <Close />
              </IconButton>
            )}
            {!this.isDetailPage && (
              <div className={classes.actions}>
                <Link to={'/images'}>
                  <IconButton aria-label={'Open images page'}>
                    <Photo />
                  </IconButton>
                </Link>
                <Link to={'/threads'}>
                  <IconButton aria-label={'Open threads page'}>
                    <TurnedIn />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={this.onOpenMenuDialog}
                  aria-label={'Open a menu'}
                >
                  <MoreHoriz />
                </IconButton>
              </div>
            )}
            <AuthContext.Consumer>
              {auth => {
                if (auth.isLoggingIn) {
                  return null
                }
                return (
                  !auth.isLogged && (
                    <IconButton
                      onClick={this.onOpenSignInDialog}
                      aria-label={'Open a login dialog'}
                    >
                      <PowerSettingsNew />
                    </IconButton>
                  )
                )
              }}
            </AuthContext.Consumer>
          </Toolbar>
        </AppBar>
        <DialogAppMenu
          isOpen={isOpenMenuDialog}
          onClose={this.onCloseMenuDialog}
        />
        <DialogAppSignIn
          isOpen={isOpenSignInDialog}
          closeDialog={this.closeDialog}
        />
      </Fragment>
    )
  }

  get isDetailPage() {
    const { location } = this.props
    return location.pathname.includes('/threads/')
  }
}

const styles = ({ spacing }) =>
  createStyles({
    root: { flexGrow: 1 },
    progress: { position: 'absolute', top: 0, left: 0, width: pct(100) },
    title: { fontSize: 24, flexGrow: 1 },
    appBar: { backgroundColor: 'rgba(255, 255, 255, 0.98)' },
    menuButton: {
      marginLeft: spacing.unit * 1.5 * -1,
      marginRight: spacing.unit * 2.5
    },
    actions: {
      display: 'grid',
      gridColumnGap: px(spacing.unit),
      gridAutoFlow: 'column'
    }
  })

export const AppHeader = compose(
  withRouter,
  withStyles(styles)
)(Component)
