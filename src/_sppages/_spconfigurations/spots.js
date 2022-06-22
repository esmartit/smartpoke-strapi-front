import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import spotService from "../../_spservices/_spconfigurations/spots.service";
import businessTypeService from "../../_spservices/_spmaintenances/businessTypes.service";
import countryService from "../../_spservices/_spmaintenances/_splocations/countries.service";

import timeZones from "../../_spdata/_spconfiguration/timeZone";

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

function SpotTable() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();

  const [businessTypeList, setBusinessTypeList] = useState([]);

  const [data, setData] = useState([]);
  const [spotList, setSpotList] = useState([]);
  const [noZone, setNoZone] = useState(false);
  const [noSensor, setNoSensor] = useState(false);
  const [noHotSpot, setNoHotSpot] = useState(false);

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
    getBusinessTypeList();
    getCountryList();
    getSpotList(); 
  }, []);

  const countryCode = countryList.find((country) => country.id === parseInt(selectedCountry));
  const codeISO2 = countryCode ? countryCode.attributes.codeISO2 : "";
  const stateList = countryList.find((country) => country.id === parseInt(selectedCountry));
  const cityList = stateList?.attributes.states.data.find((state) => state.id === parseInt(selectedState));
  const zipCodeList = cityList?.attributes.cities.data.find((city) => city.id === parseInt(selectedCity));
  const timeZoneList = timeZones.find((tz) => tz.country_code === codeISO2);

  const getBusinessTypeList = () => {
    businessTypeService
      .getAll()
      .then((response) => {
        setBusinessTypeList(response.data.data);
      })
      .catch((error) => {
        setAlertMsg({
          color: "danger", 
          text: "text-danger", 
          icon: "fas fa-ban", 
          msg: "An error occured while trying to request business types, ("+error.response.statusText+")."});
        setVisible(true);
      });
  };

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

  const getErrorMessage = (err) => {
    alertMsg.color = "danger";
    alertMsg.text = "text-danger";
    alertMsg.icon = "fas fa-ban";
    switch (err) {
      case 403:
        alertMsg.msg =
          "Spot already exist!";
        break;
      case 500:
        alertMsg.msg = "Something wrong happens. Server Error!";
        break;
      default:
        alertMsg.msg =
          "An error occured while trying to request spots.";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    spotService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Spot saved successful!";
        setAlertMsg(alertMsg);
        getSpotList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getSpotList();
      });
  };

  const updateItem = (id, data) => {
    spotService
      .update(id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Spot updated successful!";
        setAlertMsg(alertMsg);
        getSpotList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getSpotList();
      });
  };

  const deleteItem = (id) => {
    spotService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Spot deleted successful!";
        setAlertMsg(alertMsg);
        getSpotList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getSpotList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let spotId = event.target.spotId.value;
    let name = event.target.name.value;
    let businessTypeId = event.target.businessTypeId.value;
    let latitude = event.target.latitude.value;
    let longitude = event.target.longitude.value;
    let countryId = event.target.countryId.value;
    let stateId = event.target.stateId.value;
    let cityId = event.target.cityId.value;
    let zipCode = event.target.zipCode.value;
    let timeZone = event.target.timeZone.value;
    let item = {
      "data": {
        "spotId": spotId,
        "name": name,
        "business_type": businessTypeId,
        "latitude": latitude,
        "longitude": longitude,
        "country": countryId,
        "state": stateId,
        "city": cityId,
        "zip_code": zipCode,
        "timeZone": timeZone
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

  const Spots = spotList.map((spot) => {
    let businessTypeId = spot.attributes.business_type.data ? spot.attributes.business_type.data.id : "";
    let businessTypeName = spot.attributes.business_type.data ? spot.attributes.business_type.data.attributes.name : "";
    let countryId = spot.attributes.country.data ? spot.attributes.country.data.id : "";
    let countryName = spot.attributes.country.data ? spot.attributes.country.data.attributes.name : "";
    let stateId = spot.attributes.state.data ? spot.attributes.state.data.id : "";
    let stateName = spot.attributes.state.data ? spot.attributes.state.data.attributes.name : "";
    let cityId = spot.attributes.city.data ? spot.attributes.city.data.id : "";
    let cityName = spot.attributes.city.data ? spot.attributes.city.data.attributes.name : "";
    let zipCodeId = spot.attributes.zip_code.data ? spot.attributes.zip_code.data.id : "";
    let zipCode = spot.attributes.zip_code.data ? spot.attributes.zip_code.data.attributes.zipCode : "";
    let location = spot.attributes.zip_code.data ? spot.attributes.zip_code.data.attributes.location : "";

    return {
      id: spot.id,
      spotId: spot.attributes.spotId,
      name: spot.attributes.name,
      businessTypeId: businessTypeId,
      businessTypeName: businessTypeName,
      latitude: spot.attributes.latitude,
      longitude: spot.attributes.longitude,
      countryId: countryId,
      countryName: countryName,
      stateId: stateId,
      stateName: stateName,
      cityId: cityId,
      cityName: cityName,
      zipCodeId: zipCodeId,
      zipCode: zipCode,
      location: location,
      timeZone: spot.attributes.timeZone,
      zones: spot.attributes.zones.data,
      sensors: spot.attributes.sensors.data,
      hotspots: spot.attributes.hot_spots.data,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = Spots.find((o) => o.id === spot.id);
              setModal(!modal);
              setSelectedCountry(item.countryId);
              setSelectedState(item.stateId);
              setSelectedCity(item.cityId);
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
              let item = Spots.find((o) => o.id === spot.id);
              setModalDelete(!modalDelete);
              setNoZone(false);
              setNoSensor(false);
              setNoHotSpot(false);
              if (item.zones.length > 0 || 
                  item.sensors.length > 0 || 
                  item.hotspots.lenght > 0) {
                setNoZone(true);
                setNoSensor(true);
                setNoHotSpot(true);
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
        <ModalHeader toggle={toggle.bind(null)}> Spot </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="spotId">Spot Id *</Label>
                  <Input
                    type="text"
                    name="spotId"
                    id="spotId"
                    required={true}
                    defaultValue={data.spotId}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="name">Spot Name *</Label>
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
                  <Label for="selectBusinessType">Business Type *</Label>
                  <Input
                    type="select"
                    name="businessTypeId"
                    id="businessTypeId"
                    required={true}
                    defaultValue={data.businessTypeId}
                  >
                    <option value=""> -- Select Business Type -- </option>
                    {businessTypeList.map((businessType, key) => {
                      return (
                        <option key={businessType.id} value={businessType.id}>
                          {businessType.attributes.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <Label for="latitude">Latitude</Label>
                  <Input
                    type="text"
                    name="latitude"
                    id="latitude"
                    defaultValue={data.latitude}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <Label for="longitude">Longitude</Label>
                  <Input
                    type="text"
                    name="longitude"
                    id="longitude"
                    defaultValue={data.longitude}
                  />
                </FormGroup>
              </Col>
            </Row>
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
                    onChange={(e) => setSelectedCity(e.target.value)}
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
                  <Label for="selectZipCode">ZipCode *</Label>
                  <Input
                    type="select"
                    name="zipCode"
                    id="zipCode"
                    required={true}
                    defaultValue={data.zipCodeId}
                    disabled={!selectedCity}
                  >
                    <option value=""> -- Select ZipCode -- </option>                    
                    {zipCodeList?.attributes.zip_codes.data.map((zipCode, key) => {
                        return (
                          <option key={zipCode.id} value={zipCode.id}>
                            {zipCode.attributes.zipCode} - {zipCode.attributes.location}
                          </option>
                        );
                    })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
            <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectZipCode">TimeZone *</Label>
                  <Input
                    type="select"
                    name="timeZome"
                    id="timeZone"
                    required={true}
                    defaultValue={data.timeZone}
                    disabled={!selectedCountry}
                  >
                    <option value=""> -- Select TimeZone -- </option>                    
                    {timeZoneList?.timezones.map((tz) => {
                        return (
                          <option key={tz} value={tz}>
                            {tz}
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Spot </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSensor || !noZone || !noHotSpot ? (
              <div>
                Do you want to delete? <b>{data.name}</b>
              </div>
            ) : (
              <div>
                You can not delete the spot <b>{data.name}</b>, it has zones
                and/or sensors and/or hotspots associated.
              </div>
            )}
            <br />
            <FormGroup>
              <Button
                color="success"
                type="submit"
                disabled={noSensor || noZone || noHotSpot}
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
          <i className="mdi mdi-map-marker display-7 mr-2"></i>List of Spots
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                spotId: "",
                name: "",
                businessType: "",
                latitude: 0.0,
                longitude: 0.0,
                country: "",
                state: "",
                city: "",
                zipCode: "",
              };
              setModal(!modal);
              setSelectedCountry('');
              setSelectedState('');
              setSelectedCity('');
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Spot
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Spot Id",
                accessor: "spotId",
              },
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "BusinessType Code",
                accessor: "businessTypeId",
                show: false,
              },
              {
                Header: "Business Type",
                accessor: "businessTypeName",
              },
              {
                Header: "Latitude",
                accessor: "latitude",
                show: false,
              },
              {
                Header: "Longitude",
                accessor: "longitude",
                show: false,
              },
              {
                Header: "Country Code",
                accessor: "countryId",
                show: false,
              },
              {
                Header: "Country",
                accessor: "countryName",
              },
              {
                Header: "State Code",
                accessor: "stateId",
                show: false,
              },
              {
                Header: "State",
                accessor: "stateName",
              },
              {
                Header: "City Code",
                accessor: "cityId",
                show: false,
              },
              {
                Header: "City",
                accessor: "cityName",
              },
              {
                Header: "ZipCode",
                accessor: "zipCode",
                width: 80,
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
                width: 100,
              },
            ]}
            defaultPageSize={10}
            showPaginationBottom={true}
            className="-striped -highlight"
            data={Spots}
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

export default SpotTable;
