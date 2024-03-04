import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import dayjs from 'dayjs';
import useStore from '../../../store';
import { useParams } from 'react-router-dom';

const StockPriceMovementChart: React.FC = () => {
    const { slug } = useParams()
    const { dataChart, fetchChart } = useStore();
    const chartRef = useRef<any>(null);

    useEffect(() => {
        fetchChart(slug)

        const dates: any = dataChart?.prices[0]?.map((item: any) => {
            return dayjs.unix(item[0] / 1000).format('DD MMM YYYY');
        });
        const prices: any = dataChart?.prices[0]?.map((item: any) => {
            return item[1];
        });
        const options: ApexCharts.ApexOptions = {
            series: [{
                name: slug,
                data: prices
            }],
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            title: {
                text: 'Stock Price Movement',
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            yaxis: {
                labels: {
                    formatter: prices,
                },
                title: {
                    text: 'Price'
                },
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    formatter: dates,
                },
            }
        };
        // console.log(prices, "<P", dates, "<D")

        if (chartRef.current) {
            const chart = new ApexCharts(chartRef.current, options);
            chart.render();
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.innerHTML = '';
            }
        };

    }, []);
    // console.log(dataChart, "<DC")

    return <div ref={chartRef} />;
};

export default StockPriceMovementChart;
