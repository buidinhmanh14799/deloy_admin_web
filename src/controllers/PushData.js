import { getCookie } from '../../src/controllers/localStorage';
const HEADER = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
    mode: 'no-cors',
    authorization: getCookie().token,
}

export const pushFile = (data, name) => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}/database/${name}/add`, {
            method: 'POST',
            headers: HEADER,
            body: data,
        }).then((data) => {
            resolve(data.json());
        })
    });
}
export const pushOnlinePractice = (data) => {
    // console.log("======>" + JSON.stringify(data));
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}/practiceonline/data`, {
            method: 'POST',
            headers: HEADER,
            body: JSON.stringify(data),
        }).then((data) => {
            resolve(data.json());
        })
    });
}

export const updateFile = (data, name) => {
    // console.log(data)
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}/database/${name}/update`, {
            method: 'PUT',
            headers: HEADER,
            body: data,
        }).then((data) => {
            resolve(data.json());
        })
    });
}
export const removeData = (data) => {
    console.log(typeof data.IDTest)
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}/database/test/delete?IDTest=` + data.IDTest + `&IDYear=` + data.IDYear, {
            method: 'delete',
            headers: HEADER,
            // body: JSON.stringify(
            //     {
            //         IDYear: data.IDYear,
            //         IDTest: data.IDTest
            //     }),
        }).then((data) => {
            resolve(data.json());
        })
    });
}

export const removeDataOnline = (data) => {
    console.log(typeof data.IDTest)
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}/practiceonline/data?IDData=` + data.IDData, {
            method: 'delete',
            headers: HEADER,
        }).then((data) => {
            resolve(data.json());
        })
    });
}