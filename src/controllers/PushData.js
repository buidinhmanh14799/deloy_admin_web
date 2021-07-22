import { getCookie } from '../../src/controllers/localStorage';

export const pushFile = (data, name) => {
    const HEADER = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        mode: 'no-cors',
        authorization: getCookie().token,
    }
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
export const checkTest = (data) => {
    console.log(data);
    const HEADER = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        mode: 'no-cors',
        authorization: getCookie().token,
    }
    // console.log("======>" + JSON.stringify(data));
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}/database/test/check?idtest=${data.IDTest}&idyear=${data.IDYear}`, {
            method: 'GET',
            headers: HEADER
        }).then((data) => {
            resolve(data.json());
        })
    });
}
export const pushOnlinePractice = (data) => {
    const HEADER = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        mode: 'no-cors',
        authorization: getCookie().token,
    }
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
export const pushOnlinePracticejson = (data) => {
    const HEADER = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        mode: 'no-cors',
        authorization: getCookie().token,
    }
    console.log(HEADER);
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}/practiceonline/data_json`, {
            method: 'POST',
            headers: HEADER,
            body: JSON.stringify(data),
        }).then((data) => {
            resolve(data.json());
        })
    });
}


export const updateFile = (data, name) => {
    const HEADER = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        mode: 'no-cors',
        authorization: getCookie().token,
    }
    // console.log(data)
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API_URL}/database/${name}/update`, {
            method: 'PUT',
            headers: HEADER,
            body: data,
        }).then((data) => {
            console.log(data);
            resolve(data.json());
        })
    });
}
export const removeData = (data) => {
    const HEADER = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        mode: 'no-cors',
        authorization: getCookie().token,
    }
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
    const HEADER = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        mode: 'no-cors',
        authorization: getCookie().token,
    }
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