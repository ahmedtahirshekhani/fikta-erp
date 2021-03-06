import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/table.css";
import axios from "axios";
import { new_data } from "../store/action";
import { Link } from "react-router-dom";
import { Button, Modal, Row, Col } from "react-bootstrap";
import moment from "moment";
import fb from "../config/firebase";

class Ticket extends Component {
  constructor(props) {
    super(props);
    const firebase = fb.firebase_;
    let prop = this.props;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //console.log(user)
      } else {
        prop.history.push("/dataentry");
      }
    });
  }

  getProductDetails = (ind) => {
    return (
      <div>
        <div>
          <strong>Product:</strong> {this.props.i.design_name[ind]}{" "}
        </div>
        <div>
          <span style={{ marginLeft: "10px" }}>
            <strong>Color:</strong> {this.props.i.color[ind]}{" "}
          </span>{" "}
          <span>
            <strong>Size:</strong> {this.props.i.size[ind]}{" "}
          </span>
        </div>
      </div>
    );
  };
  render() {
    console.log(this.props.i);

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirmation Message
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <strong>Name:</strong> {this.props.i.name}
            </div>
            <div>
              <strong>Address:</strong> {this.props.i.address}
            </div>
            <div>
              <strong>Contact no:</strong> {this.props.i.phone}
            </div>
            <div>
              <strong>Cust_ID:</strong> {this.props.i.cust_id}
            </div>
            {this.props.i.design_name.map((v, i) => {
              return this.getProductDetails(i);
            })}
            <br />
            <div style={{ borderTop: "1px solid", borderBottom: "1px solid" }}>
              <strong>Total Amount:</strong> {this.props.i.amount}{" "}
            </div>
            <br />
            <div>
              <strong>Remarks:</strong>
              <div>
                <div>
                  We Are Own Manufacturers And Provide Best Quality To The
                  Customers So Due To This You Will Get Your Parcel In 10 To 15
                  Working Days Inshallah
                </div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Thanks for connecting FIKRA</strong>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-primary"
            onClick={() => {
              //console.log(this.props)
              //this.setState({reason:""})
              this.props.onHide();
            }}
          >
            Close
          </Button>
          {/* onClick={this.props.onHide} */}
        </Modal.Footer>
      </Modal>
    );
  }
}
class ViewLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/viewlog.php?id=" + this.props.id
      )
      .then((response) => {
        this.setState({ data: response.data });
        //console.log("Check",response.data)
      })
      .catch((err) => console.log("Error", err));
  }
  getLog = () => {
    console.log(this.state.data[0]["status_date"]);
    let list = [];
    this.state.data[0]["status_date"].map((v, i) => {
      list.push(
        <div>
          <div
            style={{
              background: "blue",
              color: "white",
              width: "40%",
              padding: "10px",
            }}
          >
            {v.st}
          </div>
          <div style={{ padding: "10px" }}>
            <strong>On: </strong>
            {v.date}
          </div>
        </div>
      );
    });
    return list;
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Log of Order: {this.props.s}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{this.state.data.length > 0 ? this.getLog() : ""}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-primary"
            onClick={() => {
              //console.log(this.props)
              //this.setState({reason:""})
              this.props.onHide();
            }}
          >
            Close
          </Button>
          {/* onClick={this.props.onHide} */}
        </Modal.Footer>
      </Modal>
    );
  }
}

class MyVerticallyCenteredModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: "",
      reasonErr: "",
    };
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Data of S.No {this.props.s}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Reason:</h4>
          <p>
            <textarea
              required
              placeholder="Share any reason!"
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ reason: e.target.value })}
              value={this.state.reason}
            />
            <span style={{ color: "red", fontSize: "10px" }}>
              {this.state.reasonErr}
            </span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-danger"
            onClick={() => {
              if (this.state.reason != "") {
                this.props.sendReason(this.state.reason);
                this.setState({ reason: "" });
                this.props.onHide();
              } else {
                this.setState({ reasonErr: "Reason is compulsory" });
              }
            }}
          >
            Delete
          </Button>
          <Button
            className="btn-primary"
            onClick={() => {
              //console.log(this.props)
              this.setState({ reason: "" });
              this.props.onHide();
            }}
          >
            Close
          </Button>
          {/* onClick={this.props.onHide} */}
        </Modal.Footer>
      </Modal>
    );
  }
}

class EditDelete extends Component {
  constructor(props) {
    super(props);
    this.s_num = 0;
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2);
    this.state = {
      render1: false,
      neworders: [],
      modalShow: false,
      logShow: false,
      s: 0,
      i: 0,
      del_reason: "",
      time: Date.now(),
      showDate: "",
      selectedDate: date,
      d: "",
      id: 0,
      showTicket: false,
      consignmentSearch: "",
      showData: false,
      showConsignmentSearch: false,
      showNameSearch: false,
      showPhoneSearch: false,
      nameSearch: "",
      phoneSearch: 0,
      consignmentSearch: "",
      searchby: "",
    };
  }

  updateDelete = (k, e, date) => {
    axios
      .post(
        "https://meatncuts.com.pk/phpfiles/api/delete.php?id=" +
          this.state.neworders[k]["ord_id"] +
          "&reason=" +
          e +
          "&date=" +
          this.state.neworders[k]["date"],
        true
      )
      .then(
        this.setState({
          render1: true,
        })
      )
      .catch();
  };

  getTimeDifference = (sys_date, sql_date) => {
    var now = moment(sys_date);
    var then = moment(sql_date);
    var ms = moment(now, "YYYY-MM-DD HH:mm:ss").diff(
      moment(then, "YYYY-MM-DD HH:mm:ss")
    );
    let hr = Math.floor(ms / 3600000);
    let mins = Math.floor((ms - hr * 3600000) / 60000);
    let sec = Math.floor((ms - hr * 3600000 - mins * 60000) / 1000);
    let str = "";
    if (hr <= 47 && mins <= 59) {
      let rem_hr = Math.floor(48 - ms / 3600000);
      let rem_mins = Math.floor((48 - ms / 3600000 - rem_hr) * 60);
      let rem_sec = Math.floor(
        ((48 - ms / 3600000 - rem_hr) * 60 - rem_mins) * 60
      );
      if (rem_hr < 0) {
        str = "";
      } else {
        if (rem_mins != 0) {
          str = "rem: " + rem_hr + " hr " + rem_mins + " mins ";
        } else {
          str = "";
        }
      }
    } else {
      str = "";
    }
    return str;
  };

  getStatus = (k) => {
    let list = [];
    if (this.state.neworders[k]["status"] == "Booked") {
      list.push(
        <option selected value="Booked">
          Booked
        </option>
      );
      list.push(<option value="In Process">In Process</option>);
      list.push(<option value="Dispatched">Dispatched</option>);
      list.push(<option value="Return">Return</option>);
      list.push(<option value="Delivered">Delivered</option>);
    } else if (this.state.neworders[k]["status"] == "In Process") {
      list.push(<option value="Booked">Booked</option>);
      list.push(
        <option selected value="In Process">
          In Process
        </option>
      );
      list.push(<option value="Dispatched">Dispatched</option>);
      list.push(<option value="Return">Return</option>);
      list.push(<option value="Delivered">Delivered</option>);
    } else if (this.state.neworders[k]["status"] == "Dispatched") {
      list.push(<option value="Booked">Booked</option>);
      list.push(<option value="In Process">In Process</option>);
      list.push(
        <option selected value="Dispatched">
          Dispatched
        </option>
      );
      list.push(<option value="Return">Return</option>);
      list.push(<option value="Delivered">Delivered</option>);
    } else if (this.state.neworders[k]["status"] == "Return") {
      list.push(<option value="Booked">Booked</option>);
      list.push(<option value="In Process">In Process</option>);
      list.push(<option value="Dispatched">Dispatched</option>);
      list.push(
        <option selected value="Return">
          Return
        </option>
      );
      list.push(<option value="Delivered">Delivered</option>);
    } else if (this.state.neworders[k]["status"] == "Delivered") {
      list.push(<option value="Booked">Booked</option>);
      list.push(<option value="In Process">In Process</option>);
      list.push(<option value="Dispatched">Dispatched</option>);
      list.push(<option value="Return">Return</option>);
      list.push(
        <option selected value="Delivered">
          Delivered
        </option>
      );
    }

    return list;
  };

  changeStatus = (e, k) => {
    //console.log(this.state.neworders[k]['ord_id'], e)
    axios
      .get(
        "https://meatncuts.com.pk/phpfiles/api/edit_status.php?id=" +
          this.state.neworders[k]["ord_id"] +
          "&status=" +
          e +
          "&date=" +
          this.state.neworders[k]["date"]
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  selectedData = (i, k, keyName) => {
    if (i == 0) {
      return <td key={i}>{this.state.neworders[k]["only_date"]}</td>;
    } else {
      let temp = "";
      if (keyName == "color" || keyName == "size" || keyName == "design_name") {
        let arr = this.state.neworders[k][keyName];
        //let n =arr.length
        if (arr != null) {
          let x = this.state.neworders[k][keyName][0];
          if (arr.length > 1) {
            //console.log("keyName", keyName, k)
            for (let index = 1; index < arr.length; index++) {
              x = x + ", " + this.state.neworders[k][keyName][index];
            }
          }
          temp = x;
          //console.log("Arr", arr.length, keyName)
        } else {
          if (arr != null) {
            temp = this.state.neworders[k][keyName][0];
          }
        }
        return <td key={i}>{temp}</td>;
      }
      if (
        keyName == "status" &&
        this.state.neworders[k]["status"] != "Deleted"
      ) {
        return (
          <div style={{ marginTop: "20px" }}>
            <select
              onChange={(e) => this.changeStatus(e.target.value, k)}
              style={{ width: "100%" }}
            >
              {this.getStatus(k)}
            </select>
          </div>
        );
      } else if (
        keyName == "status" &&
        this.state.neworders[k]["status"] == "Deleted"
      ) {
        return (
          <td key={i}>
            {this.state.neworders[k][keyName]}
            <br />
            <strong>Reason: </strong>
            {this.state.neworders[k]["reason"]}
          </td>
        );
      }

      if (
        keyName != "reason" &&
        keyName != "ord_id" &&
        keyName != "delete_ord" &&
        keyName != "date" &&
        keyName != "only_time" &&
        keyName != "only_date" &&
        keyName != "status" &&
        keyName != "reason"
      ) {
        return <td key={i}>{this.state.neworders[k][keyName]}</td>;
      }
    }
  };

  getEdit = (e) => {
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    let time = this.getTimeDifference(date, e["date"]);
    if (time != "") {
      return (
        <Link to={"/dataentry/edit/" + e["ord_id"]}>
          <button className="btn-dark btn-xs">Edit</button>
        </Link>
      );
    } else {
      return (
        <button className="btn btn-dark" disabled>
          Edit
        </button>
      );
    }
  };
  row = (k) => {
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    if (this.state.neworders[k]["delete_ord"] == "1") {
      return (
        <tr style={{ background: "#ffcccb" }} key={k}>
          <td>-</td>
          {Object.keys(this.state.neworders[k]).map((keyName, i) => {
            return this.selectedData(i, k, keyName);
          })}
          <td></td>
          <td></td>
        </tr>
      );
    } else {
      this.s_num = this.s_num + 1;
      let x = this.s_num;
      return (
        <tr key={k}>
          <td>{this.s_num}</td>
          {Object.keys(this.state.neworders[k]).map((keyName, i) => {
            return this.selectedData(i, k, keyName);
          })}

          <td>
            <button
              className="btn-primary btn-xs"
              style={{ marginBottom: "15px" }}
              onClick={() => {
                this.setState({
                  logShow: true,
                  s: x,
                  id: this.state.neworders[k]["ord_id"],
                });
              }}
            >
              View Log
            </button>
            <br />
            {this.getEdit(this.state.neworders[k])}
            <br />
            <span>
              {this.getTimeDifference(date, this.state.neworders[k]["date"])}
            </span>
          </td>
          <td>
            <button
              className="btn-primary btn-xs"
              style={{ marginBottom: "15px" }}
              onClick={() => {
                this.setState({ showTicket: true, i: k });
                //this.setState({logShow:true, s:x, id:this.state.neworders[k]['ord_id']})
              }}
            >
              Get Ticket
            </button>
            <br />

            <button
              onClick={() => {
                this.setState({
                  modalShow: true,
                  s: x,
                  i: k,
                  d: this.state.neworders[k]["date"],
                });
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      10000
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.consignmentSearch);
    if (this.state.searchby == "consignment") {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/search_cnsg.php?SearchBy=" +
            "cnsg" +
            "&cnsg=" +
            this.state.consignmentSearch
        )
        .then((response) => {
          this.setState({ neworders: response.data, showData: true });
        })
        .catch((err) => console.log("Error", err));
    } else if (this.state.searchby == "name") {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/search_cnsg.php?SearchBy=" +
            "name" +
            "&cnsg=" +
            this.state.nameSearch
        )
        .then((response) => {
          this.setState({ neworders: response.data, showData: true });
        })
        .catch((err) => console.log("Error", err));
    } else if (this.state.searchby == "phone") {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/search_cnsg.php?SearchBy=" +
            "phone" +
            "&cnsg=" +
            this.state.phoneSearch
        )
        .then((response) => {
          this.setState({ neworders: response.data, showData: true });
        })
        .catch((err) => console.log("Error", err));
    }
  };
  render() {
    this.s_num = 0;
    if (
      this.props.state.new_data_rcv == true ||
      this.state.render1 == true ||
      this.state.showDate != ""
    ) {
      axios
        .get(
          "https://meatncuts.com.pk/phpfiles/api/search_cnsg.php?cnsg=" +
            this.state.consignmentSearch
        )
        .then((response) => {
          this.setState({
            neworders: response.data,
            render1: false,
            showDate: "",
          });
          this.props.new_data(false);
          //console.log("Response Data",this.state.neworders)
        })
        .catch((err) => console.log("Error", err));
    }
    let counter = 0;
    return (
      <div>
        <button
          className="btn-xs btn-dark"
          onClick={() => this.props.history.push("/dataentry/data")}
          style={{ position: "absolute", right: 25, width: "20%" }}
        >
          Back to Dashboard
        </button>

        <div
          style={{
            width: "60%",
            textAlign: "center",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          <Row style={{ marginTop: "20px" }}>
            <Col>
              {this.state.showConsignmentSearch == false ? (
                <button
                  className="btn btn-dark"
                  style={{ margin: "5px" }}
                  onClick={() =>
                    this.setState({
                      showConsignmentSearch: true,
                      showNameSearch: false,
                      showPhoneSearch: false,
                    })
                  }
                >
                  Search By Consignment
                </button>
              ) : (
                ""
              )}
            </Col>
            <Col>
              {this.state.showNameSearch == false ? (
                <button
                  className="btn btn-dark"
                  style={{ margin: "5px" }}
                  onClick={() =>
                    this.setState({
                      showNameSearch: true,
                      showConsignmentSearch: false,
                      showPhoneSearch: false,
                    })
                  }
                >
                  Search By Name
                </button>
              ) : (
                ""
              )}
            </Col>
            <Col>
              {this.state.showPhoneSearch == false ? (
                <button
                  className="btn btn-dark"
                  style={{ margin: "5px" }}
                  onClick={() =>
                    this.setState({
                      showPhoneSearch: true,
                      showNameSearch: false,
                      showConsignmentSearch: false,
                    })
                  }
                >
                  Search By Phone
                </button>
              ) : (
                ""
              )}
            </Col>
          </Row>
          {this.state.showConsignmentSearch ? (
            <form onSubmit={this.onSubmit}>
              <div
                style={{
                  textAlign: "center",
                  margin: "auto",
                  display: "inline-block",
                }}
              >
                <label style={{ color: "white" }}>Search Consignment: </label>
                <input
                  style={{ display: "inline-block" }}
                  type="number"
                  required
                  value={
                    this.state.consignmentSearch == 0
                      ? ""
                      : this.state.consignmentSearch
                  }
                  onChange={(e) =>
                    this.setState({
                      consignmentSearch: e.target.value,
                      showTable: false,
                    })
                  }
                />
                <div
                  style={{
                    textAlign: "center",
                    margin: "10px auto",
                    display: "inline-block",
                  }}
                >
                  <input
                    style={{ display: "inline-block" }}
                    type="submit"
                    value="Search"
                    onClick={() => this.setState({ searchby: "consignment" })}
                  />
                  <button
                    className="btn btn-danger"
                    style={{ margin: "5px" }}
                    onClick={() =>
                      this.setState({
                        showPhoneSearch: false,
                        showNameSearch: false,
                        showConsignmentSearch: false,
                      })
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
          {this.state.showNameSearch ? (
            <form onSubmit={this.onSubmit}>
              <div
                style={{
                  textAlign: "center",
                  margin: "auto",
                  display: "inline-block",
                }}
              >
                <label style={{ color: "white" }}>Search Name: </label>
                <input
                  style={{ display: "inline-block" }}
                  type="text"
                  required
                  value={this.state.nameSearch}
                  onChange={(e) =>
                    this.setState({
                      nameSearch: e.target.value.toUpperCase(),
                      showTable: false,
                    })
                  }
                />
                <div
                  style={{
                    textAlign: "center",
                    margin: "10px auto",
                    display: "inline-block",
                  }}
                >
                  <input
                    style={{ display: "inline-block" }}
                    type="submit"
                    value="Search"
                    onClick={() => this.setState({ searchby: "name" })}
                  />
                  <button
                    className="btn btn-danger"
                    style={{ margin: "5px" }}
                    onClick={() =>
                      this.setState({
                        showPhoneSearch: false,
                        showNameSearch: false,
                        showConsignmentSearch: false,
                      })
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
          {this.state.showPhoneSearch ? (
            <form onSubmit={this.onSubmit}>
              <div
                style={{
                  textAlign: "center",
                  margin: "auto",
                  display: "inline-block",
                }}
              >
                <label style={{ color: "white" }}>Search Phone: </label>
                <input
                  style={{ display: "inline-block" }}
                  type="number"
                  required
                  value={
                    this.state.phoneSearch == 0 ? "" : this.state.phoneSearch
                  }
                  onChange={(e) =>
                    this.setState({
                      phoneSearch: e.target.value,
                      showTable: false,
                    })
                  }
                />
                <div
                  style={{
                    textAlign: "center",
                    margin: "10px auto",
                    display: "inline-block",
                  }}
                >
                  <input
                    style={{ display: "inline-block" }}
                    type="submit"
                    value="Search"
                    onClick={() => this.setState({ searchby: "phone" })}
                  />
                  <button
                    className="btn btn-danger"
                    style={{ margin: "5px" }}
                    onClick={() =>
                      this.setState({
                        showPhoneSearch: false,
                        showNameSearch: false,
                        showConsignmentSearch: false,
                      })
                    }
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>

        {this.state.showData == true ? (
          <div>
            <h2>All Orders</h2>
            <div className="table-wrapper">
              <table className="fl-table">
                <thead>
                  <tr style={{ textTransform: "upperCase" }}>
                    <th>S. no</th>
                    <th>Date</th>
                    <th>Consign. Num</th>
                    <th>Cust ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Amount</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Design Name</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th colSpan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.neworders.map((v, k) => {
                    return this.row(k);
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ""
        )}

        {this.state.modalShow ? (
          <MyVerticallyCenteredModal
            sendReason={(e) => {
              this.updateDelete(this.state.i, e, this.state.d);
            }}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
            s={this.state.s}
          />
        ) : (
          ""
        )}
        {this.state.logShow ? (
          <ViewLog
            show={this.state.logShow}
            onHide={() => this.setState({ logShow: false })}
            s={this.state.s}
            id={this.state.id}
          />
        ) : (
          ""
        )}
        {this.state.showTicket ? (
          <Ticket
            show={this.state.showTicket}
            onHide={() => this.setState({ showTicket: false })}
            i={this.state.neworders[this.state.i]}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
// this.setState({del_reason:e})
const mapStateToProps = (state) => ({
  state: state,
});
const mapDispatchToProps = (dispatch) => ({
  new_data: (e) => dispatch(new_data(e)),
  //    facebook_login: () =>dispatch(facebook_login())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDelete);
