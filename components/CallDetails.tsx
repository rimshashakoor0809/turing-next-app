"use client"
import { Divider, Flex, Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Text from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import { DataType } from '@/types'
import { StyledText } from '@/styles/global.styled'


const StyledContent = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 1rem;
`;


const CallDetails : React.FC<{record : DataType}> = ({ record }) => {
  // console.log("Call details ", record)
 
  const formattedData = [  
    {
      title: "Call Type",
      value: `${record.call_type}`,
      color:`${record.call_type === "answered" ? "#13c2c2" : record.call_type === "missed" ? "red" : record.call_type === "voicemail" && "blue"}`,
    },
    {
      title: "Duration",
      value: `${record.duration}`,
      color: "black",
      
    },
    {
      title: "From",
      value: `${record.from}`,
      color: "black",
    },
    {
      title: "To",
      value: `${record.to}`,
      color: "black",
    },
    {
      title: "Via",
      value: `${record.via}`,
      color: "black",
    },



  ]
  return (
    <StyledContent>
      {/* call id */}
      <Flex gap="middle" horizontal>
        <StyledText color="blue">Call ID</StyledText>
        <StyledText color="blue">{record.id}</StyledText>
      </Flex>
      {/* divider */}
      <Divider />
      {/* data */}

      <Flex vertical gap="small">
        {formattedData.map((item : {title :string , value : string, color:string}, index) => {
          return (
            <Flex horizontal key={index} justify="space-between" align="center">
              <Title level={5}>{item.title}</Title>
              <StyledText color={item.color}>{item.value.charAt(0).toUpperCase() + item.value.slice(1, item.value.length)}</StyledText>
            </Flex>
          )
        })}
      </Flex>
    </StyledContent>
  )
}

export default CallDetails