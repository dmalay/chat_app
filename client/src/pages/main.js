import React from "react"

import Sidebar from '../components/sidebar/sidebar'
import ChatContent from '../components/chat-content/chat-content'

const Main = () => {
  return (
  <div>
    <Head title="Chat" />
    <Sidebar />
    <ChatContent />
  </div>
  )
}

export default Main
