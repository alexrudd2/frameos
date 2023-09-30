import { actions, connect, kea, key, path, props, reducers, selectors } from 'kea'
import { framesModel } from '../../../models/framesModel'
import equal from 'fast-deep-equal'
import { Area, Panel, PanelWithMetadata } from '../../../types'

import type { panelsLogicType } from './panelsLogicType'

export interface PanelsLogicProps {
  id: number
}
const DEFAULT_LAYOUT: Record<Area, PanelWithMetadata[]> = {
  [Area.TopLeft]: [{ panel: Panel.Diagram, active: true, hidden: false, metadata: { sceneId: 'default' } }],
  [Area.TopRight]: [
    { panel: Panel.Apps, active: true, hidden: false },
    { panel: Panel.Events, active: false, hidden: false },
    { panel: Panel.FrameDetails, active: false, hidden: false },
    { panel: Panel.FrameSettings, active: false, hidden: false },
  ],
  [Area.BottomLeft]: [
    { panel: Panel.Logs, active: true, hidden: false },
    { panel: Panel.Debug, active: false, hidden: false },
  ],
  [Area.BottomRight]: [{ panel: Panel.Image, active: true, hidden: false }],
}

function panelsEqual(panel1: PanelWithMetadata, panel2: PanelWithMetadata) {
  return panel1.panel === panel2.panel && equal(panel1.metadata || {}, panel2.metadata || {})
}

export const panelsLogic = kea<panelsLogicType>([
  path(['src', 'scenes', 'frame', 'panelsLogic']),
  props({} as PanelsLogicProps),
  key((props) => props.id),
  actions({
    setPanel: (area: Area, panel: PanelWithMetadata, label?: string) => ({ area, panel, label }),
    toggleFullScreenPanel: (panel: PanelWithMetadata) => ({ panel }),
    editApp: (keyword: string) => ({ keyword }),
  }),
  reducers({
    panels: [
      DEFAULT_LAYOUT as Record<Area, PanelWithMetadata[]>,
      {
        setPanel: (state, { area, panel, label }) => {
          const newPanels = { ...state }
          newPanels[area] = newPanels[area].map((p) => ({
            ...p,
            active: panelsEqual(p, panel),
            label: panelsEqual(p, panel) && label ? label : p.label,
          }))
          return equal(state, newPanels) ? state : newPanels
        },
        editApp: (state, { keyword }) => ({
          ...state,
          [Area.TopLeft]: [
            ...state[Area.TopLeft].map((a) => ({ ...a, active: false })),
            {
              panel: Panel.EditApp,
              label: `${keyword}`,
              active: true,
              hidden: false,
              metadata: {
                keyword,
              },
            },
          ],
        }),
      },
    ],
    fullScreenPanel: [
      null as PanelWithMetadata | null,
      {
        toggleFullScreenPanel: (state, { panel }) => (equal(state, panel) ? null : panel),
      },
    ],
  }),
  selectors(() => ({
    id: [() => [(_, props) => props.id], (id) => id],
    frame: [(s) => [framesModel.selectors.frames, s.id], (frames, id) => frames[id] || null],
    panelsWithConditions: [
      (s) => [s.panels, s.fullScreenPanel],
      (panels, fullScreenPanel): Record<Area, PanelWithMetadata[]> =>
        fullScreenPanel
          ? {
              [Area.TopLeft]: [{ ...fullScreenPanel, active: true, hidden: false }],
              [Area.TopRight]: [],
              [Area.BottomLeft]: [],
              [Area.BottomRight]: [],
            }
          : panels,
    ],
  })),
])
