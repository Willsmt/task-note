import 'styled-components'
import { Tema } from './temas'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Tema {}
}
