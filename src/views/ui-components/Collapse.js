import React, { useState } from 'react';
import {
    Collapse,
    Button,
    Card,
    CardBody,
    CardTitle,
    UncontrolledCollapse,
    Fade,
    Row,
    Col
} from 'reactstrap';

const CollapseComponent = () => {

    const [collapse, setCollapse] = useState(false);
    const [collapse2, setCollapse2] = useState(false);
    const [status, setStatus] = useState('Closed');
    const [fadeIn, setFadeIn] = useState(true);

    const onEntering = () => setStatus('Opening...');

    const onEntered = () => setStatus('Opened');

    const onExiting = () => setStatus('Closing...');

    const onExited = () => setStatus('Closed');

    const toggle = () => setCollapse(!collapse);

    const toggle2 = () => setCollapse2(!collapse2);

    const toggle3 = () => setFadeIn(!fadeIn);

    return (
        <div>
            {/* --------------------------------------------------------------------------------*/}
            {/* Start Inner Div*/}
            {/* --------------------------------------------------------------------------------*/}
            {/* --------------------------------------------------------------------------------*/}
            {/* Row*/}
            {/* --------------------------------------------------------------------------------*/}
            <Row>
                <Col xs="12" md="4">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-3*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card>
                        <CardTitle className="bg-light border-bottom p-3 mb-0">
                            <i className="mdi mdi-elevator mr-2"> </i>
                Collapse
              </CardTitle>
                        <CardBody className="">
                            <Button
                                color="primary"
                                onClick={toggle.bind(null)}
                                style={{ 'marginBottom': '1rem' }}
                            >
                                Toggle
                </Button>
                            <Collapse isOpen={collapse}>
                                <Card className="border">
                                    <CardBody>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life
                                        accusamus terry richardson ad squid. Nihil anim keffiyeh
                                        helvetica, craft beer labore wes anderson cred nesciunt
                                        sapiente ea proident.
                    </CardBody>
                                </Card>
                            </Collapse>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" md="4">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-3*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card>
                        <CardTitle className="bg-light border-bottom p-3 mb-0">
                            <i className="mdi mdi-elevator mr-2"> </i>
                Collapse with Events
              </CardTitle>
                        <CardBody className="">
                            <Button
                                color="primary"
                                onClick={toggle2.bind(null)}
                                style={{ 'marginBottom': '1rem' }}
                            >
                                Toggle
                </Button>
                            <CardTitle>Current state: {status}</CardTitle>
                            <Collapse
                                isOpen={collapse2}
                                onEntering={onEntering.bind(null)}
                                onEntered={onEntered.bind(null)}
                                onExiting={onExiting.bind(null)}
                                onExited={onExited.bind(null)}
                            >
                                <Card className="border">
                                    <CardBody>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life
                                        accusamus terry richardson ad squid. Nihil anim keffiyeh
                                        helvetica, craft beer labore wes anderson cred nesciunt
                                        sapiente ea proident.
                    </CardBody>
                                </Card>
                            </Collapse>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" md="4">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-3*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card>
                        <CardTitle className="bg-light border-bottom p-3 mb-0">
                            <i className="mdi mdi-elevator mr-2"> </i>
                Uncontrolled Collapse
              </CardTitle>
                        <CardBody className="">
                            <Button
                                color="primary"
                                id="toggler"
                                style={{ 'marginBottom': '1rem' }}
                            >
                                Toggle
                </Button>
                            <UncontrolledCollapse toggler="#toggler">
                                <Card className="border">
                                    <CardBody>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Nesciunt magni, voluptas debitis similique porro a
                                        molestias consequuntur earum odio officiis natus, amet
                                        hic, iste sed dignissimos esse fuga! Minus, alias.
                    </CardBody>
                                </Card>
                            </UncontrolledCollapse>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" md="4">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-3*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card>
                        <CardTitle className="bg-light border-bottom p-3 mb-0">
                            <i className="mdi mdi-elevator mr-2"> </i>
                Fade Collapse
              </CardTitle>
                        <CardBody className="">
                            <Button color="primary" onClick={toggle3.bind(null)}>
                                Toggle Fade
                </Button>
                            <Fade in={fadeIn} tag="h5" className="mt-3">
                                <span className="text-primary font-medium">
                                    This content will fade in and out as the button is pressed
                  </span>
                            </Fade>
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
