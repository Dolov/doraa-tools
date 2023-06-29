import React from 'react'


const useUpdate = () => {
  const [value, setValue] = React.useState({})

  return () => {
    setValue({})
  }
}


export default useUpdate