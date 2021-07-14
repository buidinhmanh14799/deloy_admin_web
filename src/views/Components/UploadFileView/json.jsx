import React from "react";
const UploadFile = (props) => {
    const { uploadFile} = props;
    return (
        <div style={{ display: 'flex', borderRadius: 1, height: 100 }}>
            <div style={{ flex:1, marginLeft: 10, }}>
                <input type='file' name='file' id="input" accept=".json" onChange={(e) => uploadFile(e)} />
            </div>
        </div>
    )
}
export default UploadFile