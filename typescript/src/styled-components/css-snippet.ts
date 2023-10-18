import { css } from 'styled-components'
import tinyColor from 'tinycolor2'

export const matchColors = (bg: string) => css`
  background-color: ${bg};
  color: ${tinyColor(bg).isLight() ? '#000' : '#fff'};
`
