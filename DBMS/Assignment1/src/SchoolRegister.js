import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    maxHeight: 440,
  },
}));
export default function SchoolRegister() {
  const classes = useStyles();
  const departments = [
    { deptcode: 1, deptname: "CSE" },
    { deptcode: 2, deptname: "IT" },
    { deptcode: 3, deptname: "FTB" },
    { deptcode: 4, deptname: "ECE" },
    { deptcode: 5, deptname: "MECH" },
    { deptcode: 6, deptname: "CIVIL" },
  ];
  const [studentDetails, setStudentDetails] = React.useState([
    {
      roll: 1,
      name: "Sarvajit Kumar",
      deptcode: 1,
      phone: "7667833787",
      address: "Motihari,Bihar",
    },
  ]);
  const handleGenClose = () => {
    setGenOpen(false);
    setGenRoll("");
    setGenName("");
    setGenAddress("");
    setGenDeptCode("");
    setGenPhone("");
  };
  const handleGenSearch = () => {
    if (genRoll === "") {
      alert("Roll field required");
      return;
    }
    studentDetails.map((student) => {
      if (student.roll === parseInt(genRoll)) {
        setGenName(student.name);
        setGenAddress(student.address);
        setGenDeptCode(student.deptcode);
        setGenPhone(student.phone);
      }
    });
  };
  const handleAddSave = () => {
    if (addRoll === "") {
      alert("Roll is empty");
      return;
    }
    if (addName === "") {
      alert("Name is empty");
      return;
    }
    if (addDeptCode === "") {
      alert("Department Code is empty");
      return;
    }
    var unique = true;
    studentDetails.map((student) => {
      if (student.roll === parseInt(addRoll)) {
        unique = false;
      }
    });
    if (unique === true) {
      var students = studentDetails;
      students.push({
        roll: parseInt(addRoll),
        name: addName,
        deptcode: addDeptCode,
        phone: addPhone,
        address: addAddress,
      });
      setStudentDetails(students);
      setAddName("");
      setAddPhone("");
      setAddDeptCode("");
      setAddAddress("");
      setAddRoll("");
      setOpenAdd(false);
      console.log(studentDetails);
    } else {
      alert("Roll already exists");
    }
  };
  const handleAddClose = () => {
    setOpenAdd(false);
  };
  const handleGenDelete = () => {
    if (genRoll === "") {
      alert("Roll field required");
      return;
    }
    var updatedStudentDetails = studentDetails.filter(function (item) {
      return item.roll !== genRoll;
    });
    setStudentDetails(updatedStudentDetails);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleGenUpdate = () => {
    var updatedStudentDetails = studentDetails;
    updatedStudentDetails.forEach((student) => {
      if (student.roll === parseInt(genRoll)) {
        student.address = genAddress;
        student.deptcode = genDeptCode;
        student.name = genName;
        student.phone = genPhone;
      }
    });
    setStudentDetails(studentDetails);
    handleGenClose();
  };
  //other jobs
  const [typeModal, setTypeModal] = React.useState("Edit");
  const [genName, setGenName] = React.useState("");
  const [genPhone, setGenPhone] = React.useState("");
  const [genRoll, setGenRoll] = React.useState("");
  const [genAddress, setGenAddress] = React.useState("");
  const [genDeptCode, setGenDeptCode] = React.useState("");
  const [genOpen, setGenOpen] = React.useState(false);
  // add item
  const [openAdd, setOpenAdd] = React.useState(false);
  const [addName, setAddName] = React.useState("");
  const [addPhone, setAddPhone] = React.useState("");
  const [addRoll, setAddRoll] = React.useState("");
  const [addAddress, setAddAddress] = React.useState("");
  const [addDeptCode, setAddDeptCode] = React.useState("");
  //table show
  const columns = [
    { id: "roll", label: "Roll No." },
    { id: "name", label: "Name" },
    { id: "phone", label: "Phone" },
    { id: "deptcode", label: "Department" },
    { id: "address", label: "Address" },
  ];
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Register Manager
          </Typography>
          <Button
            style={{ margin: 5 }}
            variant="outlined"
            color="inherit"
            onClick={() => setOpenAdd(true)}
          >
            Add
          </Button>
          <Button
            style={{ margin: 5 }}
            variant="outlined"
            color="inherit"
            onClick={() => {
              setTypeModal("Edit");
              setGenOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            style={{ margin: 5 }}
            variant="outlined"
            color="inherit"
            onClick={() => {
              setTypeModal("Search");
              setGenOpen(true);
            }}
          >
            Search
          </Button>
          <Button
            style={{ margin: 5 }}
            variant="outlined"
            color="inherit"
            onClick={() => {
              setTypeModal("Delete");
              setGenOpen(true);
            }}
          >
            Delete
          </Button>
        </Toolbar>
      </AppBar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openAdd}
        onClose={handleAddClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAdd}>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Roll"
                  type="number"
                  variant="outlined"
                  value={addRoll}
                  onChange={(e) => setAddRoll(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  value={addPhone}
                  onChange={(e) => setAddPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addDeptCode}
                    onChange={(e) => setAddDeptCode(e.target.value)}
                  >
                    {departments.map((dept) => (
                      <MenuItem value={dept.deptcode}>{dept.deptname}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  value={addAddress}
                  onChange={(e) => setAddAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddSave}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAddClose}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={genOpen}
        onClose={handleGenClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={genOpen}>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Roll"
                  type="number"
                  variant="outlined"
                  value={genRoll}
                  onChange={(e) => setGenRoll(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGenSearch}
                >
                  Search
                </Button>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled={typeModal !== "Edit"}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={genName}
                  onChange={(e) => setGenName(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled={typeModal !== "Edit"}
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  value={genPhone}
                  onChange={(e) => setGenPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    disabled={typeModal !== "Edit"}
                    value={genDeptCode}
                    onChange={(e) => setGenDeptCode(e.target.value)}
                  >
                    {departments.map((dept) => (
                      <MenuItem value={dept.deptcode}>{dept.deptname}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled={typeModal !== "Edit"}
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  value={genAddress}
                  onChange={(e) => setGenAddress(e.target.value)}
                />
              </Grid>

              <Grid item xs={3}>
                {typeModal === "Edit" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenUpdate}
                  >
                    Update
                  </Button>
                ) : typeModal === "Delete" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGenDelete}
                  >
                    Delete
                  </Button>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleGenClose}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
      <Grid container spacing={2} style={{ marginTop: 40 }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Paper>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentDetails
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={studentDetails.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}
