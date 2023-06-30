import React, { FC } from 'react'
import { Empty, Button } from '@douyinfe/semi-ui';
import { IllustrationNoContent } from '@douyinfe/semi-illustrations';

export interface EmptyProps {
  description: React.ReactNode
}


const EmptyFn: FC<EmptyProps> = (props) => {
  const { description } = props
  return (
    <Empty
      image={<IllustrationNoContent style={{ width: "35vw", height: "35vw" }} />}
      className='flex-1'
      description={description}
    />
  )
}

export default EmptyFn
