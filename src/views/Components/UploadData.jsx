import React, { useState, useEffect } from "react";
import { getCookie } from '../../controllers/localStorage';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "./Card/Card.jsx";
import CardHeader from "./Card/CardHeader.jsx";
import CardBody from "./Card/CardBody.jsx";
import XLSX from 'xlsx';
import UploadFileView from './UploadFileView/index.jsx';
import "antd/dist/antd.css";
import { Table, Tag, Select, Space, Button, Modal, notification } from "antd";
import moment from "moment";
import Lottie from 'react-lottie';
import loadingAnimation from '../../animation/loading.json';
// api up data
import { pushFile, removeData, updateFile,checkTest } from '../../controllers/PushData';
import { element } from "prop-types";
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
  },
  {
    name: 'test',
    title: 'Up load data test'
  },

]
export default function UploadData(props) {
  const { setDataNotification } = props;
  const classes = useStyles();
  const [loadingEdit, setLoadingEdit] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);

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
      title: "Name",
      dataIndex: "Name",
      key: "Name"
    },
    {
      title: "IDYear",
      dataIndex: "IDYear",
      key: "IDYear"
    },
    {
      title: "IDTest",
      dataIndex: "IDTest",
      key: "IDTest"
    },
    {
      title: "Buy",
      dataIndex: "Buy",
      key: "Buy"
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ width: 70, display: 'flex', paddingRight: 5 }}>
          <Button type="primary"
            onClick={() => {

              setNameModal('Update Data');
              setVisibleEdit(true);
            }}
          >Update</Button>
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
    return await fetch(`${process.env.REACT_APP_API_URL}/database/test/`, HEADER)
      .then(response => response.json())
      .then(data => {
        let array = data.map(element => {
          return {
            Buy: element.Buy,
            IDTest: element.IDTest,
            IDYear: element.IDYear,
            Name: element.Name,
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
    part1: [],
    part2: [],
    part3: [],
    part4: [],
    part5: [],
    part6: [],
    part7: [],
    part3detail: [],
    part4detail: [],
    part6detail: [],
    part7detail: [],
    test: [],
  }

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
    console.log(e);
    switch (name) {
      case 'part1': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part1 = data;
          })
        break;
      }
      case 'part2': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part2 = data;
          })
        break;
      } case 'part3': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part3 = data;
          })
        break;
      }
      case 'part4': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part4 = data;
          })
        break;
      }
      case 'part5': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part5 = data;
          })
        break;
      }
      case 'part6': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part6 = data;
          })
        break;
      } case 'part7': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part7 = data;
          })
        break;
      }
      case 'part3detail': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part3detail = data;
          })
        break;
      }
      case 'part4detail': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part4detail = data;
          })
        break;
      }
      case 'part6detail': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part6detail = data;
          })
        break;
      }
      case 'part7detail': {
        UploadFile(e)
          .then((data) => {
            dataUpload.part7detail = data;
          })
        break;
      }
      case 'test': {
        UploadFile(e)
          .then((data) => {
            dataUpload.test = data;
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
        updateFile(JSON.stringify({ IDYear: valueUpdate.IDYear, IDTest: valueUpdate.IDTest }), selectUpdate)
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
    await checkTest(dataUpload.test).then(async(data)=>{
      console.log(data);
      if (data.status) {
        for (const property in dataUpload) {
          await pushFile(dataUpload[property], property)
            .then(data => {
              if (data.status) {
                res.push({
                  content: `Add data ${property} success`,
                  date: moment().format('YYYY/MM/DD'),
                  status: data.status
                })
              }
              else {
                res.push({
                  content: `Add data ${property} fail`,
                  date: moment().format('YYYY/MM/DD'),
                  status: data.status
                })
              }
            });
        };
        // set data notification
        setDataNotification(res);
        setLoading(false); // set loadding
        setIsModalVisible(false);
      } else {
        res.push({
          content: data.messages,
          date: moment().format('YYYY/MM/DD'),
          status: data.status
        })
        setLoading(false); // set loadding
      }
    })
  
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
  const handleOk = () => {
    if (checkDataUpload) {
      setLoading(true);
      pushData();
    }
    else {
      openNotification();
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // select file
  const selectFile = async (e, name) => {
    console.log(e);
    UploadFile(e)
      .then((data) => {
        setDataUpdate(data);
      })
  }
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
    await removeData(valueUpdate)
      .then(data => {
        res.push({
          content: `Remove data test ${valueUpdate.IDTest} year ${valueUpdate.IDYear} success`,
          date: moment().format('YYYY/MM/DD'),
          status: true
        })

      }).catch(() => {
        res.push({
          content: `Remove data ${valueUpdate.IDTest} year ${valueUpdate.IDYear} fail`,
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
  // change select  
  function onChangeSelect(value) {
    console.log(value);
    setSelectUpdate(value);
  }
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
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Up load
            </Button>,
          ]}
        >
          {
            content.map((element) =>
              <UploadFileView
                uploadFile={uploadFile}
                name={element.name}
                title={element.title} />
            )
          }
        </Modal>
        <Modal
          destroyOnClose={true}
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
          title="Thông báo"
          visible={visibleDelete}
          onOk={handleOkDelete}
          confirmLoading={loadingDelete}
          onCancel={handleCancelDelete}
        >
          <p>Bạn có chắc chắn muốn xóa đề {valueUpdate.IDTest} năm {valueUpdate.IDYear} không?</p>
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
    </Card>
  );
}
