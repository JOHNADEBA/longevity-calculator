import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import styles from "./Results.module.scss";

import { useGlobalContext } from "../../services/context";
import { ChartData, ResultsModalInterface } from "../../types";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "../chart/PieChart";

Chart.register(CategoryScale);

const Result = ({
    showResultsModal,
    toggleResultsModal,
}: ResultsModalInterface) => {
    const { message, graphData } = useGlobalContext();

    const backgroundColor = [
        "#e379cb",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
        "#8d0e5d",
        "#4eb53e",
    ];

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const [chartData, setChartData] = useState<ChartData>({});

    React.useEffect(() => {
        setChartData({
            labels: graphData?.map((label) => label.key?.toUpperCase()),
            datasets: [
                {
                    data: graphData?.map((label) => label.value),
                    backgroundColor: backgroundColor,
                    borderWidth: 0,
                },
            ],
        });
    }, [graphData]);

    return (
        <Modal
            open={showResultsModal}
            onClose={toggleResultsModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={`${styles.resultsModal} `}
            sx={{
                position: "absolute" as "absolute",
                top: 1,
                left: 0,
                backgroundColor: "black",
                height: "100vh"
            }}
        >
            <Box className={`${styles.modalcontainer} modal-container`}>
                <Box className={`${styles.header} modal-header`}>
                    <h5 className="t-heading-h5">Results</h5>
                </Box>
                <Box className={`${styles.body} modal-content`}>
                    <h5 className={styles.subtitle}>{message}</h5>

                    {chartData && (
                        <Box className={styles.chart}>
                            <PieChart chartData={chartData} options={options} />
                        </Box>
                    )}
                </Box>

                <p className="seperator"></p>
                <Box className="modal-footer">
                    <div className={styles.actionButton}>
                        <Button
                            variant="text"
                            className={`${styles.tagBlackColor} btn-xs u-margin-right-16`}
                            onClick={toggleResultsModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Box>
        </Modal>
    );
};

export default Result;
