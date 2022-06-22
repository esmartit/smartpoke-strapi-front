import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import countryService from "../../../_spservices/_spmaintenances/_splocations/countries.service";
import zipcodeService from "../../../_spservices/_spmaintenances/_splocations/zipcodes.service";

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

function ZipCodeTable() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  
  const [data, setData] = useState([]);
  const [zipcodeList, setZipCodeList] = useState([]);
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
    getZipCodeList();
  }, []);

  const stateList = countryList.find((country) => country.id === parseInt(selectedCountry));
  const cityList = stateList?.attributes.states.data.find((state) => state.id === parseInt(selectedState));

  const getCountryList = () => {
    countryService
      .getAll()
      .then((response) => {
        setCountryList(response.data.data);
      })
      .catch((error) => {
        setVisible(true);
      });
  };

  const getZipCodeList = () => {
    zipcodeService
      .getAll()
      .then((response) => {
        setZipCodeList(response.data.data);
      })
      .catch((error) => {
        setAlertMsg({
          color: "danger", 
          text: "text-danger", 
          icon: "fas fa-ban", 
          msg: "An error occured while trying to request zip codes, ("+error.response.statusText+")."});
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
          "Zip Code already exist!";
        break;
      case 500:
        alertMsg.msg = "Something wrong happens. Server Error!";
        break;
      default:
        alertMsg.msg =
          "An error occured while trying to request Zip Codes.";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    zipcodeService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "ZipCode saved successful!";
        setAlertMsg(alertMsg);
        getZipCodeList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getZipCodeList();
      });
  };

  const updateItem = (id, data) => {
    zipcodeService
      .update(id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "ZipCode updated successful!";
        setAlertMsg(alertMsg);
        getZipCodeList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getZipCodeList();
      });
  };

  const deleteItem = (id) => {
    zipcodeService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "ZipCode deleted successful!";
        setAlertMsg(alertMsg);
        getZipCodeList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getZipCodeList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let cityId = event.target.cityId.value;
    let zipCode = event.target.zipCode.value;
    let location = event.target.location.value;
    let item = {
      "data": {
        "city": cityId,
        "zipCode": zipCode,
        "location": location
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

  const ZipCodes = zipcodeList.map((zipcode) => {
    let countryId = zipcode.attributes.city.data.attributes.state.data.attributes.country.data ? zipcode.attributes.city.data.attributes.state.data.attributes.country.data.id : "";
    let countryName = zipcode.attributes.city.data.attributes.state.data.attributes.country.data ? zipcode.attributes.city.data.attributes.state.data.attributes.country.data.attributes.name : "";
    let stateId = zipcode.attributes.city.data.attributes.state.data ? zipcode.attributes.city.data.attributes.state.data.id : "";
    let stateName = zipcode.attributes.city.data.attributes.state.data ? zipcode.attributes.city.data.attributes.state.data.attributes.name : "";
    let cityId = zipcode.attributes.city.data ? zipcode.attributes.city.data.id : "";
    let cityName = zipcode.attributes.city.data ? zipcode.attributes.city.data.attributes.name : "";

    return {
      id: zipcode.id,
      countryId: countryId,
      countryName: countryName,
      stateId: stateId,
      stateName: stateName,
      cityId: cityId,
      cityName: cityName,
      zipCode: zipcode.attributes.zipCode,
      location: zipcode.attributes.location,
      spots: zipcode.attributes.spots.data,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = ZipCodes.find((o) => o.id === zipcode.id);
              setModal(!modal);
              setSelectedCountry(item.countryId);
              setSelectedState(item.stateId);
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
              let item = ZipCodes.find((o) => o.id === zipcode.id);
              setModalDelete(!modalDelete);
              setNoSpot(false);
              if (item.spots.length > 0) {
                setNoSpot(true);
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
        <ModalHeader toggle={toggle.bind(null)}> ZipCode </ModalHeader>
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
                    onChange={(e) => setSelectedCountry(e.target.value)}
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
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectState">State *</Label>
                  <Input
                    type="select"
                    name="stateId"
                    id="stateId"
                    required={true}
                    defaultValue={data.stateId}
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={!selectedCountry}
                  >
                    <option value=""> -- Select State -- </option>
                    {stateList?.attributes.states.data.map((state, key) => {
                        return (
                          <option key={state.id} value={state.id}>
                            {state.attributes.name}
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
                  <Label for="selectCity">City *</Label>
                  <Input
                    type="select"
                    name="cityId"
                    id="cityId"
                    required={true}
                    defaultValue={data.cityId}
                    disabled={!selectedState}
                  >
                    <option value=""> -- Select City -- </option>
                    {cityList?.attributes.cities.data.map((city, key) => {
                        return (
                          <option key={city.id} value={city.id}>
                            {city.attributes.name}
                          </option>
                        );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="zipCode">Zip Code *</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    required={true}
                    defaultValue={data.zipCode}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <FormGroup>
                  <Label for="location">Location *</Label>
                  <Input
                    type="text"
                    name="location"
                    id="location"
                    required={true}
                    defaultValue={data.location}
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
        <ModalHeader toggle={toggleDelete.bind(null)}> ZipCode </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSpot ? (
              <div>
                Do you want to delete? <b>{data.zipCode} - {data.location}</b>
              </div>
            ) : (
              <div>
                You can not delete the Zip Code <b>{data.zipCode} - {data.location}</b>, it has spots
                associated.
              </div>
            )}
            <br />
            <FormGroup>
              <Button color="success" type="submit" disabled={noSpot}>
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
          <i className="mdi mdi-map display-7 mr-2"></i>List of ZipCodes
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                cityId: "",
                zipCode: "",
                location: "",
              };
              setModal(!modal);
              setSelectedCountry('');
              setSelectedState('');
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New ZipCode
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Country Code",
                accessor: "countryId",
                show: false,
              },
              {
                Header: "Country Name",
                accessor: "countryName",
              },
              {
                Header: "State Code",
                accessor: "stateId",
                show: false,
              },
              {
                Header: "State Name",
                accessor: "stateName",
              },
              {
                Header: "City Code",
                accessor: "cityId",
                show: false,
              },
              {
                Header: "City Name",
                accessor: "cityName",
              },
              {
                Header: "ZipCode",
                accessor: "zipCode",
              },
              {
                Header: "Location",
                accessor: "location",
              },
              {
                Header: "Actions",
                accessor: "actions",
                sortable: false,
                filterable: false,
              },
            ]}
            defaultPageSize={10}
            showPaginationBottom={true}
            className="-striped -highlight"
            data={ZipCodes}
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

export default ZipCodeTable;
