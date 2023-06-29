
export const prefixCls = 'doraa'


export const copy = (text: string) => {
  // 创建一个临时textarea元素并将文本节点的值赋给它
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = text

  // 将临时textarea元素添加到DOM中
  document.body.appendChild(tempTextarea);

  // 选中临时textarea元素中的文本
  tempTextarea.select();

  // 执行复制命令
  document.execCommand('copy');

  // 移除临时textarea元素
  document.body.removeChild(tempTextarea);
}