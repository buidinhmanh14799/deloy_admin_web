import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Menu, Badge, Avatar, Popover } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UploadOutlined,
  BellOutlined,
  NotificationOutlined,
  ProfileOutlined
} from '@ant-design/icons';

// auth
import { ToastContainer } from 'react-toastify';
import { isAuth, getCookie, signout } from '../controllers/localStorage';
import axios from 'axios';
// view updata
import UpData from './Components/UploadData';
import Practice from './Components/PracticeOnline';
// view list user
import ListUser from './Components/ListUser';
// view list user admin
import ListUserAdmin from './Components/ListUserAdmin';
// import components notfication
import Noti from './Components/Noti';
import Notification from './Components/SendNoti';
import Profile from './Components/Profile'
const { Header, Sider, Content } = Layout; // views
const Home = ({ history }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [index, setIndex] = useState(1);
  const [dataNoti, setDataNoti] = useState([]);
  const [amountNoti, setAmountNoti] = useState(0);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleNoti, setVisibleNoti] = useState(false);
  const [title, setTitle] = useState(true);
  const toggle = () => {
    setTitle(!title);
    setCollapsed(!collapsed);
  };
  const checkIAuth = () => {
    if (!isAuth()) {
      history.push('/Login')
    }
  }
  useEffect(() => {
    checkIAuth();
  }, [])
  // logout
  const Logout = () => {
    signout(() => {
      history.push('/Login')
    });
  }
  // set change logout
  const handleVisibleChange = visible => {
    setVisible(visible);
  };
  // set click notifi
  const handleVisibleChangeNoti = visible => {
    setVisibleNoti(visible);
    setAmountNoti(0);
  };
  // push datanoti
  const pushDataNoti = (data) => {
    return new Promise((resolve, reject) => {
      dataNoti.forEach(element => {
        data.push(element);
      });
      resolve(data);
    });
  }
  // set data notifi
  const setDataNotification = (data) => {
    setAmountNoti(data.length);
    pushDataNoti(data).then(res => {
      setDataNoti(res);
    });
  }
  // set view noti
  const viewNoti = () => {
    return (
      <div style={{ overflowY: 'scroll', height: 200 }} >
        {
          dataNoti.map((element) =>
            <Noti
              content={element.content}
              date={element.date}
              status={element.status} />
          )
        }
      </div>
    )
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {title ? <div className="logo" style={{ justifyContent: 'center', display: 'flex', }}>
          <h4 style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>TOEIC SEB</h4>
        </div> : null}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<TeamOutlined />} onClick={() => {
            setIndex(1);
            checkIAuth();
          }} >
            Admin
            </Menu.Item>
          <Menu.Item key="2" icon={<ProfileOutlined />} onClick={() => {
            setIndex(2);
            checkIAuth();
          }} >
            Practice Online
            </Menu.Item>
          <Menu.Item key="3" icon={<UsergroupAddOutlined />} onClick={() => {
            setIndex(3);
            checkIAuth();
          }}>
            User
            </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />} onClick={() => {
            setIndex(4);
            checkIAuth();
          }}>
            Data
            </Menu.Item>
          <Menu.Item key="5" icon={<NotificationOutlined />} onClick={() => {
            setIndex(5);
            checkIAuth();
          }}>
            Send notification
            </Menu.Item>
          {/* <Menu.Item key="6" icon={<ProfileOutlined />} onClick={() => {
            setIndex(6);
            checkIAuth();
          }}>
            Profile
            </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, display: 'flex' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 30, marginLeft: 20 }}>
            <div style={{ width: 100, display: 'flex' }}>
              <div style={{ width: 150, flex: 1 }}>
                <Popover
                  placement="leftTop"
                  content={
                    viewNoti
                  }
                  title="All notification"
                  trigger="click"
                  visible={visibleNoti}
                  onVisibleChange={handleVisibleChangeNoti}
                >
                  <Badge count={amountNoti}>
                    <Avatar icon={<BellOutlined />} />
                  </Badge>
                </Popover>
              </div>
              <div style={{ width: 100, flex: 1 }}>
                <Popover
                  content={<a onClick={Logout}>Logout</a>}
                  title="Option"
                  trigger="click"
                  visible={visible}
                  onVisibleChange={handleVisibleChange}
                >
                  <Avatar icon={<UserOutlined />} />
                </Popover>
              </div>
            </div>
          </div>
        </Header>
        <div style={{ padding: 10 }}>
          {
            index === 1 ? <ListUserAdmin />
              : index === 2 ? <Practice setDataNotification={(setDataNotification)} />
                : index === 3 ? <ListUser />
                  : index === 4 ? <UpData setDataNotification={(setDataNotification)} />
                    : index === 5 ? <Notification></Notification>
                      : <Profile />
          }
        </div>
      </Layout>
    </Layout>
  );
}
export default Home
