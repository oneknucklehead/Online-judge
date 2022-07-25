import React, { useEffect, useRef, useState } from 'react'

import qs from 'qs'
import axios from 'axios'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/webpack-resolver'
import './CompilerScreen.css'
import { Row, Col } from 'react-bootstrap'
import Loader from './Loader'
import Connected from './Connected'
import './CompilerScreen.css'
import { initSocket } from '../socket.js'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import ACTIONS from '../Actions.js'
import Editor from './Editor'

const CompilerScreen = () => {
  const socketRef = useRef(null)
  const location = useLocation()
  const history = useHistory()
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('java')
  const [output, setOutput] = useState('')
  const [connectedList, setConnectedList] = useState([])
  const { roomId } = useParams()

  const [outputLoading, setOutputLoading] = useState(false)
  let languageList = {
    java: 'java',
    javascript: 'js',
    python: 'py',
  }

  useEffect(() => {
    const init = () => {}
    init()
  }, [])
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket()
      socketRef.current.on('connect_error', (err) => handleErrors(err))
      socketRef.current.on('connect_failed', (err) => handleErrors(err))

      function handleErrors(e) {
        console.log('socket error', e)
        toast.error('Socket connection failed, try again later.')
        history.push('/')
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      })

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`)
            console.log(`${username} joined`)
          }
          setConnectedList(clients)
          // socketRef.current.emit(ACTIONS.SYNC_CODE, {
          //   code: codeRef.current,
          //   socketId,
          // })
        }
      )

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`)
        setConnectedList((prev) => {
          return prev.filter((client) => client.socketId !== socketId)
        })
      })
    }
    init()
    // return () => {
    //   socketRef.current.disconnect()
    //   socketRef.current.off(ACTIONS.JOINED)
    //   socketRef.current.off(ACTIONS.DISCONNECTED)
    // }
  }, [])

  const handleCompile = async () => {
    console.log({ code, language })
    let dataPost = qs.stringify({
      code: code,
      language: languageList[language],
      input: '',
    })
    setOutputLoading(true)
    const { data } = await axios.post(
      `http://localhost:5000/api/compile`,
      dataPost
    )
    console.log(data)
    setOutput({ ...data })
    setOutputLoading(false)
  }
  if (!location.state) history.push('/')
  return (
    <>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col md={2}>
          <div className='aside'>
            <div className='aside-inner'>
              <h5>Connected users:</h5>
              <div className='connected-container'>
                {connectedList.map((connected) => (
                  <Connected
                    key={connected.socketId}
                    username={connected.username}
                  />
                ))}
              </div>
            </div>
            <button className='copy-btn'>Copy Room Id</button>
            <button className='leave-btn'>Leave</button>
          </div>
        </Col>
        <Col
          md={7}
          // style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Editor
            code={code}
            setCode={setCode}
            language={language}
            socketRef={socketRef}
            roomId={roomId}
          />
        </Col>
        <Col md={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className='comp-output-container'>
            <h4>Output</h4>
            <div className='output-area'>
              {outputLoading ? (
                <Loader />
              ) : output && output.output ? (
                output.output
              ) : (
                output.err
              )}
            </div>
            <div className='opt-container'>
              {outputLoading}
              <select
                name='language'
                id='language'
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                }}
              >
                <option value='javascript'>Javascript</option>
                <option value='java'>Java</option>
                <option value='python'>Python</option>
              </select>
              <button className='compBtn' onClick={handleCompile}>
                {outputLoading ? 'Compiling...' : 'Compile'}
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CompilerScreen
