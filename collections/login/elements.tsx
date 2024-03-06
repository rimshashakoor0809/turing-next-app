"use client"
import styled from "styled-components";
import {Card} from "antd"
import { Wrapper } from "@/styles/global.styled";

export const LoginWrapper = styled(Wrapper)`
width: 100%;
display: flex;
align-items: center;
justify-items: center;
background-color:"#F9FAFB";
flex-direction: column;
padding-block: 5%;
gap: 1rem;
`

export const CustomCard = styled(Card)`
width: 320px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
padding-inline: 5px;
padding-block: 10px;
`

export const CustomForm = styled.form`
margin-block: 10px;
display: flex;
flex-direction: column;
gap: 12px;
`