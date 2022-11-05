import React, { useState, useEffect } from "react";
import {
    FormGroup,
    Input,
    Label
} from 'reactstrap';

const ActualHour = () => {
    const [time, setTime] = useState(new Date());
    const [timeString, setTimeString] = useState("");
    const [strTime, setStrTime] = useState(timeString);

    function objTimer() {
        var Actualhour = time.getHours();
        var Actualminute = time.getMinutes();
        var Actualsecond = time.getSeconds();

        var h = '0' + Actualhour;
        var m = '0' + Actualminute;
        var s = '0' + Actualsecond;
        setTimeString(h.substring(h.length - 2, h.length) + ':' + m.substring(m.length - 2, m.length) + ':'+ s.substring(s.length - 2, s.length));

        var checksec = (Actualsecond / 1);
        if (checksec % 1 == 0) {
            setStrTime(timeString);
        }
    }
    
    useEffect(() => {
        let i = setInterval(() => {
            setTime(new Date());
            objTimer();
        }, 1000);  
        return () => clearInterval(i);  
    });
  
    return (
        <FormGroup>
            <Label for="actualTime">Actual Time</Label>
            <Input
                type="text"
                name="actualTime"
                id="actualTime"
                step="1"
                disabled={true}
                defaultValue={strTime}
            />
        </FormGroup>
    );
}

export default ActualHour;
