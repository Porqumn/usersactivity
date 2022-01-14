import React, {useEffect, useState} from 'react';
import APIService from "../../API/APIService";
import Loader from "../UI/Loader";
import Histogram from "../Histogram";


const CalculatePage = () => {

    const [areUsers, setAreUsers] = useState(true);
    const [scale, setScale] = useState("linear");
    const [isStatisticsLoading, setIsStatisticsLoading] = useState(false);
    const [statistics, setStatistics] = useState({
        average: 0,
        median: 0,
        percentile10: 0,
        percentile90: 0,
        rollingRetentionDay: 0,
        distribution: [{value: 0, number: 0}]
    });

    async function fetchStatistics() {
        setIsStatisticsLoading(true);
        const response = await APIService.getStatistics();
        if (response.status === 404) {
            setAreUsers(false);
        }
        setStatistics(response.data);
        setIsStatisticsLoading(false);
    }

    useEffect(() => {
        fetchStatistics()
    }, [])

    return (
        <div className="uk-container">
            {isStatisticsLoading
                ? <Loader/>
                : <div className="uk-text-large uk-margin-top">{areUsers ?
                    <div>
                        <div className="uk-grid uk-child-width-1-3">
                            <div>
                                <div className="uk-margin-small-bottom">Rolling retention 7
                                    day: {statistics.rollingRetentionDay === -1 ? "value can not be calculated because there is no users registered in the system 7 days ago or earlier" :
                                        statistics.rollingRetentionDay + "%"}</div>
                                <div className="uk-margin-small-bottom">Average: {statistics.average}</div>
                                <div className="uk-margin-medium-bottom">Median: {statistics.median}</div>
                            </div>
                            <div>
                                <div className="uk-margin-small-bottom">10th percentile: {statistics.percentile10}</div>
                                <div className="uk-margin-small-bottom">90th percentile: {statistics.percentile90}</div>
                            </div>
                        </div>
                        <select className="uk-select uk-margin-medium-bottom uk-width-1-3" onChange={evt => {
                            setScale(evt.target.value)
                        }}>
                            <option value='linear'>Linear scale</option>
                            <option value='logarithmic'>Logarithmic scale</option>
                        </select>
                        <Histogram distribution={statistics.distribution} scale={scale}></Histogram>
                    </div>
                    : <div>No user information was found</div>
                }
                </div>
            }
        </div>
    );
};

export default CalculatePage;