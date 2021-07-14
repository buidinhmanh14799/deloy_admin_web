import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "./Card/Card.jsx";
import CardHeader from "./Card/CardHeader.jsx";
import CardBody from "./Card/CardBody.jsx";
import "antd/dist/antd.css";
import { Table, Button, Modal, notification } from "antd";
import { getCookie, signout1 } from '../../controllers/localStorage';
import Lottie from 'react-lottie';

import loading from '../../animation/loading.json';

import AddAdminForm from './AddAdminForm';
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
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);


export default function UploadData() {

  const classes = useStyles();
  const [visibleEdit, setVisibleEdit] = React.useState(false);  // load model edit admin
  const [isModalVisible, setIsModalVisible] = useState(false); // load model add admin
  const [loadingAdd, setLoadingAdd] = React.useState(false);
  const [loadingEdit, setLoadingEdit] = React.useState(false);
  const [adminCurrent, setAdminCurrent] = React.useState([]); // admin current
  const [modalText, setModalText] = React.useState('Bạn có chắc chắn muốn disable admin không?'); // model edit admin
  const [reload, setReload] = React.useState(true) // reload
  const [data, setData] = React.useState([]); // data
  const [isLoad, setLoad] = React.useState(true); // data
  // input add user admin

  // get list admin
  const getData = async () => {
    const HEADER = {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        mode: 'no-cors',
        authorization: getCookie().token,
      },
    };
    console.log('=====>', getCookie().token);
    return await fetch(`${process.env.REACT_APP_API_URL}/users/admin`, HEADER)
      .then(response => response.json())
      .then(dataget => {
        console.log('sdasdasdasd--->', dataget);
        if (dataget.status) {
          let array = dataget.data.map(element => {
            return {
              id: element.id,
              name: element.displayName,
              email: element.email,
              status: element.status?.toString(),
            }
          })
          setLoad(false);
          setData(array);
        } else {
          signout1();
        }

      });
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    },
  ];
  useEffect(() => {
    getData();
  }, [reload])

  // show modal admin
  const showModal = () => {
    setIsModalVisible(true);
  };
  // ok add admin
  const handleOk = (values) => {
    signUp(values)
      .then(data => {
        if (data.status === true) {
          openNotification(data.messages);
          setReload(!reload);
        }
        else {
          openNotification(data.messages);
        }
      });
    setIsModalVisible(false);
  };
  // notication add admin
  const openNotification = (content) => {
    const args = {
      message: 'Thông báo!!',
      description: content,
      duration: 0,
    };
    notification.open(args);
  };
  // cancel admin
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // add admin
  const signUp = async (values) => {
    return new Promise((resolve, reject) => {
      const HEADER = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        mode: 'no-cors',
        authorization: getCookie().token,
      };
      fetch(`${process.env.REACT_APP_API_URL}/users/admin`, {
        method: 'POST',
        headers: HEADER,
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.confirm,
          phone: values.phone
        }),
      }).then(response => response.json())
        .then((data) => {
          resolve(data);
        }).catch((erro) => { reject('erro') })
    });
  }
  // api edit admin
  const editAdmin = async () => {
    let query = `${process.env.REACT_APP_API_URL}/users/admin_disable/${adminCurrent.id}`;
    if (adminCurrent.status === 'false') {
      query = `${process.env.REACT_APP_API_URL}/users/admin_enable/${adminCurrent.id}`;
    }
    return new Promise((resolve, reject) => {
      fetch(query, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",
          mode: 'no-cors',
          authorization: getCookie().token,
        },
        body: JSON.stringify({
        }),
      }).then((data) => {
        setLoadingEdit(false);
        setReload(!reload);
        resolve(data);
      })
    });
  }
  // edit admin
  const handleOkEdit = () => {
    setLoadingEdit(true);
    editAdmin();
    setVisibleEdit(false);
  };
  // cancel edit
  const handleCancelEdit = () => {
    setVisibleEdit(false);
    setLoadingEdit(false);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <Card>
      <CardHeader color="primary">
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flex: 1 }}>
            <h4 className={classes.cardTitleWhite}>List admin</h4>
          </div>
          <div style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
            <Button onClick={
              showModal
            } type="primary" >Add admin</Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Modal title="Add data" visible={isModalVisible} confirmLoading={loadingAdd} footer={null} onCancel={handleCancel}>
          <AddAdminForm handleOk={handleOk} />
        </Modal>
        <Modal
          destroyOnClose={true}
          title="Thông báo"
          visible={visibleEdit}
          onOk={handleOkEdit}
          confirmLoading={loadingEdit}
          onCancel={handleCancelEdit}
        >
          <p>{modalText}</p>
        </Modal>
        {isLoad === true ? <Lottie options={defaultOptions}
          height={200}
          width={200} /> : <Table
          columns={columns}
          dataSource={data}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: event => {
                setAdminCurrent(data[rowIndex]);
                if (data[rowIndex].status === "true") {
                  setModalText('Bạn có chắc chắn muốn disable admin không?');
                } else {
                  setModalText('Bạn có chắc chắn muốn enable admin không?');
                }
                setVisibleEdit(true);
              }, // double click row           
            };
          }}
        />}

      </CardBody>
    </Card>
  );
}
