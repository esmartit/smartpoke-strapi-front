import React from 'react';
import {
    Row,
    Card,
    CardBody
} from 'reactstrap';

import InAvgDwellTime from "./monthlyInAvgDwellTime";
import InVisitsFrequency from "./monthlyInVisitsFrequency";

const TopTilesMonthlyIN = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-2">Monthly IN</h4>
                <Row>
                    <InAvgDwellTime />
                    <InVisitsFrequency />
                </Row>
            </CardBody>
        </Card>
    );
}

export default TopTilesMonthlyIN;