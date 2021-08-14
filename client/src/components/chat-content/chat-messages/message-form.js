import React from "react"

const MessageForm = ({ text, name, fromUser, time, isUserCurrent, popup, setPopup, setUserForDm }) => {
  return (
    <>
      {" "}
      {isUserCurrent ? (
        <div className="flex py-1 justify-end">
          <div className="flex flex-col border border-gray-400 rounded-xl px-8 shadow bg-purple-100 items-end">
            <div className="flex items-start">
              <span className="font-bold mr-2 text-purple-800 font-sans">
                {name}
              </span>
              <span className="text-gray-600 ml-2 mt-1 text-xs font-light">
                {time}
              </span>
            </div>
            <p className="text-md text-gray-800 pt-1">{text}</p>
          </div>
        </div>
      ) : (
        <div className="flex py-1">
          <div className="flex flex-col border border-gray-500 rounded-xl px-8 shadow bg-white items-start">
            <div className="flex items-start">
              <span
              className="font-bold mr-2 text-purple-800 font-sans cursor-pointer
                        transition duration-500 ease-in-out transform hover:scale-125"
              onClick={() => {
                setUserForDm({
                  login: name,
                  _id: fromUser
                })
                setPopup(!popup)
              }}
              >
                {name}
              </span>
              <span className="text-gray-600 ml-2 mt-1 text-xs font-light">
                {time}
              </span>
            </div>
            <p className="text-md text-gray-800 pt-1">{text}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default MessageForm
