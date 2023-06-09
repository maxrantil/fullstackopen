const Logout = () => {

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default Logout
