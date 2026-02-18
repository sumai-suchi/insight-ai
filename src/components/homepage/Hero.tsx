import React from 'react'
import { Button } from '../ui/button'

function Hero() {
  return (
    <div>
        <h1>Hero</h1>
        <p>This is the hero section of the homepage</p>
        <div className='flex gap-5 justify-between content-center'>
          <Button>Get Started</Button>
          <Button>Try Ai Editor</Button>
        </div>
        
    </div>
  )
}

export default Hero