import React from 'react'
// @ts-ignore
import ToolPageLayout from '@theme/ToolPageLayout'

interface Props {
  title?: string
  children: React.ReactNode
}

const ToolPage = ({ title = '', children }: Props): React.JSX.Element => {
  return <ToolPageLayout title={title}>{children}</ToolPageLayout>
}

export default ToolPage
