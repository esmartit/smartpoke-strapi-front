import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import spotService from "../../../_spservices/_spconfigurations/spots.service";
import valueService from "../../../_spservices/_spsettings/_spbigdata/values.service";

import valueCodes from "../../../_spdata/_spsettings/_spbigdata/valueType";

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

function ValueTable() {
  const [spotList, setSpotList] = useState([]);

  const [data, setData] = useState([]);
  const [valueList, setValueList] = useState([]);

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
    getSpotList();
    getValueList();
  }, []);

  const getSpotList = () => {
    spotService
      .getAll()
      .then((response) => {
        setSpotList(response.data.data);
      })
      .catch((error) => {
        setAlertMsg({
          color: "danger", 
          text: "text-danger", 
          icon: "fas fa-ban", 
          msg: "An error occured while trying to request spots, ("+error.response.statusText+")."});
        setVisible(true);
      });
  };

  const getValueList = () => {
    valueService
      .getAll()
      .then((response) => {
        setValueList(response.data.data);
      })
      .catch((error) => {
        setAlertMsg({
          color: "danger", 
          text: "text-danger", 
          icon: "fas fa-ban", 
          msg: "An error occured while trying to request values, ("+error.response.statusText+")."});
        setVisible(true);
      });
  };

  const getValueName = (code = null) => {
    let valueName = "";
    let val = valueCodes.find((o) => o.code === code);
    if (val) {
      valueName = val.name;
    }
    return valueName;
  };

  const getErrorMessage = (err) => {
    alertMsg.color = "danger";
    alertMsg.text = "text-danger";
    alertMsg.icon = "fas fa-ban";
    switch (err) {
      case 403:
        alertMsg.msg = "Value already exist!";
        break;
      case 500:
        alertMsg.msg =
          "Something wrong happens. Server Error!";
        break;
      default:
        alertMsg.msg =
          "An error occured while trying to request values.";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    valueService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Value saved successful!";
        setAlertMsg(alertMsg);
        getValueList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getValueList();
      });
  };

  const updateItem = (id, data) => {
    valueService
      .update(id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Value updated successful!";
        setAlertMsg(alertMsg);
        getValueList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getValueList();
      });
  };

  const deleteItem = (id) => {
    valueService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Value deleted successful!";
        setAlertMsg(alertMsg);
        getValueList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getValueList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let spotId = event.target.spotId.value;
    let valueCode = event.target.valueCode.value;
    let value = event.target.value.value;
    let item = {
      "data": {
        "valueCode": valueCode,
        "value": value,
        "spot": spotId,
        "valueKey": spotId+':'+valueCode
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

  const Values = valueList.map((value) => {
    let spotId = value.attributes.spot.data ? value.attributes.spot.data.id : "";
    let spotName = value.attributes.spot.data ? value.attributes.spot.data.attributes.name : "";

    return {
      id: value.id,
      spotId: spotId,
      spotName: spotName,
      valueCode: value.attributes.valueCode,
      valueName: getValueName(value.attributes.valueCode),
      value: value.attributes.value,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = Values.find((o) => o.id === value.id);
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
              let item = Values.find((o) => o.id === value.id);
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
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}> Value </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectValueCode">Code *</Label>
                  <Input
                    type="select"
                    name="valueCode"
                    id="valueCode"
                    required={true}
                    defaultValue={data.valueCode}
                  >
                    <option value=""> -- Select Value Code -- </option>
                    {valueCodes.map((valCodes) => {
                      return (
                        <option key={valCodes.id} value={valCodes.code}>
                          {valCodes.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="value">Value</Label>
                  <Input
                    type="text"
                    name="value"
                    id="value"
                    defaultValue={data.value}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectSpot">Spot *</Label>
                  <Input
                    type="select"
                    name="spotId"
                    id="spotId"
                    required={true}
                    defaultValue={data.spotId}
                  >
                    <option value=""> -- Select Spot -- </option>
                    {spotList.map((spot, key) => {
                      return (
                        <option key={spot.id} value={spot.id}>
                          {spot.attributes.name}
                        </option>
                      );
                    })}
                  </Input>
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Value </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <div>
              Do you want to delete? <b>{getValueName(data.valueCode)}</b>
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
          <i className="mdi mdi-hexagon-multiple display-7 mr-2"></i>List of Values
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                spotId: "",
                valueCode: "",
                value: "",
              };          
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Value
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Code",
                accessor: "valueCode",
                show: false,
              },
              {
                Header: "Name",
                accessor: "valueName",
              },
              {
                Header: "Value",
                accessor: "value",
              },
              {
                Header: "Spot Id",
                accessor: "spotId",
                show: false,
              },
              {
                Header: "Spot Name",
                accessor: "spotName",
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
            data={Values}
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

export default ValueTable;
