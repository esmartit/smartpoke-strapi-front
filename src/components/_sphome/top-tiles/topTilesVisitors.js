import React from 'react';
import {
    Row,
    Card,
    CardBody
} from 'reactstrap';

import AllVisitorsCount from "./allVisitorsCount";
import TodayVisitorsCount from "./todayVisitorsCount";
import NewVisitorsCount from "./newVisitorsCount";
import NowVisitorsCount from "./nowVisitorsCount";

const TopTilesVisitors = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-2">Unique Visitors</h4>
                <Row>
                    <AllVisitorsCount />
                    <TodayVisitorsCount />
                    <NewVisitorsCount />
                    <NowVisitorsCount />
                </Row>
            </CardBody>
        </Card>
    );
}

export default TopTilesVisitors;