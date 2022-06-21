import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import treeTableHOC from "react-table/lib/hoc/treeTable";
import customerService from "../../../_spservices/_spsettings/_sphotspot/customers.service";

import genderList from "../../../_spdata/_spsettings/_sphotspot/gender";

import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  CustomInput,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
  Col,
  Row,
} from "reactstrap";
import "react-tagsinput/react-tagsinput.css";
import "react-table/react-table.css";

const TreeTable = treeTableHOC(ReactTable);

function CustomerTable() {
  const [data, setData] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "An error occured while trying to request customers.",
  });

  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);
  const onDismiss = () => {
    setVisible(false);
  };

  // For Open/Close Modal Create - Update
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  // For Open/Close Modal Delete
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => {
    setModalDelete(!modalDelete);
  };

  useEffect(() => {
    setVisible(false);
    getCustomerList();
  }, []);

  const getCustomerList = () => {
    customerService
      .getAll()
      .then((response) => {
        setCustomerList(response.data.data);
      })
      .catch((error) => {
        setVisible(true);
      });
  };

  const getErrorMessage = (err) => {
    alertMsg.color = "danger";
    alertMsg.text = "text-danger";
    alertMsg.icon = "fas fa-ban";
    switch (err) {
      case 403:
        alertMsg.msg = "Customer already exist!";
        break;
      case 500:
        alertMsg.msg =
          "Something wrong happens. Server Error!";
        break;
      default:
        alertMsg.msg =
          "An error occured while trying to request customers.";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    customerService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Customer saved successful!";
        setAlertMsg(alertMsg);
        getCustomerList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCustomerList();
      });
  };

  const updateItem = (id, data) => {
    customerService
      .update(id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Customer updated successful!";
        setAlertMsg(alertMsg);
        getCustomerList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCustomerList();
      });
  };

  const deleteItem = (id) => {
    customerService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Customer deleted successful!";
        setAlertMsg(alertMsg);
        getCustomerList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCustomerList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let username = event.target.userName.value;
    let firstName = event.target.firstName.value;
    let lastName = event.target.lastName.value;
    let mobilePhone = event.target.mobilePhone.value;
    let email = event.target.email.value;
    let birthDate = event.target.birthDate.value;
    let gender = event.target.genderCode.value;
    let zipCode = event.target.zipCode.value;
    let member = event.target.member.checked;
    let communication = event.target.communication.checked;
    let item = {
      "data": {
        "userName": username,
        "firstName": firstName,
        "lastName": lastName,
        "mobilePhone": mobilePhone,
        "email": email,
        "birthDate": birthDate,
        "gender": gender,
        "zipCode": zipCode,
        "member": member,
        "communication": communication,  
      }
    };
    if (!id) {
      createItem(item);
    } else {
      updateItem(id, item);
    }
    setVisible(true);
    setModal(!modal);
  };

  const handleSubmitDelete = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    deleteItem(id);
    setVisible(true);
    setModalDelete(!modalDelete);
  };

  const Customers = customerList.map((customer) => {
    let spotId = customer.attributes.hot_spot.data.attributes.spot.data ? customer.attributes.hot_spot.data.attributes.spot.data.id : "";
    let spotName = customer.attributes.hot_spot.data.attributes.spot.data ? customer.attributes.hot_spot.data.attributes.spot.data.attributes.name : "";
    let hotSpotId = customer.attributes.hot_spot.data ? customer.attributes.hot_spot.data.id : "";
    let hotSpotName = customer.attributes.hot_spot.data ? customer.attributes.hot_spot.data.attributes.name : "";

    return {
      id: customer.id,
      spotId: spotId,
      spotName: spotName,
      hotSpotId: hotSpotId,
      hotSpotName: hotSpotName,
      userName: customer.attributes.userName,
      firstName: customer.attributes.firstName,
      lastName: customer.attributes.lastName,
      mobilePhone: customer.attributes.mobilePhone,
      email: customer.attributes.email,
      birthDate: customer.attributes.birthDate,
      age: new Date().getFullYear() - new Date(customer.attributes.birthDate).getFullYear(),
      gender: customer.attributes.gender,
      zipCode: customer.attributes.zipCode,
      member: customer.attributes.member ? "Checked" : "",
      communication: customer.attributes.communication ? "Checked" : "",
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = Customers.find((o) => o.id === customer.id);
              setModal(!modal);
              setData(item);
            }}
            color="inverse"
            size="sm"
            round="true"
            icon="true"
          >
            <i className="fa fa-edit" />
          </Button>
          {/* use this button to remove the data row */}
          <Button
            onClick={() => {
              let item = Customers.find((o) => o.id === customer.id);
              setModalDelete(!modalDelete);
              setData(item);
            }}
            className="ml-1"
            color="inverse"
            size="sm"
            round="true"
            icon="true"
          >
            <i className="fa fa-trash-alt" />
          </Button>
        </div>
      ),
    };
  });

  return (
    <React.Fragment>
      {/*--------------------------------------------------------------------------------*/}
      {/* Modal to Create/Update Item*/}
      {/*--------------------------------------------------------------------------------*/}
      <Modal isOpen={modal} toggle={toggle.bind(null)}  size="lg">
        <ModalHeader toggle={toggle.bind(null)}> Customer </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectSpot">Spot</Label>
                  <Input
                    type="text"
                    name="spotId"
                    id="spotId"
                    disabled={true}
                    defaultValue={data.spotName}
                  >
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectHotSpot">HotSpot</Label>
                  <Input
                    type="text"
                    name="hotSpotId"
                    id="hotSpotId"
                    disabled={true}
                    defaultValue={data.hotSpotName}
                  >
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="userName">Userame</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="userName"
                      id="userName"
                      required={false}
                      defaultValue={data.userName}
                      disabled={true}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required={false}
                    defaultValue={data.firstName}
                    disabled={true}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required={false}
                    defaultValue={data.lastName}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="mobilePhone">Mobile Phone</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-mobile"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="mobilePhone"
                      id="mobilePhone"
                      required={false}
                      defaultValue={data.mobilePhone}
                      disabled={true}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-email"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      required={false}
                      defaultValue={data.email}
                      disabled={false}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="birthDate">Date of Birth</Label>
                  <Input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    required={false}
                    defaultValue={data.birthDate}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectGenderCode">Gender</Label>
                  <Input
                    type="select"
                    name="genderCode"
                    id="genderCode"
                    required={false}
                    defaultValue={data.gender}
                  >
                    <option value=""> -- Select Gender -- </option>
                    {genderList.map((g) => {
                      return (
                        <option key={g.id} value={g.code}>
                          {g.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="zipCode">ZipCode</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-home"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      required={false}
                      defaultValue={data.zipCode}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="memberShip">Member</Label>
                  <br />
                  <CustomInput
                    type="switch"
                    id="member"
                    name="member"
                    className="custom-switch"
                    defaultChecked={data.member}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="communication">Communication</Label>
                  <br />
                  <CustomInput
                    type="switch"
                    id="communication"
                    name="communication"
                    className="custom-switch"
                    defaultChecked={data.communication}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button color="success" type="submit">
                Save
              </Button>
              <Button
                color="secondary"
                className="ml-1"
                onClick={toggle.bind(null)}
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      {/*--------------------------------------------------------------------------------*/}
      {/* Modal to Delete Item*/}
      {/*--------------------------------------------------------------------------------*/}
      <Modal isOpen={modalDelete} toggle={toggleDelete.bind(null)}>
        <ModalHeader toggle={toggleDelete.bind(null)}> Customer </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <div>
              Do you want to delete?{" "}
              <b>
                {data.userName} - {data.firstName}
              </b>
            </div>
            <br />
            <FormGroup>
              <Button color="success" type="submit">
                Delete
              </Button>
              <Button
                color="secondary"
                className="ml-1"
                onClick={toggleDelete.bind(null)}
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      {/*--------------------------------------------------------------------------------*/}
      {/* Start Action table*/}
      {/*--------------------------------------------------------------------------------*/}
      <Card>
        {visible ? (
          <Alert
            color={alertMsg.color}
            isOpen={visible}
            toggle={onDismiss.bind(null)}
          >
            <div className="d-flex">
              <div className="stats">
                <h4 className={`mt-0 ${alertMsg.text}`}>{alertMsg.msg}</h4>
              </div>
              <div className="stats-icon text-left ml-auto">
                <i className={`${alertMsg.icon} display-7 op-3 text-dark`}></i>
              </div>
            </div>
          </Alert>
        ) : (
          ""
        )}
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <i className="mdi mdi-account-multiple display-7 mr-2"></i>List of
          Customers
        </CardTitle>
        <CardBody>
          <TreeTable
            columns={[
              {
                Header: "Username",
                accessor: "userName",
              },
              {
                Header: "First Name",
                accessor: "firstName",
              },
              {
                Header: "Lasst Name",
                accessor: "lastName",
              },
              {
                Header: "Mobile",
                accessor: "mobilePhone",
              },
              {
                Header: "Email",
                accessor: "email",
                show: false,
              },
              {
                Header: "Birth Date",
                accessor: "birthDate",
                show: false,
              },
              {
                Header: "Age",
                accessor: "age",
                width: 40,
              },
              {
                Header: "Gender",
                accessor: "gender",
              },
              {
                Header: "ZipCode",
                accessor: "zipCode",
              },
              {
                Header: "Spot Id",
                accessor: "spotId",
                show: false,
              },
              {
                Header: "Spot Name",
                accessor: "spotName",
                show: true,
              },
              {
                Header: "HotSpot Id",
                accessor: "hotSpotName",
                show: false,
              },
              {
                Header: "HotSpot Name",
                accessor: "hotSpotName",
                show: true,
              },
              {
                Header: "Member",
                accessor: "member",
                show: false,
              },
              {
                Header: "Communication",
                accessor: "communication",
                show: false,
              },
              {
                Header: "Actions",
                accessor: "actions",
                sortable: false,
                filterable: false,
                width: 100,
              },
            ]}
            defaultPageSize={10}
            showPaginationBottom={true}
            className="-striped -highlight"
            data={Customers}
            filterable
          />
        </CardBody>
      </Card>
      {/*--------------------------------------------------------------------------------*/}
      {/* End Action table*/}
      {/*--------------------------------------------------------------------------------*/}
    </React.Fragment>
  );
}

export default CustomerTable;
