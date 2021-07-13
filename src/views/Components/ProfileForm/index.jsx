import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../../../controllers/localStorage';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  notification,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { set } from 'js-cookie';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const get = async () => {
  return new Promise((resolve) => {
    let user = getLocalStorage('user');
    resolve(JSON.parse(user));
  })
}
const ProfileForm = () => {
  const [form] = Form.useForm();
  const [dataAdmin, setDataAdmin] = useState({});
  useEffect(() => {
    const func = async () => {
      get().then(data=>{
        form.setFieldsValue({
          name: data.name,
          email: data.email,
          phone: data.phonenumber,
          username: 'admin',
          prefix: "84",
        });
      })
    }
    func();
}, []);

// update profile
const updateProfile = async (values) => {
  return new Promise((resolve, reject) => {
    fetch(`https://toeic-seb.herokuapp.com/admin/update/${values.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        mode: 'no-cors'
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.confirm,
        phone: values.phone
      }),
    }).then((data) => {
      resolve(data.json);
    })
  });
}
const handleOk = (values) => {
  updateProfile(values)
    .then(data => {
      if (data.status) {
        openNotification('Update thông tin thành công.');
      }
      else {
        openNotification('Update thông tin thất bại!!');
      }
    });
};
const openNotification = (content) => {
  const args = {
    message: 'Thông báo!!',
    description: content,
    duration: 0,
  };
  notification.open(args);
};
const onFinish = (values) => {
  handleOk(values);
};
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option key="84" value="84">+84</Option>
      <Option key="86" value="86">+86</Option>
      <Option key="89" value="89">+89</Option>
    </Select>
  </Form.Item>
);
return (
  <Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    //initialValues={dataAdmin}
    scrollToFirstError
    style={{ width: 1000 }}
  >
    <Form.Item
      name="email"
      label="E-mail"
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    {console.log(dataAdmin)}
    <Form.Item
      name="username"
      label={
        <span>
          UserName&nbsp;
            <Tooltip title="What do you want others to call you?">
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      }
      rules={[
        {
          required: true,
          message: 'Please input your nickname!',
          whitespace: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="password"
      label="Password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
      hasFeedback
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      name="confirm"
      label="Confirm Password"
      dependencies={['password']}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      name="phone"
      label="Phone Number"
      rules={[
        {
          required: true,
          message: 'Please input your phone number!',
        },
      ]}
    >
      <Input
        addonBefore={prefixSelector}
        style={{
          width: '100%',
        }}
      />
    </Form.Item>
    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        Update
        </Button>
    </Form.Item>
  </Form>
);
};

export default ProfileForm