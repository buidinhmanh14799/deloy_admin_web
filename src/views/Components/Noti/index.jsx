import React from "react";
import {
    CheckOutlined ,
    CloseOutlined
} from '@ant-design/icons';
const Notification = (props) => {
    const { content, date,status } = props;
    return (
        <div style={{ width: 250, boxShadow: "0.5px 1px 0.5px 0.5px #D7DCDA", borderRadius: 5, padding: 3 }}>
            <div style={{ flex: 1, display: 'flex',alignItems: 'center',  }}>
                <div style={{ flex: 1, marginLeft: 10,display:'flex' }}>
                    {status?<CheckOutlined  style={{fontSize: '13px', color: '#4CAF50' }}/>:
                        <CloseOutlined  style={{fontSize: '13px', color: 'red' }}/>
                    }
                    
                </div>
                <div style={{ flex: 1, marginLeft: 10,display:'flex',justifyContent:'flex-end',paddingTop:5,marginTop:5 }}>
                    <p style={{ fontSize: 10,}}>{date}</p>
                </div>          
            </div>
            <div style={{ flex: 7, marginLeft: 10, }}>
                <p>{content}</p>
            </div>
        </div>
    )
}
export default Notification