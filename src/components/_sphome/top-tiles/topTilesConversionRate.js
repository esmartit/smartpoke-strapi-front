import React from 'react';
import {
    Row,
    Card,
    CardBody
} from 'reactstrap';

import ConversionRate from "./conversionRate";

const TopTilesConversionRate = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-2">Conversion Rate</h4>
                <Row>
                    <ConversionRate />
                </Row>
            </CardBody>
        </Card>
    );
}

export default TopTilesConversionRate;