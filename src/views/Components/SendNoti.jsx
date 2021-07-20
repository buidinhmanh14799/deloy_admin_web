import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "./Card/Card.jsx";
import CardHeader from "./Card/CardHeader.jsx";
import CardBody from "./Card/CardBody.jsx";
import "antd/dist/antd.css";
import { Form, Input, Button, Modal } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import { getCookie } from '../../controllers/localStorage';
import axios from 'axios';
const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  }
};

const useStyles = makeStyles(styles);
export default function Notification() {
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const packageBuy = ['orange', 'red', 'blue', 'purple'];

  const HEADER = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
    mode: 'no-cors',
    Authorization: getCookie().token,
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const sendMessage = (values) => {
    fetch(`${process.env.REACT_APP_API_URL}/sendmessage/send/package`, {
      method: 'POST',
      headers: HEADER,
      body: JSON.stringify({
        title: values.Title,
        text: values.Content,
      }),
    }).then(response => response.json()).then((data) => {
      console.log(data)
      if(data.status){
        toast.success(data.messages, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }else{
        toast.error(data.messages, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
     
    })
  }
  const sendVoca = () => {
    fetch(`${process.env.REACT_APP_API_URL}/sendmessage/send/vocarandom`, {
      method: 'POST',
      headers: HEADER,
      body: JSON.stringify({
        title: 'values.Title',
        text: 'values.Content',
      }),
    }).then(response => response.json()).then((data) => {
      console.log(data)
      if(data.status){
        toast.success(data.messages, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }else{
        toast.error(data.messages, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
     
    })
  }
  const onFinish = (values) => {
    sendMessage(values);
    setIsModalVisible(false);
  };
  const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  return (
    <Card>
      <ToastContainer />
      <CardHeader color="primary">
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flex: 1 }}>
            <h4 className={classes.cardTitleWhite}>Send Notification</h4>
          </div>
          <div style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ display: 'flex', padding: 10, flexDirection: 'row' }} >
          <div style={{ flex: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <text style={{ textAlign: 'start', fontSize: 15, color: '#0A81B9' }}>Gửi thông báo giảm giá <text style={{ fontWeight: 'bold', color: 'black' }}>5%</text> cho gói <text style={{ fontWeight: 'bold' }}>BASIC 1</text></text>
          </div>
          <div style={{ flex: 3, justifyContent: 'flex-end', display: 'flex' }}>
            <Button
              onClick={() => {
                sendMessage({ Title: "Thông báo khuyến mãi 😍😍😍", Content: "Giảm giá 5% cho gói BASIC 1" })
              }}
            >Send</Button>
          </div>
        </div>
        <div style={{ borderBottomColor: '#A0ABA6', borderBottomWidth: 1, }} />
        <div style={{ display: 'flex', padding: 10, flexDirection: 'row' }} >
          <div style={{ flex: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <text style={{ textAlign: 'start', fontSize: 15, color: '#0A81B9' }}>Gửi thông báo giảm giá <text style={{ fontWeight: 'bold', color: 'black' }}>5%</text> cho gói <text style={{ fontWeight: 'bold' }}>BASIC 2</text></text>
          </div>
          <div style={{ flex: 3, justifyContent: 'flex-end', display: 'flex' }}>
            <Button
              onClick={() => {
                sendMessage({ Title: "Thông báo khuyến mãi 😍😍😍", Content: "Giảm giá 5% cho gói BASIC 2" })
              }}
            >Send</Button>
          </div>
        </div>
        <div style={{ borderBottomColor: '#A0ABA6', borderBottomWidth: 1, }} />
        <div style={{ display: 'flex', padding: 10, flexDirection: 'row' }} >
          <div style={{ flex: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <text style={{ textAlign: 'start', fontSize: 15, color: '#0A81B9' }}>Gửi thông báo giảm giá <text style={{ fontWeight: 'bold', color: 'black' }}>5%</text> cho gói <text style={{ fontWeight: 'bold' }}>STANDART</text></text>
          </div>
          <div style={{ flex: 3, justifyContent: 'flex-end', display: 'flex' }}>
            <Button
              onClick={() => {
                sendMessage({ Title: "Thông báo khuyến mãi 😍😍😍", Content: "Giảm giá 5% cho gói STANDART" })
              }}
            >Send</Button>
          </div>
        </div>
        <div style={{ borderBottomColor: '#A0ABA6', borderBottomWidth: 1, }} />
        <div style={{ display: 'flex', padding: 10, flexDirection: 'row' }} >
          <div style={{ flex: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <text style={{ textAlign: 'start', fontSize: 15, color: '#0A81B9' }}>Gửi thông báo giảm giá <text style={{ fontWeight: 'bold', color: 'black' }}>5%</text> cho gói <text style={{ fontWeight: 'bold' }}>PREMIUM</text></text>
          </div>
          <div style={{ flex: 3, justifyContent: 'flex-end', display: 'flex' }}>
            <Button
              onClick={() => {
                sendMessage({ Title: "Thông báo khuyến mãi 😍😍😍", Content: "Giảm giá 5% cho gói PREMIUM" })
              }}
            >Send</Button>
          </div>
        </div>
        <div style={{ borderBottomColor: '#A0ABA6', borderBottomWidth: 1, }} />
        <div style={{ display: 'flex', padding: 10, flexDirection: 'row' }} >
          <div style={{ flex: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <text style={{ textAlign: 'start', fontSize: 15, color: '#0A81B9' }}>Tùy chỉnh</text>
          </div>
          <div style={{ flex: 3, justifyContent: 'flex-end', display: 'flex' }}>
            <Button style={{ backgroundColor: '#ab47bc', color: 'white' }} onClick={
              showModal
            }>Custom</Button>
          </div>
        </div>
        <div style={{ display: 'flex', padding: 10, flexDirection: 'row' }} >
          <div style={{ flex: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <text style={{ textAlign: 'start', fontSize: 15, color: '#0A81B9' }}>Gửi ngẩu nhiên 1 từ vựng</text>
          </div>
          <div style={{ flex: 3, justifyContent: 'flex-end', display: 'flex' }}>
            <Button style={{ backgroundColor: '#ab47bc', color: 'white' }}
              onClick={() => {
                sendVoca();
              }}
            >Send</Button>
          </div>
        </div>
        <Modal  destroyOnClose={true} title="Custom" visible={isModalVisible} footer={null} onCancel={handleCancel}>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
              name={'Title'}
              label="Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={'Content'} label="Content">
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </CardBody>
    </Card>
  );
}
