"use client"
import React, { useState } from 'react'
import { Button, Flex, Input, message } from 'antd'
import { CustomCard, CustomForm, LoginWrapper } from './elements'
import Title from 'antd/es/typography/Title';
import Image from 'next/image';
import { login } from '@/actions';
import { redirect, useRouter } from 'next/navigation';

type FieldType = {
  username: string;
  password: string;
};

const Login = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [pending, setPending] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter()
  // async function loginHandler(formData : FormData) {
  //   "use server"
  //   const data = {
  //     username : formData.get("username") as string ,
  //     password : formData.get("password") as string
  //   }
  //   const { access_token } = await login(data);
  //   if (access_token) {
  //     console.log("Successful :", access_token)
  //     redirect("/")
  //   }

  // }

  const loginHandler = async (e) => {
    e.preventDefault()
    setPending(true)
    console.log("Data : ", username, password)
    const data = await login({ username, password })
    if (!data?.user) {
      setPending(false)
      console.log("Error :: ", data)
      // messageApi.open({
      //   type: 'error',
      //   content: `${data?.message}`,
      // });
      return;
    }
    setPending(false)
    router.push("/")
      // messageApi.open({
      //   type: 'success',
      //   content: 'Login successfully.',
      // });
  }

  return (
    <LoginWrapper>
      <Image src="/TTLogo.png" width={250} height={35} alt="logo"/>
      <CustomCard>
        <Title level={3}>Sign in to the account</Title>
        <CustomForm onSubmit={loginHandler}>
          <Flex vertical gap="middle">
            <p>Username</p>
            <Input
              name="username"
              id="username"
              placeholder="John Doe"
              size="large"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </Flex>

          <Flex vertical gap="middle">
            <p>Password</p>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              size="large"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Flex>
          <Button size="large" type="primary" htmlType="submit" disabled={pending}>Sign in</Button>
        </CustomForm>
      </CustomCard>
     
    </LoginWrapper>
  )
}

export default Login