import React, { useState, useEffect } from "react";
import countryService from "../../../_spservices/_spmaintenances/_splocations/countries.service";

import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
} from "reactstrap";

function SpotLocation() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();

  const [alertMsg, setAlertMsg] = useState({});
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    getCountryList();
  }, []);

  const stateList = countryList.find((country) => country.id === parseInt(selectedCountry));
  const cityList = stateList?.attributes.states.data.find((state) => state.id === parseInt(selectedState));
  const zipCodeList = cityList?.attributes.cities.data.find((city) => city.id === parseInt(selectedCity));

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

  return (
    <Row form>
        <Col sm={12} md={3}>
            <FormGroup>
                <Label for="selectCountry">Countries</Label>
                <Input
                    type="select"
                    name="countryId"
                    id="countryId"
                    defaultValue=""
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                    <option value=""> -- All Countries -- </option>
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
        <Col sm={12} md={3}>
            <FormGroup>
                <Label for="selectState">States</Label>
                <Input
                    type="select"
                    name="stateId"
                    id="stateId"
                    defaultValue=""
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={!selectedCountry}
                    >
                    <option value=""> -- All States -- </option>
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
        <Col sm={12} md={3}>
            <FormGroup>
                <Label for="selectCity">Cities</Label>
                <Input
                    type="select"
                    name="cityId"
                    id="cityId"
                    defaultValue=""
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                    >
                    <option value=""> -- All Cities -- </option>
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
        <Col sm={12} md={3}>
            <FormGroup>
                <Label for="selectZipCode">ZipCodes</Label>
                <Input
                    type="select"
                    name="zipCode"
                    id="zipCode"
                    defaultValue={[]}
                    multiple
                    disabled={!selectedCity}
                    >
                    <option value=""> -- All ZipCodes -- </option>                    
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
  );
}

export default SpotLocation;
