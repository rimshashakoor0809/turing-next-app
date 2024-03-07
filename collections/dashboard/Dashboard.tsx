"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {  Button, Flex, Select} from 'antd'
import Title from 'antd/es/typography/Title'
import { CustomTable } from '@/components'
import { getCalls, removeCookies } from '@/actions'
import { DataType } from '@/types'
import { CustomContent, CustomHeader, CustomText, DashboardWrapper } from './elements'
import { useRouter } from 'next/navigation'


const Dashboard = () => {
  
  const [pending, setPending] = useState<boolean>(false)
  const [calls, setCalls] = useState<DataType>([]);
  const [totalCalls, setTotalCalls] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [status, setStatus] = useState<string>("")
  const router = useRouter()

   
  
  useEffect(() => {
    fetchCalls();
  }, [currentPage, pageSize]); // Fetch data when page or page size changes

  const fetchCalls = async () => {
    setPending(true)
    try {
      const offset = (currentPage - 1) * pageSize; // Calculate offset
      const response = await getCalls(offset, pageSize);
      console.log("response:::::", response)
      setPending(false)
      if (response) {
        setTotalCalls(response?.totalCount);
        setCalls(response?.nodes);
      }
    } catch (error) {
      setPending(false)
      console.error('Error fetching calls:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current: number, size: number) => {
    setPageSize(size);
  };

  const logout = () => {
    removeCookies()
    router.push("/login")
  }
  return (
    <DashboardWrapper>
      <CustomHeader>
        <Image src='/TTLogo.png' width={300} height={35} alt='Logo' />
        <Button size='large' type="primary" onClick={logout}>Sign Out</Button>
      </CustomHeader>
      <CustomContent>
        <Title level={3}>Turing Technologies Frontend Test</Title>

        {/* filter */}
        <Flex align="center" gap={"middle"} justify="space-between" horizontal>
          <CustomText>Filter By: </CustomText>
          <Select
            placeholder="Select a status"
            optionFilterProp="children"
            onChange={(value: string) => {
              console.log(`selected ${value}`)
              setStatus(value)
              }}
            options={[
              {
                value: 'all',
                label: 'All',
              },
              {
                value: "Archived",
                label: 'Archived',
              },
              {
                value: "Unarchived",
                label: 'Unarchived',
              },
            ]}
          />
        </Flex>
          <CustomTable calls={calls} currentPage={currentPage} pageSize={pageSize} totalCalls={totalCalls} handlePageChange={handlePageChange} handlePageSizeChange={handlePageSizeChange} status={status} fetchCalls={fetchCalls} loading={pending} />

      </CustomContent>
    </DashboardWrapper>
  )
}

export default Dashboard