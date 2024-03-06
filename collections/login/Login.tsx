
import React from 'react'
import { Button, Flex, Input } from 'antd'
import { CustomCard, CustomForm, LoginWrapper } from './elements'
import Title from 'antd/es/typography/Title';
import Image from 'next/image';
import { login } from '@/actions';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { Message } from '@/styles/global.styled';
import { redirect } from 'next/navigation';

type FieldType = {
  username: string;
  password: string;
};

const Login = () => {
  async function loginHandler(formData : FormData) {
    "use server"
    const data = {
      username : formData.get("username") as string ,
      password : formData.get("password") as string
    }
    const { access_token } = await login(data);
    if (access_token) {
      console.log("Successful :", access_token)
      redirect("/")
    }

  }

  return (
    <LoginWrapper>
      <Image src="/TTLogo.png" width={250} height={35} alt="logo"/>
      <CustomCard>
        <Title level={3}>Sign in to the account</Title>
        <CustomForm action={loginHandler}>
          <Flex vertical gap="middle">
            <p>Username</p>
            <Input name="username" id="username" placeholder="john doe" size="large"/>
          </Flex>

          <Flex vertical gap="middle">
            <p>Password</p>
            <Input type="password" name="password" id="password" placeholder="********" size="large"/>
          </Flex>
          <Button size="large" type="primary" htmlType="submit">Sign in</Button>
        </CustomForm>
      </CustomCard>
     
    </LoginWrapper>
  )
}

export default Login