import { AddNoteModalProps } from '@/types';
import { Button, Form, Input, Layout, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CallDetails from './CallDetails';
import { getCallWithId, updateNote } from '@/actions';


const AddNoteModal: React.FC<AddNoteModalProps> = ({ visible, onClose, record }) => {
  const [callDetails, setCallDetails] = useState<any>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();



  const handleSubmit = async () => {
      const values = await form.validateFields();
    const { note } = values;
    setPending(true)
    const data = await updateNote(record?.id, { content: note })
    console.log("Update data ::::::::" , data)
    setPending(false)
    if (!data?.id) {
         messageApi.open({
        type: 'error',
        content: `${data?.message}`,
         });
        return;
    }
        setPending(false)
      form.resetFields();
      messageApi.open({
        type: 'success',
        content: 'Note added successfully.',
      });

  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Add Note"
        open={visible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit} disabled={pending}>
            Submit
          </Button>,
        ]}
      >

        <CallDetails record={record} />
        <Form form={form}>
          <Form.Item
            name="note"
            label="Note"
            rules={[{ required: true, message: 'Please input your note!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddNoteModal