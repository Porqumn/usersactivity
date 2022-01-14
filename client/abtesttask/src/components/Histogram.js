import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Histogram = ({distribution, scale}) => {


    const [sortedDistribution, setSortedDistribution] = useState([]);


    function sortValues() {
        setSortedDistribution(distribution.sort((a, b) => (a.value > b.value) ? 1 : -1))
    }

    useEffect(() => {
        sortValues()
    }, [])

    return (
        <div className="uk-container">
            <Bar
                datasetIdKey='id'
                data={{
                    labels: sortedDistribution.map(x => x.value),
                    datasets: [{
                        label: 'Sum of users',
                        data: sortedDistribution.map(x => x.number),
                    }]
                }}
                options={{
                    scales: {
                        x: {
                            type: scale,
                            title: {
                                display: true,
                                text: "Lifespan users in days"
                            }
                        },
                        y: {
                            type: scale,
                            title: {
                                display: true,
                                text: "Sum of users"
                            },
                            beginAtZero: true
                        },
                    }
                }}
            />
        </div>

    );
};

export default Histogram;