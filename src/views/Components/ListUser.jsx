import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "./Grid/GridItem.jsx";
import GridContainer from "./Grid/GridContainer.jsx";
import Table from "./Table/Table.jsx";
import Card from "./Card/Card.jsx";
import CardHeader from "./Card/CardHeader.jsx";
import CardBody from "./Card/CardBody.jsx";

import Lottie from 'react-lottie';
import loading from '../../animation/loading.json';
// antd library
import { Tag, Space, Button, Modal, Empty } from "antd";
import { getCookie } from '../../controllers/localStorage';

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

const useStyles = makeStyles(styles);

export default function ListUser() {
    const classes = useStyles();
    const [reload, setReload] = React.useState(true)
    const [data, setData] = React.useState([]);
    // input add user admin
    const [isModalVisible, setIsModalVisible] = useState(false); // set is model

    const [isLoad, setLoad] = React.useState(true); // data
    // reload
    const reaLoad = () => {
        getData();
        setReload(!reload);
    }
    // get list user
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
        return await fetch(`${process.env.REACT_APP_API_URL}/users/`, HEADER)
            .then(response => response.json())
            .then(data => {
                let array = data.map(element => {
                    return {
                        id: element.uid,
                        name: element.displayName,
                        email: element.email,
                        status: element.islogin,
                        // expirationDate: element.expirationDate,
                        // package: element.package,
                    }
                })
                setData(array);
                setLoad(false);
            });
    }
    useEffect(() => {
        getData();
    }, [])
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: loading,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <div style={{ display: "flex", }}>
                            <div style={{ flex: 1 }} >
                                <h4 className={classes.cardTitleWhite}>List user</h4>
                                <p className={classes.cardCategoryWhite}>
                                    User management
                                </p>
                            </div>
                            <div style={{ flex: 1 }}>
                            </div>
                        </div>
                    </CardHeader>
                    {isLoad === true ? <CardBody><Lottie options={defaultOptions}
                        height={200}
                        width={200} /></CardBody> : <CardBody>
                        {data.length > 0 ? <Table
                            tableHeaderColor="primary"
                            tableHead={['id', 'name', 'email', 'disabled']}
                            tableData={data}
                            reaLoad={reaLoad}
                        /> : <Empty />}
                    </CardBody>}

                </Card>
            </GridItem>
        </GridContainer>
    );
}
