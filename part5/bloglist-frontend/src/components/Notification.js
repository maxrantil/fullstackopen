const Notification = ({ message, messageType }) => {
  if (!message) {
    return null
  }

  const messageClass = messageType === 'error' ? 'error' : 'success'

  return (
    <div className={messageClass}>
      {message}
    </div>
  )
}

export default Notification
