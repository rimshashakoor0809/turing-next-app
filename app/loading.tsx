import { SpinnerWrapper, Wrapper } from '@/styles/global.styled'
import { Flex, Spin } from 'antd'
import React from 'react'

const Spinner = ({fullScreen = true}) => {
  return (
    <SpinnerWrapper fullScreen={fullScreen}>
      <Spin size="large" />
    </SpinnerWrapper>
  )
}

export default Spinner