import React, { useState, useEffect } from "react";
import { getCookie } from '../../controllers/localStorage';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "./Card/Card.jsx";
import CardHeader from "./Card/CardHeader.jsx";
import CardBody from "./Card/CardBody.jsx";
import XLSX from 'xlsx';
import UploadFileView from './UploadFileView/excel';
import UploadFileViewJson from './UploadFileView/json';
import "antd/dist/antd.css";
import { Table, Tag, Select, Space, Button, Modal, notification, Form, Input, DatePicker } from "antd";
import moment from "moment";
// api up data
import { pushOnlinePracticejson, updateFile, pushOnlinePractice, removeDataOnline } from '../../controllers/PushData';
import { element } from "prop-types";
import { ToastContainer, toast } from 'react-toastify';

import Lottie from 'react-lottie';
import loadingAnimation from '../../animation/loading.json';
import fs from 'fs';
import { PanoramaFishEye } from "@material-ui/icons";
import fullTest from '../../assests/full.json';
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
let datasetFile = [{
  "name": "jayanth",
  "data": "scd",
  "abc": "sdef"
}]


let content = [
  {
    name: 'part1',
    title: 'Up load data part 1'
  },
  {
    name: 'part2',
    title: 'Up load data part 2'
  },
  {
    name: 'part3',
    title: 'Up load data part 3'
  },
  {
    name: 'part4',
    title: 'Up load data part 4'
  },
  {
    name: 'part5',
    title: 'Up load data part 5'
  },
  {
    name: 'part6',
    title: 'Up load data part 6'
  },
  {
    name: 'part7',
    title: 'Up load data part 7'
  },
  {
    name: 'part3detail',
    title: 'Up load data part 3 detail'
  },
  {
    name: 'part4detail',
    title: 'Up load data part 4 detail'
  },
  {
    name: 'part6detail',
    title: 'Up load data part 6 detail'
  },
  {
    name: 'part7detail',
    title: 'Up load data part 7 detail'
  }

]
export default function PracticeOnline(props) {
  const { setDataNotification } = props;
  const classes = useStyles();
  const [loadingEdit, setLoadingEdit] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [isModalVisibleJS, setIsModalVisibleJS] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectUpdate, setSelectUpdate] = React.useState(''); // select part current
  const [valueUpdate, setvalueUpdate] = React.useState('');
  const [nameModal, setNameModal] = useState('Add');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = React.useState([]);
  const [visibleEdit, setVisibleEdit] = React.useState(false);  // load model edit
  const [visibleDelete, setVisibleDelete] = React.useState(false);  // load model edit
  // const [dataCurrent, setDataCurrent] = React.useState([]); // data current
  const [isLoad, setLoad] = React.useState(true);
  const { Option } = Select;
  // columns
  const columns = [

    {
      title: "Title",
      dataIndex: "Title",
      key: "Name"
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "date",
      dataIndex: "Date",
      key: "Buy"
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ width: 70, display: 'flex', paddingRight: 5 }}>
          {/* <Button type="primary"
            onClick={() => {

              setNameModal('Update Data');
              setVisibleEdit(true);
            }}
          >Update</Button> */}
          <Button style={{ marginLeft: 10 }} type="primary"
            onClick={() => {
              setVisibleDelete(true);
            }}>Delete</Button>
        </div>
      ),
    },
  ];

  // get test
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
    return await fetch(`${process.env.REACT_APP_API_URL}/practiceonline/list`, HEADER)
      .then(response => response.json())
      .then(data => {
        let array = data.data?.map(element => {
          var date = new Date(element.time);
          var d = new Date();
          var n = d.getTime();
          var status = '---';
          if (element.time > n + 7200000) {
            status = 'comming';
          } else if (element.time + 7200000 - n >= 0) {
            status = 'just now';
          } else {
            status = 'closed';
          }
          return {
            IDData: element.idData,
            Buy: element.Buy,
            status: status,
            Date: date.toLocaleDateString(),
            Title: element.title,
          }
        })
        array.sort(function (a, b) {
          return a.IDTest - b.IDTest;
        });
        setData(array);
        setLoad(false);
      });
  }
  // name and data post database
  const dataUpload = {
    dataPart1: [],
    dataPart2: [],
    dataPart3: [],
    dataPart4: [],
    dataPart5: [],
    dataPart6: [],
    dataPart7: [],
    dataPart3Detail: [],
    dataPart4Detail: [],
    dataPart6Detail: [],
    dataPart7Detail: [],
  }
  let dataJson = {};

  // convert excel to json
  const UploadFile = (e) => {
    // console.log(e);
    return new Promise((resolve, reject) => {
      let selectedFile = e.target.files[0];
      XLSX.utils.json_to_sheet(datasetFile, selectedFile.name);
      if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
          let data = event.target.result;
          let workbook = XLSX.read(data, { type: "binary" });
          // console.log(workbook);
          workbook.SheetNames.forEach(sheet => {
            let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
            let result = JSON.stringify(rowObject, undefined, 4);
            resolve(result);
          });
        }
      }
    });
  }

  // set file 
  const uploadFile = async (e, name) => {
    switch (name) {
      case 'part1': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart1 = data;
          })
        break;
      }
      case 'part2': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart2 = data;
          })
        break;
      } case 'part3': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart3 = data;
          })
        break;
      }
      case 'part4': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart4 = data;
          })
        break;
      }
      case 'part5': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart5 = data;
          })
        break;
      }
      case 'part6': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart6 = data;
          })
        break;
      } case 'part7': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart7 = data;
          })
        break;
      }
      case 'part3detail': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart3Detail = data;
          })
        break;
      }
      case 'part4detail': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart4Detail = data;
          })
        break;
      }
      case 'part6detail': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart6Detail = data;
          })
        break;
      }
      case 'part7detail': {
        UploadFile(e)
          .then((data) => {
            dataUpload.dataPart7Detail = data;
          })
        break;
      }
    }
  }
  // check data upload
  const checkDataUpload = () => {
    for (const property in dataUpload) {
      if (property.length === 0) {
        return false;
      }
    }
    return true;
  }
  const updateData = async () => {
    let res = [];
    await updateFile(dataUpdate, selectUpdate)
      .then(data => {
        updateFile(JSON.stringify({ IDYear: valueUpdate.IDYear, IDTest: valueUpdate.IDTest }), 'test')
          .then(data => {
            console.log(data);
          })
        res.push({
          content: `Update data ${selectUpdate} success`,
          date: moment().format('YYYY/MM/DD'),
          status: true
        })
      }).catch((error) => {
        res.push({
          content: `Update data ${selectUpdate} fail`,
          date: moment().format('YYYY/MM/DD'),
          status: false
        })
      });
    setDataNotification(res);
    setVisibleEdit(false);
    setLoadingEdit(false);
  }
  // push data firebase
  const pushData = async () => {
    let res = [];
    await pushOnlinePractice(dataUpload).then(data => {
      console.log('=======>',data);
      if (data.status===true) {
        res.push({
          content: `Add data success`,
          date: moment().format('YYYY/MM/DD'),
          status: data.status
        })
        toast.success('Add data success!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        res.push({
          content: `Add data fail`,
          date: moment().format('YYYY/MM/DD'),
          status: data.status
        })
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
    });
    // set data notification
    setDataNotification(res);
    setLoading(false); // set loadding
    setIsModalVisible(false);
    getData();
  }

  const pushDataJson = async () => {
    let res = [];
    await pushOnlinePracticejson(dataJson).then(data => {
      console.log(data);
      if (data.status===true) {
        res.push({
          content: `Add data success`,
          date: moment().format('YYYY/MM/DD'),
          status: data.status
        })
        toast.success('Add data success!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        res.push({
          content: `Add data fail`,
          date: moment().format('YYYY/MM/DD'),
          status: data.status
        })
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
    });
    // set data notification
    setDataNotification(res);
    setLoading(false); // set loadding
    setIsModalVisibleJS(false);
    getData();
  }

  // notification
  const openNotification = () => {
    const args = {
      message: 'Thông báo!!',
      description:
        'Vui lòng thêm đầy đủ các phần!!!',
      duration: 0,
    };
    notification.open(args);
  };
  // show add 
  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModalJS = () => {
    setIsModalVisibleJS(true);
  };
  const handleOk = () => {
    if (checkDataUpload) {
      setLoading(true);
      pushData();
    }
    else {
      openNotification();
    }
  };
  const handleOkJson = (values) => {
    dataJson.title = values.title;
    dataJson.decription = values.decription;

    var date = new Date(values.time);
    dataJson.time = date.getTime();
    console.log('oke');
    if (checkDataUpload) {
      setLoading(true);
      pushDataJson();
    }
    else {
      openNotification();
    }
  };
  const handleCancel = () => {
    if (!loading) {
      setIsModalVisibleJS(false);
      setIsModalVisible(false);
    }
  };
  // select file
  const selectFile = async (e, name) => {
    UploadFile(e)
      .then((data) => {
        setDataUpdate(data);
      })
  }
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 15,
    },
  };
  // edit test
  const handleOkEdit = () => {
    if (dataUpdate !== '') {
      updateData();
    } else {
      const args = {
        message: 'Thông báo!!',
        description:
          'Vui lòng chọn file!!!',
        duration: 0,
      };
      notification.open(args);
    }
    setLoadingEdit(true);


  };
  // cancel edit
  const handleCancelEdit = () => {
    setVisibleEdit(false);
    setLoadingEdit(false);
  };

  // delete test
  const handleOkDelete = async () => {
    let res = [];
    setLoadingDelete(true);
    await removeDataOnline(valueUpdate)
      .then(data => {
        res.push({
          content: `Remove data test ${valueUpdate.IDData} success`,
          date: moment().format('YYYY/MM/DD'),
          status: true
        })

      }).catch(() => {
        res.push({
          content: `Remove data ${valueUpdate.IDData} fail`,
          date: moment().format('YYYY/MM/DD'),
          status: false
        })
      })
    setLoadingDelete(false);
    setVisibleDelete(false);
    setDataNotification(res);
    getData();
  };
  // cancel delete test
  const handleCancelDelete = () => {
    setVisibleDelete(false);
    setLoadingDelete(false);
  };

  const onFinish = (values) => {
    dataUpload.title = values.title;
    dataUpload.decription = values.decription;

    var date = new Date(values.time);
    dataUpload.time = date.getTime();
    if (checkDataUpload) {
      setLoading(true);
      pushData();
    }
    else {
      openNotification();
    }
    // setIsModalVisible(false);

  };
  // change select  
  function onChangeSelect(value) {
    setSelectUpdate(value);
  }

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  function disabledDateTime() {
    return {
      // disabledHours: () => range(0, 24).splice(4, 20),
      // disabledMinutes: () => range(30, 60),
      // disabledSeconds: () => [55, 56],
    };
  }

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
  useEffect(() => {
    getData();
  }, [])
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <Card>
      <CardHeader color="primary">
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flex: 1 }}>
            <h4 className={classes.cardTitleWhite}>Up load data</h4>
          </div>
          <div style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
            <Button type="primary" shape="circle" onClick={
              () => {
                setNameModal('Add Data');
                showModal();
              }} >
              +
            </Button>
            {/* <Button type="primary" shape="circle" onClick={
              () => {
                setNameModal('Add Data');
                showModalJS();
              }} >
              *
            </Button> */}
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Modal
          destroyOnClose={true}
          visible={isModalVisible}
          title={nameModal}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
          ]}
        >
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={'title'} label="Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={'decription'} label="Decription" rules={[
              {
                required: true,
              },
            ]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'time'} label="Time" rules={[
              {
                required: true,
              },
            ]}>
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                // disabledDate={disabledDate}
                // disabledTime={disabledDateTime}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
            </Form.Item>

            {
              content.map((element) =>
                <UploadFileView
                  uploadFile={uploadFile}
                  name={element.name}
                  title={element.title} />
              )
            }

            <Form.Item >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>

        </Modal>


        <Modal
          title="Edit"
          visible={visibleEdit}
          onOk={handleOkEdit}
          confirmLoading={loadingEdit}
          onCancel={handleCancelEdit}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <text style={{ marginRight: 10 }}>Chọn mục:</text>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select"
                optionFilterProp="children"
                onChange={onChangeSelect}
                // onFocus={onFocus}
                // onBlur={onBlur}
                //onSearch={onSearch}
                filterOption={(input, option) =>
                  // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  console.log(input)
                }
              >
                {content.map((element) =>
                  <Option value={element.name}>{element.title}</Option>
                )}
              </Select>
            </div>
            <div style={{ flex: 1, marginTop: 20, paddingLeft: 75 }}>
              <input type='file' name='file' id="input" accept=".xls,.xlsx"
                onChange={(e) => selectFile(e, selectUpdate)} />
            </div>
          </div>
        </Modal>
        <Modal
          destroyOnClose={true}
          visible={isModalVisibleJS}
          title={nameModal}
          onCancel={() => {
            setIsModalVisibleJS(false)
          }}
          footer={[
          ]}
        >
          <Form {...layout} name="nest-messages" onFinish={handleOkJson} validateMessages={validateMessages}>
            <Form.Item name={'title'} label="Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={'decription'} label="Decription" rules={[
              {
                required: true,
              },
            ]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item name={'time'} label="Time" rules={[
              {
                required: true,
              },
            ]}>
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                // disabledDate={disabledDate}
                // disabledTime={disabledDateTime}
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
            </Form.Item>
            <UploadFileViewJson
              uploadFile={() => {
                dataJson = fullTest;
              }

              } />

            <Form.Item >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>

        </Modal>
        <Modal
          destroyOnClose={true}
          title="Thông báo"
          visible={visibleDelete}
          onOk={handleOkDelete}
          // confirmLoading={loadingDelete}
          onCancel={handleCancelDelete}
        >
          <p>Bạn có chắc chắn muốn xóa đề {valueUpdate.IDData} không?</p>
        </Modal>
        {isLoad === true ? <Lottie options={defaultOptions}
          height={200}
          width={200} /> : <Table
          columns={columns}
          dataSource={data}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setvalueUpdate(record)
              },
            };
          }}
        />}

      </CardBody>
      <ToastContainer />
    </Card>
  );
}
