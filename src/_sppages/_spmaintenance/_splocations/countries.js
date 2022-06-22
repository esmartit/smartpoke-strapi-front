import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import countryService from "../../../_spservices/_spmaintenances/_splocations/countries.service";

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
  Alert,
  Col,
  Row,
} from "reactstrap";

import "react-table/react-table.css";

function CountryTable() {
  const [data, setData] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [noState, setNoState] = useState(false);
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
          msg: "An error occured while trying to request countries, ("+error.response.statusText+")."});
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
          "Country already exist!";
        break;
      case 500:
        alertMsg.msg = "Something wrong happens. Server Error!";
        break;
      default:
        alertMsg.msg =
          "An error occured while trying to request countries.";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    countryService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Country saved successful!";
        setAlertMsg(alertMsg);
        getCountryList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCountryList();
      });
  };

  const updateItem = (id, data) => {
    countryService
      .update(id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Country updated successful!";
        setAlertMsg(alertMsg);
        getCountryList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCountryList();
      });
  };

  const deleteItem = (id) => {
    countryService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Country deleted successful!";
        setAlertMsg(alertMsg);
        getCountryList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCountryList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let codeISO2 = event.target.codeISO2.value.toUpperCase();
    let codeISO3 = event.target.codeISO3.value.toUpperCase();
    let name = event.target.name.value;
    let codePhone = event.target.codePhone.value;
    let status = event.target.status.checked;
    let item = {
        "data": {
          "name": name,
          "codeISO2": codeISO2,
          "codeISO3": codeISO3,
          "codePhone": codePhone,
          "status": status
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

  const Countries = countryList.map((country) => {
    return {
      id: country.id,
      codeISO2: country.attributes.codeISO2,
      codeISO3: country.attributes.codeISO3,
      name: country.attributes.name,
      codePhone: country.attributes.codePhone,
      status: country.attributes.status ? "Checked" : "",
      switchStatus: (
        <div className="text-center">
          <CustomInput
            type="switch"
            id="statusSwitch"
            name="statusSwitch"
            checked={country.attributes.status}
            disabled
          />
        </div>
      ),
      states: country.attributes.states.data,
      spots: country.attributes.spots.data,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = Countries.find((o) => o.id === country.id);
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
              let item = Countries.find((o) => o.id === country.id);
              setModalDelete(!modalDelete);
              setNoState(false);
              setNoSpot(false);
              if (item.states.length > 0 || item.spots.length > 0) {
                setNoSpot(true);
                setNoState(true);
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
        <ModalHeader toggle={toggle.bind(null)}> Country </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
              <Col sm={12} md={12}>
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
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="codeISO2">Code ISO2 *</Label>
                  <Input
                    type="text"
                    name="codeISO2"
                    id="codeISO2"
                    required={true}
                    defaultValue={data.codeISO2}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="codeISO3">Code ISO3 *</Label>
                  <Input
                    type="text"
                    name="codeISO3"
                    id="codeISO3"
                    required={true}
                    defaultValue={data.codeISO3}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="codePhone">Code Phone *</Label>
                  <Input
                    type="text"
                    name="codePhone"
                    id="codePhone"
                    required={true}
                    defaultValue={data.codePhone}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="status">Status</Label>
                  <br />
                  <CustomInput
                    type="switch"
                    id="status"
                    name="status"
                    className="custom-switch"
                    defaultChecked={data.status}
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Country </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSpot || !noState ? (
              <div>
                Do you want to delete? <b>{data.name}</b>
              </div>
            ) : (
              <div>
                You can not delete the country <b>{data.name}</b>, it has states
                and/or spots associated.
              </div>
            )}
            <br />
            <FormGroup>
              <Button
                color="success"
                type="submit"
                disabled={noSpot || noState}
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
          <i className="mdi mdi-map display-7 mr-2"></i>List of Countries
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                name: "",
                codeISO2: "",
                codeISO3: "",
                codePhone: "",
                status: true,
              };
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Country
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "Code ISO2",
                accessor: "codeISO2",
                width: 120,
              },
              {
                Header: "Code ISO3",
                accessor: "codeISO3",
                width: 120,
              },
              {
                Header: "Code Phone",
                accessor: "codePhone",
                width: 120,
              },
              {
                Header: "Status",
                accessor: "status",
                show: false,
              },
              {
                Header: "Status",
                accessor: "switchStatus",
                filterable: false,
                width: 60,
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
            data={Countries}
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

export default CountryTable;
