import React from 'react'
import { useSelector } from 'react-redux'

import ChannelList from './channel-list'

const Channels = () => {
  const { chats } = useSelector((s) => s.chat)
  return (
    <div className="mb-6 group">
      {chats.map((it) => {
        return <ChannelList key={it._id} name={it.name}/>

      })}
    </div>
  )
}

export default Channels
