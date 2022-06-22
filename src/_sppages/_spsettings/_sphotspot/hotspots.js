import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import spotService from "../../../_spservices/_spconfigurations/spots.service";
import hotSpotService from "../../../_spservices/_spsettings/_sphotspot/hotspots.service";

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
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import "react-table/react-table.css";

function HotSpotTable() {
  const [spotList, setSpotList] = useState([]);

  const [data, setData] = useState([]);
  const [hotSpotList, setHotSpotList] = useState([]);
  const [hotSpotTags, setHotSpotTags] = useState([]);
  const [noCustomer, setNoCustomer] = useState(false);


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
    getHotSpotList();
  }, []);

  const handleHotSpotTags = (tags) => {
    setHotSpotTags(tags);
  };

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

  const getHotSpotList = () => {
    hotSpotService
      .getAll()
      .then((response) => {
        setHotSpotList(response.data.data);
      })
      .catch((error) => {
        setAlertMsg({
          color: "danger", 
          text: "text-danger", 
          icon: "fas fa-ban", 
          msg: "An error occured while trying to request hotpots, ("+error.response.statusText+")."});
        setVisible(true);
      });
  };

  const getErrorMessage = (err) => {
    alertMsg.color = "danger";
    alertMsg.text = "text-danger";
    alertMsg.icon = "fas fa-ban";
    switch (err) {
      case 403:
        alertMsg.msg = "HotSpot already exist!";
        break;
      case 500:
        alertMsg.msg =
          "Something wrong happens. Server Error!";
        break;
      default:
        alertMsg.msg =
          "An error occured while trying to request hotspots.";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    hotSpotService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Hotspot saved successful!";
        setAlertMsg(alertMsg);
        getHotSpotList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getHotSpotList();
      });
  };

  const updateItem = (id, data) => {
    hotSpotService
      .update(id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Hotspot updated successful!";
        setAlertMsg(alertMsg);
        getHotSpotList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getHotSpotList();
      });
  };

  const deleteItem = (id) => {
    hotSpotService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Hotspot deleted successful!";
        setAlertMsg(alertMsg);
        getHotSpotList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getHotSpotList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let spotId = event.target.spotId.value;
    let name = event.target.name.value;
    let status = event.target.status.checked;
    let tags = hotSpotTags;
    let item = {
      "data": {
        "spot": spotId,
        "name": name,
        "tags": tags,
        "status": status,  
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

  const HotSpots = hotSpotList.map((hotSpot) => {
    let spotId = hotSpot.attributes.spot.data ? hotSpot.attributes.spot.data.id : "";
    let spotName = hotSpot.attributes.spot.data ? hotSpot.attributes.spot.data.attributes.name : "";

    return {
      id: hotSpot.id,
      spotId: spotId,
      spotName: spotName,
      name: hotSpot.attributes.name,
      status: hotSpot.attributes.status ? "Checked" : "",
      switchStatus: (
        <div className="text-center">
          <CustomInput
            type="switch"
            id="statusSwitch"
            name="statusSwitch"
            checked={hotSpot.attributes.status}
            disabled
          />
        </div>
      ),
      tags: hotSpot.attributes.tags,
      customers: hotSpot.attributes.customers.data,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = HotSpots.find((o) => o.id === hotSpot.id);
              setHotSpotTags(item.tags);
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
              let item = HotSpots.find((o) => o.id === hotSpot.id);
              setModalDelete(!modalDelete);
              setNoCustomer(false);
              if (item.customers.length > 0) {
                setNoCustomer(true);
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
        <ModalHeader toggle={toggle.bind(null)}> HotSpot </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
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
            </Row>
            <Row form>
              <Col sm={12} md={9}>
                <FormGroup>
                  <Label for="sensorTags">Tags *</Label>
                  <TagsInput
                    value={hotSpotTags}
                    onChange={(hotspottags) => handleHotSpotTags(hotspottags)}
                    tagProps={{
                      className:
                        "react-tagsinput-tag bg-info text-white rounded",
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
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
        <ModalHeader toggle={toggleDelete.bind(null)}> HotSpot </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noCustomer ? (
              <div>
                Do you want to delete? <b>{data.name}</b>
              </div>
            ) : (
              <div>
                You can not delete the hotspot <b>{data.name}</b>, it has customers
                associated.
              </div>
            )}
            <br />
            <FormGroup>
              <Button color="success" type="submit" disabled={noCustomer}>
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
          <i className="mdi mdi-wifi display-7 mr-2"></i>List of HotSpots
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                spot: "",
                name: "",
                status: true,
                tags: [],
              };
              setHotSpotTags(item.tags);
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New HotSpot
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
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
                Header: "HotSpot Name",
                accessor: "name",
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
              },
              {
                Header: "Tags",
                accessor: "tags",
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
            data={HotSpots}
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

export default HotSpotTable;
