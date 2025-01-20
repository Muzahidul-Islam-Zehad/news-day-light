import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Chart from "react-google-charts";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";


const Statistics = () => {

    const axiosSecure = useAxiosSecure();
    const { data: publicationData = [], isLoading } = useQuery({
        queryKey: ['publisher-article-count'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/publisher/article/count');
            return data;
        }
    });
    const { data: AllArticles = [], isLoading: loading } = useQuery({
        queryKey: ['all-articles-approved'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-articles/approved`);
            return data;
        }
    });

    if(isLoading || loading)
    {
        return <LoadingSpinner></LoadingSpinner>
    }

    const data = [
        ["Publisher Name", "Article Count"],
        ...publicationData.map(o => [o.publisherName, o.articleCount]),
    ];

    const lineData = [
        ["Article Title", "Total View"],
        ...AllArticles.map(o => [o.articleTitle, o.totalViewCount]),
    ]


    const options = {
        title: "Article published by publisher",
        pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
        is3D: true, // Enables 3D view
        // slices: {
        //   1: { offset: 0.2 }, // Explodes the second slice
        // },
        pieStartAngle: 100, // Rotates the chart
        sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#233238",
                fontSize: 14,
            },
        },
        colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
    };


    const optionsForColumnChart = {
        title: "Articles Published by Each Publisher",
        chartArea: { width: "50%" }, // Adjusts the chart area
        hAxis: {
            title: "Publishers",
            minValue: 0,
        },
        vAxis: {
            title: "Number of Articles",
        },
        legend: { position: "none" }, // Hides the legend
    };

    const optionsForLineChart = {
        title: "Articles view count",
        hAxis: {
            title: "Article Name", // Horizontal axis title
        },
        vAxis: {
            title: "View Count", // Vertical axis title
        },
        curveType: "function", // Smooth curves
        legend: { position: "bottom" }, // Legend position
    };

    console.log(publicationData);
    return (
        <div>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />

            <Chart
                chartType="ColumnChart"
                data={data}
                options={optionsForColumnChart}
                width={"100%"}
                height={"400px"}
            />
            <Chart
                chartType="LineChart"
                data={lineData}
                options={optionsForLineChart}
                width={"100%"}
                height={"400px"}
            />
        </div>
    );
};

export default Statistics;