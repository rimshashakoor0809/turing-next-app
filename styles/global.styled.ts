"use client"
import { FlexDirectionProps } from "@/types";
import { Button } from "antd";
import Text from 'antd/es/typography/Paragraph'
import styled from "styled-components";


export const Wrapper = styled.div`
height: 100vh;
max-width: 100%;
`

export const SpinnerWrapper = styled.div<{ fullScreen: boolean }>`
  height: ${props => props.fullScreen ? '100vh' : '100%'} ;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const FlexCenter = styled.div`
display:flex;
justify-items: center;
align-items: center;
`

export const FlexBetween = styled.div`
display:flex;
justify-items: space-between;
align-items: center;
`

export const FlexColumn = styled.div`
display:flex;
flex-direction: column;
`

export const FlexRow = styled.div`
display:flex;
flex-direction: row;
`

export const FlexDirection = styled.div<FlexDirectionProps>`
  display: flex;
  flex-direction: ${props => props.direction};
  gap: ${props => props.gap}; // Interpolate the gap prop
`;

export const StyledText = styled(Text) <{ color: string }>`
color:${props => props.color};
`;

export const Message = styled.div<{ color: string }>`
padding: 1rem;
width: 100%;
border: 1px solid red;
`;

export const StyledButton = styled(Button) <{ bgColor:string, color: string }>`
color:${props => props.color};
background-color:${props => props.bgColor};
`;

