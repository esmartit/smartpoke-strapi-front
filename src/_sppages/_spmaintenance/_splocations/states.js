import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import countryService from "../../../_spservices/_spmaintenances/_splocations/countries.service";
import stateService from "../../../_spservices/_spmaintenances/_splocations/states.service";

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
  Label,
  Input,
  Alert,
  Col,
  Row,
} from "reactstrap";

import "react-table/react-table.css";

function StateTable() {
  const [countryList, setCountryList] = useState([]);

  const [data, setData] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [noCity, setNoCity] = useState(false);
  const [noSpot, setNoSpot] = useState(false);

  const [alertMsg, setAlertMsg] = useState({});

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
    getCountryList();
    getStateList();
  }, []);

  const getCountryList = () => {
    countryService
      .getAll()
      .then((response) => {
        setCountryList(response.data.data);
      })
      .catch((error) => {
        setAlertMsg({
          color: "danger", 
          text: "text-danger", 
          icon: "fas fa-ban", 
          msg: "An error occured while trying to request states, ("+error.response.statusText+")."});
        setVisible(true);
      });
  };

  const getStateList = () => {
    stateService
      .getAll()
      .then((response) => {
        setStateList(response.data.data);
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
        alertMsg.msg =
          "State already exist!";
        break;
      case 500:
        alertMsg.msg = "Something wrong happens. Server Error!";
        break;
      default:
        alertMsg.msg =
          "An error occured while trying to request states.";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    stateService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "State saved successful!";
        setAlertMsg(alertMsg);
        getStateList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getStateList();
      });
  };

  const updateItem = (id, data) => {
    stateService
      .update(id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "State updated successful!";
        setAlertMsg(alertMsg);
        getStateList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getStateList();
      });
  };

  const deleteItem = (id) => {
    stateService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "State deleted successful!";
        setAlertMsg(alertMsg);
        getStateList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getStateList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let countryId = event.target.countryId.value;
    let stateCode = event.target.stateCode.value;
    let name = event.target.name.value;
    let item = {
        "data": {
          "name": name,
          "country": countryId,
          "stateCode": stateCode
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

  const States = stateList.map((state) => {
    let countryId = state.attributes.country.data ? state.attributes.country.data.id : "";
    let countryName = state.attributes.country.data ? state.attributes.country.data.attributes.name : "";

    return {
      id: state.id,
      countryId: countryId,
      countryName: countryName,
      stateCode: state.attributes.stateCode,
      name: state.attributes.name,
      cities: state.attributes.cities.data,
      spots: state.attributes.spots.data,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = States.find((o) => o.id === state.id);
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
              let item = States.find((o) => o.id === state.id);
              setModalDelete(!modalDelete);
              setNoCity(false);
              setNoSpot(false);
              if (item.cities.length > 0 || item.spots.length > 0) {
                setNoSpot(true);
                setNoCity(true);
              }
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
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}> State </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectCountry">Country *</Label>
                  <Input
                    type="select"
                    name="countryId"
                    id="countryId"
                    required={true}
                    defaultValue={data.countryId}
                  >
                    <option value=""> -- Select Country -- </option>
                    {countryList.map((country, key) => {
                      return (
                        <option key={country.id} value={country.id}>
                          {country.attributes.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="name">Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    required={true}
                    defaultValue={data.name}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="stateCode">State Code *</Label>
                  <Input
                    type="text"
                    name="stateCode"
                    id="stateCode"
                    required={true}
                    defaultValue={data.stateCode}
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
        <ModalHeader toggle={toggleDelete.bind(null)}> State </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSpot || !noCity ? (
              <div>
                Do you want to delete? <b>{data.name}</b>
              </div>
            ) : (
              <div>
                You can not delete the state <b>{data.name}</b>, it has cities and/or
                spots associated.
              </div>
            )}
            <br />
            <FormGroup>
              <Button
                color="success"
                type="submit"
                disabled={noSpot || noCity}
              >
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
          <i className="mdi mdi-map display-7 mr-2"></i>List of States
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                country: "",
                stateCode: "",
                name: "",
              };
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New State
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Country Id",
                accessor: "countryId",
                show: false,
              },
              {
                Header: "Country Name",
                accessor: "countryName",
              },
              {
                Header: "State Code",
                accessor: "stateCode",
                width: 100,
              },
              {
                Header: "State Name",
                accessor: "name",
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
            data={States}
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

export default StateTable;
