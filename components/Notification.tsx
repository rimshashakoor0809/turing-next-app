import { Message } from '@/styles/global.styled'
import { CheckCircleTwoTone, ExclamationCircleOutlined } from '@ant-design/icons'
import { Flex } from 'antd'
import React from 'react'

const Notification: React.Fc<{ type: string, message: string }> = ({ type, message }) => {
  return (
    <Message color="red">
      <Flex gap="middle" horizontal>
        {type === "success" ? <CheckCircleTwoTone twoToneColor="#52c41a" />
          : <ExclamationCircleOutlined twoToneColor="#e46038" />}
      </Flex>
    </Message>
  )
}

export default Notification