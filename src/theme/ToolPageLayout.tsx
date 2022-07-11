// @ts-ignore
import React from 'react'
import cx from 'classnames'
import { ReactNodeLike } from 'prop-types'
// @ts-ignore
import Layout from '@theme/Layout'
// @ts-ignore
import styles from './ToolPageLayout.module.css'

interface Props {
  children: ReactNodeLike
  title?: string
  wide?: boolean
}

const ToolPageLayout = ({ children, title = '', wide = false }: Props): JSX.Element => {
  return (
    <Layout wrapperClassName={cx(styles.layout, { [styles.wide]: wide })}>
      {title && <h1>{title}</h1>}
      {children}
    </Layout>
  )
}

export default ToolPageLayout
