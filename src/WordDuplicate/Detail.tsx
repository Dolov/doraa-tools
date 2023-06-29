import React, { FC } from 'react'
import { Divider, Button, Radio, RadioGroup, Badge, Tooltip, Toast, Typography, Banner } from '@douyinfe/semi-ui';
import { IconCopy, IconLink } from '@douyinfe/semi-icons'
import { OnChangeProps } from '@douyinfe/semi-ui/lib/cjs/upload';
import mammoth from 'mammoth'
import useUpdate from '../hooks/useUpdate'
import { copy } from '../utils'

const { Text } = Typography;

export interface DetailProps {
  file?: OnChangeProps["currentFile"]
}

const Detail: FC<DetailProps> = (props) => {
  const { file } = props

  const updater = useUpdate()

  const fileStatusRef = React.useRef<Record<string, {
    text: string,
    html: string,
    statistics: Record<string, number>
  }>>({})

  React.useEffect(() => {
    if (!file?.uid) return
    if (file.status !== 'success') return
    if (
      fileStatusRef.current[file.uid]?.html &&
      fileStatusRef.current[file.uid]?.text
    ) return
    parseWordData(file)
  }, [file])

  const url = React.useMemo(() => {
		const base = `https://view.officeapps.live.com/op/view.aspx?src=`
		if (file?.status === 'success') {
			return `${base}${encodeURI(file.response.url)}`
		}
		return null
	}, [file])

  const parseWordData = (file: OnChangeProps["currentFile"]) => {
    const reader = new FileReader();
    reader.onload = function () {
      const arrayBuffer = this.result as ArrayBuffer
      mammoth.extractRawText({ arrayBuffer })
        .then(result => {
          fileStatusRef.current[file.uid] = {
            ...fileStatusRef.current[file.uid],
            text: result.value
          }
        })
      mammoth.convertToHtml({ arrayBuffer })
        .then(result => {
          fileStatusRef.current[file.uid] = {
            ...fileStatusRef.current[file.uid],
            html: result.value
          }
        })
    };
    reader.readAsArrayBuffer(file.fileInstance!);
  }

  const startCheck = () => {
    if (!file) return
    const text = fileStatusRef.current[file.uid].text

    const regex = /\d+[、\.](.*\n|$)/gm;
    const matches = text.match(regex) || []
    const statistics = matches
      .filter(item => !item.startsWith("0"))
      .filter(item => item.length > 10)
      .map(item => item.replace(/\d+[、\.]/, ''))
      .map(item => item.replace('\n', ''))
      .reduce((previousValue, currentValue) => {
        previousValue[currentValue] = previousValue[currentValue] ? previousValue[currentValue] + 1: 1
        return previousValue
      }, {} as any)
    
    const count2: Record<string, number> = {}
    Object.keys(statistics).forEach(item => {
      const count = statistics[item]
      if (count < 2) return
      count2[item] = count
    })
    fileStatusRef.current[file.uid].statistics = count2
    updater()
  }

  const handleCopy = (text: string) => {
    copy(text)
    Toast.success('复制成功')
  }

  if (!file) return null

  const fileName = file.name
  const statistics = fileStatusRef.current[file.uid]?.statistics
  const toBeCheck = !statistics
  const buttonText = toBeCheck ? "开始检测": "重新检测"
  const noDuplicate = statistics && Object.keys(statistics).length === 0

  return (
    <div className="ml-6 w-full overflow-auto">
      <div className="font-bold text-lg pl-4">
        <Text link={{ href: url!, target: "_blank" }} icon={<IconLink />} underline>{fileName}</Text>
      </div>
      <Divider margin='24px'/>
      <div className="pl-4">
        {/* <div className="font-bold my-6">段落起始格式</div>
        <div className="my-6">
          <RadioGroup direction="vertical">
            <Radio value={1}>数字 + 、（例如：<span className="bg-orange-500">1、</span>下列各财务管理目标中，没有考虑风险因素的是）</Radio>
            <Radio value={2}>数字 + .（例如：<span className="bg-orange-500">1.</span>下列各财务管理目标中，没有考虑风险因素的是）</Radio>
          </RadioGroup>
        </div> */}
        <div className="mt-8">
          <Button onClick={startCheck}>{buttonText}</Button>
        </div>
        <div className="mt-6 mr-8">
          {noDuplicate && (
            <Banner bordered type="success" description="未检测到重复内容" closeIcon={null} />
          )}
          {!noDuplicate && statistics && (
            <div>
              <Banner bordered type="warning" description="检测结果可能存在误差，仅供参考！" closeIcon={null} />
              {Object.keys(statistics).map(item => {
                const count = statistics[item]
                return (
                  <div>
                    <div className="py-4 font-bold flex items-center border-b border-gray-400 border-dashed">
                      <Tooltip content={`该文本出现了 ${count} 次`}>
                        <Badge type="warning" className="mr-2" count={count} />
                      </Tooltip>
                      <span>{item}</span>
                      <Tooltip content="复制文本">
                        <IconCopy onClick={() => handleCopy(item)} className="ml-2 cursor-pointer text-lime-700" color="red" />
                      </Tooltip>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Detail
