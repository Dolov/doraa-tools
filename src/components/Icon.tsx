

import React, { FC } from 'react'
import { prefixCls } from '../utils'

const Word = () => {
  return (
    <svg height="1em" width="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient-microsoftword" gradientUnits="userSpaceOnUse" x1="15%" x2="85%" y1="15%" y2="85%">
          <stop style={{"stopColor":"rgb(255, 27, 107)","stopOpacity":"1"}} offset="0%"/>
          <stop style={{"stopColor":"rgb(69, 202, 255)","stopOpacity":"1"}} offset="100%"/>
        </linearGradient>
        <linearGradient id="bgGradient-microsoftword" gradientUnits="userSpaceOnUse" x1="15%" x2="85%" y1="15%" y2="85%">
          <stop style={{"stopColor":"rgb(255, 27, 107)","stopOpacity":"1"}} offset="0%"/>
          <stop style={{"stopColor":"rgb(69, 202, 255)","stopOpacity":"1"}} offset="100%"/>
        </linearGradient>
      </defs>
      <path d="M844,1024H180C80.589,1024,0,943.411,0,844l0-664C0,80.589,80.589,0,180,0l664,0c99.411,0,180,80.589,180,180v664C1024,943.411,943.411,1024,844,1024z" fill="url(&quot;#bgGradient-microsoftword&quot;)"/>
      <svg className="StyledIconBase-ea9ulj-0 jZGNBW" width="610" fill="#F4F4F4" stroke="#000000" strokeOpacity="0" strokeWidth="0px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" x="207">
        <path d="M23.004 1.5q.41 0 .703.293t.293.703v19.008q0 .41-.293.703t-.703.293H6.996q-.41 0-.703-.293T6 21.504V18H.996q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6H6V2.496q0-.41.293-.703t.703-.293zM6.035 11.203l1.442 4.735h1.64l1.57-7.876H9.036l-.937 4.653-1.325-4.5H5.38l-1.406 4.523-.938-4.675H1.312l1.57 7.874h1.641zM22.5 21v-3h-15v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3h-15v3z" fill="#F4F4F4" stroke="#000000" strokeOpacity="0" strokeWidth="0px"/>
      </svg>
    </svg>
  )
}

export interface IconProps {
  type: "word"
  size?: number
}

const iconMap: Record<IconProps["type"], React.FC> = {
  word: Word
}

const Icon: FC<IconProps> = props => {
  const { size = 18, type } = props
  const Icon = iconMap[type]
  return (
    <span className="inline-flex items-center" style={{ fontSize: size }}>
      <Icon />
    </span>
  )
}

export default Icon
