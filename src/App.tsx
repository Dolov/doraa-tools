import React, { FC } from 'react'
import WordDuplicate from './WordDuplicate'

export interface AppProps {
  
}

const App: FC<AppProps> = (props) => {
  const {  } = props
  return (
    <div className='flex flex-1 overflow-auto'>
      <WordDuplicate />
    </div>
  )
}

export default App
