import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Card, CardBody, Col, Row } from "reactstrap";
import sseClient from "./sseGoogleMap";
import spotService from "../../../_spservices/_spconfigurations/spots.service";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.4378698,
  lng: -3.8196208,
};

const SpotsLocationMap = () => {
  const [selected, setSelected] = useState({});
  const [spotData, setSpotData] = useState([]);

  useEffect(() => {
    getSpotList();
  }, []);

  const getSpotList = () => {
    spotService
      .getAll()
      .then((response) => {
        setSpotData(response.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const data = sseClient.useEventSource();
  const spotsList = spotData.map((spot) => {
    return {
      spotId: spot.spotId,
      name: spot.attributes.name,
      location: { lat: spot.attributes.latitude, lng: spot.attributes.longitude },
    };
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBJzdmyF7qWV1UtCpmEvBt4GUEYMnshNWU",
  });

  const onSelect = (item) => {
    setSelected(item);
  };

  return isLoaded ? (
    <Row>
        <Col sm={12} md={12}>
            <Card>
                <CardBody>
                <h4 className="mb-4">Spots Location</h4>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {/* Child components, such as markers, info windows, etc. */}
                    {spotsList.map((item) => {
                    return (
                        <Marker
                        key={item.spotId}
                        position={item.location}
                        onMouseOver={() => onSelect(item)}
                        />
                    );
                    })}
                    {selected.location && (
                    <InfoWindow
                        position={selected.location}
                        onCloseClick={() => setSelected({})}
                    >
                        <div>
                        <h6>{selected.name}</h6>
                        <div>In: {data.valueIn}</div>
                        <div>Limit: {data.valueLimit}</div>
                        <div>Out: {data.valueOut}</div>
                        </div>
                    </InfoWindow>
                    )}
                </GoogleMap>
                </CardBody>
            </Card>
        </Col>
    </Row>
  ) : (
    <></>
  );
};

export default SpotsLocationMap;
