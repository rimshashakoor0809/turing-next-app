"use client"
import React, { useState } from 'react'
import { Button, Flex, Popconfirm, Table, TableProps, message } from 'antd'
import AddNoteModal from './AddNoteModal';
// import { data } from '@/constants';
import Text from 'antd/es/typography/Paragraph'
import { CustomTableProps, DataType } from '@/types';
import { convertSecondsToMinutesAndSeconds } from '@/utils';
import { StyledButton, StyledText } from '@/styles/global.styled';
import { updateStatus } from '@/actions';



const CustomTable: React.FC<CustomTableProps> = ({ calls, totalCalls, pageSize, currentPage, handlePageChange, handlePageSizeChange, status, fetchCalls, loading }) => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
  const [pending, setPending] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage();

  const data = status
    ? calls.filter(call => {
      if (status === 'Archived') {
        return call.is_archived === true;
      } else if (status === 'Unarchived') {
        return call.is_archived === false;
      } else {
        return true;
      }
    })
    : calls;


  const handleOpenModal = (record: any) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleUpdateData = async (record) => {
    console.log("Status Record ::: ", record)
    setPending(true)
    const { id, is_archived } = record;
    const updatedStatus = !is_archived;
    console.log("Updated Status Record ::: ", updatedStatus)
    const payload = { is_archived: updatedStatus };
    console.log("Updated Payload ::: ", payload)
    const data = await updateStatus(id, payload);
    console.log("Status Data :::: ", data);
    if (!data?.id) {
      messageApi.open({
        type: 'error',
        content: `${data?.message}`,
      });
      return;
    }
    setPending(false)
    fetchCalls()
    messageApi.open({
      type: 'success',
      content: 'Status updated successfully.',
    });

  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Call Type',
      dataIndex: 'call_type',
      key: 'call_type',
      render: (_, record) => {
        let typeColor: string = "";
        let call: string = "";
        if (record.call_type === "answered") {
          call = "Answered"
          typeColor = "#13c2c2"
        } else if (record.call_type === "voicemail") {
          call = "Voice Mail"
          typeColor = "blue"
        } else if (record.call_type === "missed") {
          call = "Missed"
          typeColor = "red"
        }
        return (
          <StyledText color={typeColor}>{call}</StyledText>
        )
      }

      ,
    },
    {
      title: 'Direction',
      dataIndex: 'direction',
      key: 'direction',
      render: (_, record) => {
        return (
          <Text style={{ color: "blue" }}>{record.direction.charAt(0).toUpperCase() + record.direction.slice(1, record.direction.length)}</Text>
        )
      }
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (_, record) => {
        return (
          <Flex vertical>
            <Text>{convertSecondsToMinutesAndSeconds(record?.duration)}</Text>
            <StyledText color="blue">{`( ${record.duration} seconds)`}</StyledText>
          </Flex>
        )
      }
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Via',
      dataIndex: 'via',
      key: 'via',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record, index) => {
        let callStatus: string = ""
        let bgColor: string = ""
        let color: string = ""
        if (record.is_archived) {
          callStatus = "Archived"
          bgColor = "#d9d9d9"
          color = "gray"
        } else {
          callStatus = "Unarchived"
          bgColor = "#e6fffb"
          color = "#13c2c2"

        }
        return (
          <StyledButton
            type="primary"
            bgColor={bgColor}
            color={color}
            onClick={() => handleUpdateData(record)}
          >
            {callStatus}
          </StyledButton>
        );
      }
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => {
        const dateObject: Date = new Date(record.created_at);
        const dateOnlyString: string = dateObject.toISOString().split('T')[0];
        return (
          <Text>{dateOnlyString}</Text>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleOpenModal(record)}>Add Note</Button>
          <AddNoteModal visible={modalVisible} onClose={handleCloseModal} record={selectedRecord} />
        </>

      ),
    },
  ];


  return (
    <>
      <Table
      loading={loading} 
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalCalls,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '50', '100', '1000'],
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
        }}
      />

    </>
  )
}

export default CustomTable