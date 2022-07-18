import React from "react";

import { Card, CardBody, Row, Col } from 'reactstrap';
import DailyGoalVisitor from './dailyGoalVisitor';
import DailyGoalRegistered from './dailyGoalRegistered';

const DailyGoal = () => {
    return(
        <Card>
            <CardBody>
                <h4 className="card-title mb-2">Daily Goals</h4>                         
                <DailyGoalVisitor />
                <DailyGoalRegistered />
            </CardBody>
        </Card>
    );
}

export default DailyGoal;

