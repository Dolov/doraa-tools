import React, { FC } from 'react'
import { Upload, Button } from '@douyinfe/semi-ui';
import { UploadProps, OnChangeProps } from '@douyinfe/semi-ui/lib/cjs/upload';
import { IconUpload } from '@douyinfe/semi-icons';
import classnames from 'classnames'
import Detail from './Detail'
import Empty from './Empty'
import Icon from '../components/Icon'


export interface WordDuplicateProps {

}

const WordDuplicate: FC<WordDuplicateProps> = (props) => {
	const { } = props

	const [files, setFiles] = React.useState<OnChangeProps["fileList"]>([])
	
	const [fileId, setFileId] = React.useState<string>()

	const onPreviewClick: UploadProps["onPreviewClick"] = fileItem => {
		setFileId(fileItem.uid)
	}

	const onChange: UploadProps["onChange"] = fileInfo => {
		const { fileList } = fileInfo
		setFiles(fileList)
	}

  const file = React.useMemo(() => {
		return files.find(item => item.uid === fileId)
	}, [fileId, files])

	const getUploadNode = (children: React.ReactNode) => {
		return (
			<Upload
				multiple
				action="https://file.clickapaas.com/api/upload"
				accept=".docx"
				fileName='file'
				data={{ dirPath: "word-duplicate" }}
				onChange={onChange}
				fileList={files}
				className='cloumn-upload'
				onPreviewClick={onPreviewClick}
			>
				{children}
			</Upload>
		)
	}


	const emptyButton = getUploadNode(
		<Button>
			<div className="flex items-center">
				<Icon type="word" size={56} />
				<span className="ml-2">暂无文件，立刻上传？</span>
			</div>
		</Button>
	)

  const hasFile = files.length > 0

	return (
		<div className='flex flex-1 p-6 overflow-auto'>
			<div className="w-64">
				{getUploadNode(
					<Button type="primary" icon={<IconUpload />} theme="light">
						点击上传 word 文件
					</Button>
				)}
			</div>
			<div className={classnames("w-full", {"hidden": hasFile})}>
				<Empty description={emptyButton} />	
			</div>
			{hasFile && (
        <div className="flex flex-1">
          <Detail file={file} />
        </div>
      )}
		</div>
	)
}

export default WordDuplicate
