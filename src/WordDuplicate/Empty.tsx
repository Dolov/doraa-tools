import React, { FC } from 'react'
import { Empty, Button } from '@douyinfe/semi-ui';
import { IllustrationNoContent } from '@douyinfe/semi-illustrations';

export interface EmptyProps {
  description: React.ReactNode
}

const emptyStyle: React.CSSProperties = {
  paddingTop: 100,
};

const EmptyFn: FC<EmptyProps> = (props) => {
  const { description } = props
  return (
    <Empty
      image={<IllustrationNoContent style={{ width: "35vw", height: "35vw" }} />}
      style={emptyStyle}
      description={description}
      className='flex-1'
    />
  )
}

export default EmptyFn
