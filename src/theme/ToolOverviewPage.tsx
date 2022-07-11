// @ts-ignore
import React from 'react'
import { Tools } from '../types'
// @ts-ignore
import ToolPageLayout from '@theme/ToolPageLayout'

interface Props {
  tools: Tools
}

const ToolOverviewPage = ({ tools }: Props): JSX.Element => {
  return (
    <ToolPageLayout title="Tools">
      <ul>
        {tools.map(({ name, slug }) => (
          <li key={slug}>
            <a href={`/tools/${slug}`}>{name}</a>
          </li>
        ))}
      </ul>
    </ToolPageLayout>
  )
}

export default ToolOverviewPage
