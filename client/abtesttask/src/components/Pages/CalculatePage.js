import React, {useEffect, useState} from 'react';
import {Col, Container, Form, FormSelect, Row, Stack} from "react-bootstrap";
import APIService from "../../API/APIService";
import Loader from "../UI/Loader";
import Histogram from "../Histogram";



const CalculatePage = () => {

     const [areUsers, setAreUsers] = useState(false);
     const [scale, setScale] = useState("linear");
     const [isStatisticsLoading, setIsStatisticsLoading] = useState(false);
     const [statistics, setStatistics] = useState({average: 0, median: 0, percentile10: 0, percentile90:0,rollingRetentionDay:0 , distribution:[{value:0, number:0}]});

    async function fetchStatistics() {
        setIsStatisticsLoading(true);
        const response = await APIService.getStatistics();
        if (response.status !== 404){
            setAreUsers(true);
        }
        setStatistics(response.data);
        setIsStatisticsLoading(false);
    }
    useEffect(() => {
        fetchStatistics()
    },[])

    return (
        <Container>
            {isStatisticsLoading
            ?  <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            : <div>{ areUsers ? <div className="mt-3 mb-3">
                <Row className="mb-3">
                    <Col>
                        <Stack  gap={3} style={{fontSize:"x-large"}}>
                            <div>Rolling retention 7 days: {statistics.rollingRetentionDay} %</div>
                            <div>Average: {statistics.average}</div>
                            <div>Median: {statistics.median}</div>
                        </Stack>
                    </Col>
                    <Col>
                        <Stack  gap={3} style={{fontSize:"x-large"}}>
                            <div>10th percentile: {statistics.percentile10}</div>
                            <div>90th percentile: {statistics.percentile90}</div>
                        </Stack>
                    </Col>
                </Row>
                <Form as={Row}>
                    <Col xs={3}>
                        <FormSelect onChange={evt => {setScale(evt.target.value)}}>
                            <option value='linear'>Linear scale</option>
                            <option value='logarithmic'>Logarithmic scale</option>
                        </FormSelect>
                    </Col>
                </Form>
                <Histogram distribution={statistics.distribution} scale={scale}></Histogram>
                </div>
                : <div className="mt-3" style={{fontSize:"x-large"}}>No user information was found</div>
                }</div>
            }
        </Container>
    );
};

export default CalculatePage;