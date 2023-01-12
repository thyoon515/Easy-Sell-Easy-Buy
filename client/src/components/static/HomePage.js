import React from 'react'

const HomePage = ({ currentUser }) => {

  if (currentUser) {
    return <h2>Welcome, {currentUser.username}!</h2>
  } else {
    return <h2>Please Log in!</h2>
  }
}

export default HomePage