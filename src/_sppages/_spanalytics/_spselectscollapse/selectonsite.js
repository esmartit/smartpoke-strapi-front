import React, { useState } from 'react';
import {
    Collapse,
    Button,
    Card,
    CardBody,
    FormGroup,
    Input,
    Label,
    Row,
    Col
} from 'reactstrap';

import ActualHour from '../../../components/_spdashboard/_spselectscollapse/actualtime';
import SpotLocation from '../../../components/_spdashboard/_spselectscollapse/spotlocation';

const CollapseComponent = () => {

    const [collapse, setCollapse] = useState(false);
    const toggle = () => setCollapse(!collapse);

    return (
        <div>
            {/* --------------------------------------------------------------------------------*/}
            {/* Start Inner Div*/}
            {/* --------------------------------------------------------------------------------*/}
            {/* --------------------------------------------------------------------------------*/}
            {/* Row*/}
            {/* --------------------------------------------------------------------------------*/}
            <Row>
                <Col xs="12" md="12">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-3*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card>
                        <CardBody className="">
                            <Button
                                color="primary"
                                onClick={toggle.bind(null)}
                                style={{ 'marginBottom': '1rem' }}
                            >
                                Select OnSite
                            </Button>
                            <Collapse isOpen={collapse}>
                                <Row form>
                                    <Col sm={3} md={2}>
                                        <FormGroup>
                                            <Label for="startTime">Start Time</Label>
                                            <Input
                                                type="time"
                                                name="startTime"
                                                id="startTime"
                                                step="1"
                                                defaultValue="00:00:00"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={3} md={2}>
                                        < ActualHour />
                                    </Col>
                                </Row>
                                < SpotLocation />
                            </Collapse>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* --------------------------------------------------------------------------------*/}
            {/* Row*/}
            {/* --------------------------------------------------------------------------------*/}
            {/* --------------------------------------------------------------------------------*/}
            {/* End Inner Div*/}
            {/* --------------------------------------------------------------------------------*/}
        </div>
    );
}

export default CollapseComponent;
