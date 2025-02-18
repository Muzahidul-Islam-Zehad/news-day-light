import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Chart from "react-google-charts";
import LoadingSpinner from "../../../Components/LoadingSpinner/LoadingSpinner";
// import {  useState } from "react";
import useAuth from "../../../Hooks/useAuth";

const Statistics = () => {
    const axiosSecure = useAxiosSecure();
    const {darkMode} = useAuth()
    const { data: publicationData = [], isLoading } = useQuery({
        queryKey: ["publisher-article-count"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/publisher/article/count");
            return data;
        },
    });

    const { data: AllArticles = [], isLoading: loading } = useQuery({
        queryKey: ["all-articles-approved"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-articles/approved`);
            return data;
        },
    });

    // const [isDarkMode, setIsDarkMode] = useState(darkMode);
    // console.log(darkMode);

    // Detect Tailwind dark mode
    

    if (isLoading || loading) {
        return <LoadingSpinner />;
    }

    const data = [
        ["Publisher Name", "Article Count"],
        ...publicationData.map((o) => [o.publisherName, o.articleCount]),
    ];

    const lineData = [
        ["Article Title", "Total View"],
        ...AllArticles.map((o) => [o.articleTitle, o.totalViewCount]),
    ];

    const darkModeColors = ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"];
    const lightModeColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

    const options = {
        title: "Article published by publisher",
        titleTextStyle: { color: darkMode ? "#ffffff" : "#000000" },
        pieHole: 0.4,
        is3D: true,
        pieStartAngle: 100,
        sliceVisibilityThreshold: 0.02,
        backgroundColor: darkMode ? "#1F2937" : "#ffffff", // bg-gray-800 in dark mode
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: darkMode ? "#ffffff" : "#233238", // white text in dark mode
                fontSize: 14,
            },
        },
        colors: darkMode ? darkModeColors : lightModeColors,
    };

    const optionsForColumnChart = {
        title: "Articles Published by Each Publisher",
        titleTextStyle: { color: darkMode ? "#ffffff" : "#000000" }, // ✅ Corrected placement
        chartArea: { width: "50%" },
        hAxis: {
            title: "Publishers",
            minValue: 0,
            textStyle: { color: darkMode ? "#ffffff" : "#000000" },
            titleTextStyle: { color: darkMode ? "#ffffff" : "#000000" },
        },
        vAxis: {
            title: "Number of Articles",
            textStyle: { color: darkMode ? "#ffffff" : "#000000" },
            titleTextStyle: { color: darkMode ? "#ffffff" : "#000000" },
        },
        legend: { position: "none" },
        backgroundColor: darkMode ? "#1F2937" : "#ffffff",
    };
    
    const optionsForLineChart = {
        title: "Articles View Count",
        titleTextStyle: { color: darkMode ? "#ffffff" : "#000000" }, // ✅ Corrected placement
        hAxis: {
            title: "Article Name",
            textStyle: { color: darkMode ? "#ffffff" : "#000000" },
            titleTextStyle: { color: darkMode ? "#ffffff" : "#000000" },
        },
        vAxis: {
            title: "View Count",
            textStyle: { color: darkMode ? "#ffffff" : "#000000" },
            titleTextStyle: { color: darkMode ? "#ffffff" : "#000000" },
        },
        curveType: "function",
        legend: { position: "bottom", textStyle: { color: darkMode ? "#ffffff" : "#000000" } },
        backgroundColor: darkMode ? "#1F2937" : "#ffffff",
    };
    

    return (
        <div className="dark:bg-gray-900 dark:text-white p-6">
            <Chart chartType="PieChart" data={data} options={options} width={"100%"} height={"400px"} />

            <Chart chartType="ColumnChart" data={data} options={optionsForColumnChart} width={"100%"} height={"400px"} />

            <Chart chartType="LineChart" data={lineData} options={optionsForLineChart} width={"100%"} height={"400px"} />
        </div>
    );
};

export default Statistics;
