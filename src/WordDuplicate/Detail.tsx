import React, { FC } from 'react'
import { Divider, Button, Checkbox, CheckboxGroup, Badge, Tooltip, Toast, Typography, Banner } from '@douyinfe/semi-ui';
import { IconCopy, IconLink } from '@douyinfe/semi-icons'
import { OnChangeProps } from '@douyinfe/semi-ui/lib/cjs/upload';
import mammoth from 'mammoth'
import { copy } from '../utils'

const { Text } = Typography;

export interface DetailProps {
  file?: OnChangeProps["currentFile"]
}

const Detail: FC<DetailProps> = (props) => {
  const { file } = props
  const [parseing, setParseing] = React.useState(false)

  const fileStatusRef = React.useRef<Record<string, {
    text: string,
    statistics: Record<string, number>
  }>>({})

  const url = React.useMemo(() => {
    const base = `https://view.officeapps.live.com/op/view.aspx?src=`
    if (file?.status === 'success') {
      return `${base}${encodeURI(file.response.url)}`
    }
    return null
  }, [file?.status])

  const parseWordData = (file: OnChangeProps["currentFile"]): Promise<string> => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = function () {
        const arrayBuffer = this.result as ArrayBuffer
        mammoth.extractRawText({ arrayBuffer })
          .then(result => {
            resolve(result.value)
          })
      };
      reader.readAsArrayBuffer(file.fileInstance!);
    })
  }

  const startCheck = async () => {
    if (!file) return
    setParseing(true)
    const text = await parseWordData(file)
    fileStatusRef.current[file.uid] = {
      ...fileStatusRef.current[file.uid],
      text,
    }

    const regex = /\d+[、\.](.*\n|$)/gm;
    const matches = text.match(regex) || []
    const statistics = matches
      .filter(item => !item.startsWith("0"))
      .filter(item => item.length > 10)
      .map(item => item.replace(/^\s+/, ''))
      .map(item => item.replace(/\d+[、\.]/, ''))
      .map(item => item.replace('\n', ''))
      .reduce((previousValue, currentValue) => {
        previousValue[currentValue] = previousValue[currentValue] ? previousValue[currentValue] + 1 : 1
        return previousValue
      }, {} as any)

    const count2: Record<string, number> = {}
    Object.keys(statistics).forEach(item => {
      const count = statistics[item]
      if (count < 2) return
      count2[item] = count
    })
    fileStatusRef.current[file.uid].statistics = count2
    setParseing(false)
  }

  const handleCopy = (text: string) => {
    copy(text)
    Toast.success('复制成功')
  }

  if (!file) return null

  const uploading = file.status === 'uploading'
  const statistics = fileStatusRef.current[file.uid]?.statistics
  const toBeCheck = !statistics
  const noDuplicate = statistics && Object.keys(statistics).length === 0
  const loading = uploading || parseing

  const getButtonText = () => {
    if (parseing) return "文件解析中"
    if (uploading) return "文件上传中"
    if (toBeCheck) return "开始检测"
    return "重新检测"
  }

  const fileName = file.name
  const buttonText = getButtonText()

  return (
    <div className="flex-1 sm:ml-6 w-full overflow-auto">
      <div className="font-bold text-lg pl-4">
        <Text link={{ href: url!, target: "_blank" }} icon={<IconLink />} underline>{fileName}</Text>
      </div>
      <Divider margin='24px' />
      <div className="sm:pl-4">
        <div className="font-bold my-6">适用于以下段落格式</div>
        <div className="my-6">
          <CheckboxGroup direction="vertical" value={[1, 2]}>
            <Checkbox value={1}>数字 + 、（例如：<span className="bg-orange-500">1、</span>下列各财务管理目标中，没有考虑风险因素的是）</Checkbox>
            <Checkbox value={2}>数字 + .（例如：<span className="bg-orange-500">1.</span>下列各财务管理目标中，没有考虑风险因素的是）</Checkbox>
          </CheckboxGroup>
        </div>
        <div className="mt-8">
          <Button loading={loading} onClick={startCheck}>{buttonText}</Button>
        </div>
        <div className="mt-6 sm:mr-8">
          {noDuplicate && (
            <Banner className="text-left" bordered type="success" description="未检测到重复内容" closeIcon={null} />
          )}
          {!noDuplicate && statistics && (
            <div>
              <Banner className="text-left" bordered type="warning" description="检测结果可能存在误差，仅供参考！" closeIcon={null} />
              {Object.keys(statistics).map(item => {
                const count = statistics[item]
                return (
                  <div key={item}>
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
