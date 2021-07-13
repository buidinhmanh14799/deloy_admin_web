import React, { useState,useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "./Card/Card.jsx";
import GridItem from "./Grid/GridItem.jsx";
import GridContainer from "./Grid/GridContainer.jsx";
import CardHeader from "./Card/CardHeader.jsx";
import CardBody from "./Card/CardBody.jsx";
import ProfileForm from './ProfileForm';
import {notification } from "antd";

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
export default function Profile() {
    const classes = useStyles();
   
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <div style={{ display: "flex", }}>
                            <div style={{ flex: 1 }} >
                                <h4 className={classes.cardTitleWhite}>Profile</h4>
                                {/* <p className={classes.cardCategoryWhite}>
                                    
                                </p> */}
                            </div>
                            <div style={{ flex: 1 }}>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <ProfileForm />                
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
