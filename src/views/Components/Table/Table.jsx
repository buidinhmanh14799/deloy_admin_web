import React, { useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
// dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { element } from "prop-types";
import { getCookie } from '../../../controllers/localStorage';

const useStyles = makeStyles(styles);
export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, reaLoad } = props;
  const [data, setData] = React.useState([]);;
  const [open, setOpen] = React.useState(false);  // open dialog
  const [id, setID] = React.useState('');  // id user
  const [value, setValue] = React.useState(''); //item vua chon
  const handleClickOpen = (item) => { // set id user, open dialog
    setValue(item);
    setID(item[0]);
    setOpen(true);
  };
  const HEADER = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
    mode: 'no-cors',
    authorization: getCookie().token,
  };
  const deleteUser = async () => {
    return await fetch(`${process.env.REACT_APP_API_URL}/users/disable/${value.id}`, {
      method: 'PUT',
      headers: HEADER,
    }).then(() => {
      reaLoad();
    });
  }
  const enableUser = async () => {
    return await fetch(`${process.env.REACT_APP_API_URL}/users/enable/${value.id}`, {
      method: 'PUT',
      headers: HEADER,
    }).then(() => {
      reaLoad();
    });
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    //console.log(value.id);
    if (value.status) {
      deleteUser();
    } else enableUser();
    setOpen(false);
  }
  useEffect(() => {
    setData(tableData);
    return () => {
    }
  }, [tableData])
  return (
    <div className={classes.tableResponsive}>

      <Dialog // dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{value.status === "true" ? "Bạn có chắc chắc disable user không" : "Bạn có chắc chắn enable user không?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary"
            onClick={() =>
              handleClose()
            }>
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus
            onClick={() =>
              handleAgree()
            }>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead?.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
              <TableCell
                className={classes.tableCell + " " + classes.tableHeadCell}>
                {'option'}
              </TableCell>
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {data?.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow} style={{}}>
                {Object.values(prop)?.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key} >
                      {prop?.toString()}
                    </TableCell>
                  );
                })}
                <div>

                  <TableCell style={{ color: 'red' }}
                    onClick={() => handleClickOpen(prop)}>
                    {prop.status ? 'disable' : 'enable'}
                  </TableCell>
                </div>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};
CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
