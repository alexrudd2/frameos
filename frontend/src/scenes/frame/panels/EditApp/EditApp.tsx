import { useActions, useValues } from 'kea'
import { editAppLogic, EditAppLogicProps } from './editAppLogic'
import { Button } from '../../../../components/Button'
import Editor from '@monaco-editor/react'
import { AppNodeData, PanelWithMetadata } from '../../../../types'
import { frameLogic } from '../../frameLogic'
import { panelsLogic } from '../panelsLogic'
import { useEffect, useState } from 'react'
import schema from '../../../../../schema/config_json.json'
import type { editor as importedEditor } from 'monaco-editor'
import type { Monaco } from '@monaco-editor/react'
import clsx from 'clsx'

interface EditAppProps {
  panel: PanelWithMetadata
  sceneId: string
  nodeId: string
  nodeData: AppNodeData
}

export function EditApp({ panel, sceneId, nodeId, nodeData }: EditAppProps) {
  const { id: frameId } = useValues(frameLogic)
  const { persistUntilClosed } = useActions(panelsLogic)
  const logicProps: EditAppLogicProps = {
    frameId,
    sceneId,
    nodeId,
    keyword: nodeData.keyword,
    sources: nodeData.sources,
  }
  const logic = editAppLogic(logicProps)
  const { sources, sourcesLoading, activeFile, hasChanges, changedFiles, configJson, modelMarkers } = useValues(logic)
  const { saveChanges, setActiveFile, updateFile } = useActions(logic)
  const [[monaco, editor], setMonacoAndEditor] = useState<[Monaco | null, importedEditor.IStandaloneCodeEditor | null]>(
    [null, null]
  )

  useEffect(() => {
    persistUntilClosed(panel, logic)
  }, [])

  useEffect(() => {
    if (monaco && editor && activeFile) {
      const model = editor.getModel()
      if (model) {
        monaco.editor.setModelMarkers(model, 'owner', modelMarkers[activeFile] || [])
      }
    }
  }, [monaco, activeFile, modelMarkers])

  function beforeMount(monaco: Monaco) {
    monaco.editor.defineTheme('darkframe', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: { 'editor.background': '#000000' },
    })
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: 'http://internal/node-schema.json',
          fileMatch: ['config.json'], // associate with our model
          schema: schema,
        },
      ],
    })
  }

  if (sourcesLoading) {
    return <div>Loading...</div>
  }

  const name = configJson?.name || nodeData.keyword

  return (
    <div className="flex flex-col gap-2 max-h-full h-full max-w-full w-full">
      {!nodeData.sources && !hasChanges ? (
        <div className="bg-gray-950 p-2">
          You're editing a read-only system app <strong>{name}</strong>. Changes will be saved on a copy on the scene.
        </div>
      ) : hasChanges ? (
        <div className="bg-gray-900 p-2">
          You have changes.{' '}
          <Button size="small" onClick={saveChanges}>
            Click here to save them
          </Button>
        </div>
      ) : null}
      <div className="flex flex-row gap-2 max-h-full h-full max-w-full w-full">
        <div className="max-w-40 space-y-1">
          {Object.entries(sources).map(([file, source]) => (
            <div key={file} className="w-min">
              <Button
                size="small"
                color={activeFile === file ? (modelMarkers[file]?.length ? 'red' : 'teal') : 'none'}
                onClick={() => setActiveFile(file)}
                className={clsx(
                  'whitespace-nowrap',
                  modelMarkers[file]?.length ? (activeFile === file ? 'text-red-200' : 'text-red-500') : ''
                )}
                title={
                  modelMarkers[file]?.length
                    ? `line ${modelMarkers[file][0].startLineNumber}, col ${modelMarkers[file][0].startColumn}: ${modelMarkers[file][0].message}`
                    : undefined
                }
              >
                {changedFiles[file] ? '* ' : ''}
                {file}
              </Button>
            </div>
          ))}
        </div>
        <div className="bg-black font-mono text-sm overflow-y-auto overflow-x-auto w-full">
          <Editor
            height="100%"
            path={`${nodeId}/${activeFile}`}
            language={activeFile.endsWith('.json') ? 'json' : 'python'}
            value={sources[activeFile] ?? sources[Object.keys(sources)[0]] ?? ''}
            theme="darkframe"
            beforeMount={beforeMount}
            onMount={(editor, monaco) => setMonacoAndEditor([monaco, editor])}
            onChange={(value) => updateFile(activeFile, value ?? '')}
            options={{ minimap: { enabled: false } }}
          />
        </div>
      </div>
    </div>
  )
}
EditApp.PanelTitle = function EditAppPanelTitle({ panel, sceneId, nodeId, nodeData }: EditAppProps) {
  const { id: frameId } = useValues(frameLogic)
  const logicProps: EditAppLogicProps = {
    frameId,
    sceneId,
    nodeId,
    keyword: nodeData.keyword,
    sources: nodeData.sources,
  }
  const { hasChanges, configJson } = useValues(editAppLogic(logicProps))

  return (
    <div title={nodeId}>
      {hasChanges ? '* ' : ''}
      {configJson?.name ?? nodeData.keyword ?? nodeId}
    </div>
  )
}
