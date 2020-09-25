import { Shadows } from '@material-ui/core/styles/shadows'
import { Mode } from '../types/mode'

export const toShadowsSwitcher = (mode: Mode) => {
  return (light: Shadows, dark?: Shadows, red?: Shadows) => {
    if (mode === 'dark') {
      return dark || light
    }

    if (mode === 'red') {
      return red || light
    }

    return light
  }
}
