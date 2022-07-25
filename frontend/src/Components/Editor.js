import React, { useEffect } from 'react'
import AceEditor from 'react-ace'
// import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-javascript'
import ACTIONS from '../Actions'
// import 'ace-builds/src-noconflict/mode-c_cpp'
// import 'ace-builds/src-noconflict/mode-csharp'
// import 'ace-builds/src-noconflict/mode-python'
// import 'ace-builds/src-noconflict/mode-ruby'
// import 'ace-builds/src-noconflict/mode-kotlin'
// import 'ace-builds/src-noconflict/mode-swift'
const Editor = ({ code, setCode, language, socketRef, roomId }) => {
  useEffect(() => {
    socketRef?.current?.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code,
    })

    socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
      if (code !== null) setCode(code)
    })
  }, [socketRef.current, code])
  return (
    <>
      <AceEditor
        className='editor-text-area'
        mode={language}
        theme='solarized_light'
        onChange={(e) => {
          setCode(e)
        }}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          fontSize: 20,
          showPrintMargin: false,
        }}
        value={code}
      />
    </>
  )
}

export default Editor
