import React from 'react'
import gif from '/home/thyoon515/Development/code/phase-4/easy-sell-easy-buy/client/src/WelccomeToESEBgif.gif'

const HomePage = ({ currentUser }) => {

  if (currentUser) {
    return <div align='center' >
              <h1>Welcome, {currentUser.username}!</h1>
           </div>
  } else {
    return <div> 
              <img 
                src={gif} 
                alt='Welcome To ESEB' 
                style={{
                  position: 'absolute',
                  top: 60,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
           </div>
  }
}

export default HomePage