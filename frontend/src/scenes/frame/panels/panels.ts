import { Diagram } from './Diagram/Diagram'
import { FrameDetails } from './FrameDetails/FrameDetails'
import { FrameSettings } from './FrameSettings/FrameSettings'
import { Image } from './Image/Image'
import { Logs } from './Logs/Logs'
import { AddApps } from './AddApps/AddApps'
import { Selection } from './Selection/Selection'
import { Panel } from '../../../types'

export const panels: Record<Panel, (...props: any[]) => JSX.Element> = {
  Diagram,
  FrameDetails,
  FrameSettings,
  Image,
  Logs,
  AddApps,
  Selection,
}
