"use client"
import { AutoComplete, Layout } from "antd";
import Text from 'antd/es/typography/Paragraph'
import { Content, Header } from "antd/es/layout/layout";
import styled from "styled-components";

export const DashboardWrapper = styled(Layout)`
width: 100%;
display: flex;
align-items: center;
justify-items: center;
`

export const CustomHeader = styled(Header)`
box-shadow: 2px 2px 5px #565656;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
padding-inline: 4rem;
padding-block: 2rem;
background-color: white;
overflow-y: hidden;
border-bottom: 1px solid #ccc;

/* For screens smaller than 768px */
@media (max-width: 767px) {
  flex-wrap: wrap;
  padding-inline: 1rem;
  padding-block: 1rem;
  height: 120px;
  gap: 5px;
  justify-content: center;
}

`
export const CustomContent = styled(Content)`
width: 100%;
background: white;
padding: 2rem;

`

export const CustomText = styled(Text)`
font-size: 16px;
font-weight: 600;
text-align: center;
color: #565656;
`