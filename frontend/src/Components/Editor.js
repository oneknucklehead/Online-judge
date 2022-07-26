// import React, { useEffect } from 'react'
// import AceEditor from 'react-ace'
// // import 'ace-builds/src-noconflict/theme-dracula'
// import 'ace-builds/src-noconflict/mode-java'
// import 'ace-builds/src-noconflict/mode-javascript'
// import ACTIONS from '../Actions'
// // import 'ace-builds/src-noconflict/mode-c_cpp'
// // import 'ace-builds/src-noconflict/mode-csharp'
// // import 'ace-builds/src-noconflict/mode-python'
// // import 'ace-builds/src-noconflict/mode-ruby'
// // import 'ace-builds/src-noconflict/mode-kotlin'
// // import 'ace-builds/src-noconflict/mode-swift'
// const Editor = ({ code, setCode, language, socketRef, roomId }) => {
//   useEffect(() => {
//     socketRef?.current?.emit(ACTIONS.CODE_CHANGE, {
//       roomId,
//       code,
//     })

//     socketRef?.current?.on(ACTIONS.CODE_CHANGE, ({ code }) => {
//       if (code !== null) setCode(code)
//     })
//   }, [code])
//   return (
//     <>
//       <AceEditor
//         className='editor-text-area'
//         mode={language}
//         theme='solarized_light'
//         onChange={(e) => {
//           setCode(e)
//         }}
//         editorProps={{ $blockScrolling: true }}
//         setOptions={{
//           enableBasicAutocompletion: true,
//           enableLiveAutocompletion: true,
//           enableSnippets: true,
//           fontSize: 20,
//           showPrintMargin: false,
//         }}
//         value={code}
//       />
//     </>
//   )
// }

// export default Editor

import React, { useEffect, useRef } from 'react'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/pastel-on-dark.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import ACTIONS from '../Actions'

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null)
  useEffect(() => {
    const init = async () => {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById('realtimeEditor'),
        {
          mode: { name: 'javascript', json: true },
          theme: 'pastel-on-dark',
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      )

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes
        const code = instance.getValue()
        onCodeChange(code)
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          })
        }
      })
    }
    init()
  }, [])

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code)
        }
      })
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE)
    }
  }, [socketRef.current])

  return <textarea id='realtimeEditor'></textarea>
}

export default Editor
