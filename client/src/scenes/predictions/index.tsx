import { useTheme } from '@mui/material/styles'; 
import { useState, useMemo } from 'react';
import { useGetKpisQuery } from '../../state/api';
import DashboardBox from '../../components/DashboardBox';
import FlexBetween from '../../components/FlexBetween';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Label } from 'recharts';
import regression, { DataPoint } from "regression";

type Props = {};

const Predictions = (props: Props) => {
  const theme = useTheme(); // Fixed variable name
  const [isPredictions, setIsPredictions] = useState(false); // Fixed state declaration
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: Array<DataPoint> = monthData.map(({ revenue }, i: number) => {
      return [i, revenue];
    });

    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1], // Fixed key name
      };
    });
  }, [kpiData]);

  return (
    <>
      <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
        <FlexBetween m="1rem 2.5rem" gap="0.9rem">
          <Box>
            <Typography variant="h3">Revenue and Predictions</Typography>
            <Typography variant="h6">Revenue Based on a Linear Regression Model</Typography> {/* Fixed typo */}
          </Box>
          <Button
            onClick={() => setIsPredictions(!isPredictions)}
            sx={{
              color: "#242427",
              backgroundColor: "#6b6d74",
              boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)",
            }}
          >
            Show Predicted Revenue
          </Button>
        </FlexBetween>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 20,
              right: 75,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#48494e" />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
              <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis
              domain={[12000, 26000]}
              axisLine={{ strokeWidth: '0' }}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            >
              <Label value="Revenue in USD" angle={-90} offset={-5} position="insideLeft" />
            </YAxis>

            <Tooltip />
            <Legend verticalAlign="top" />

            <Line
              type="monotone"
              dataKey="Actual revenue"
              stroke="#1f2026"
              strokeWidth={0}
              dot={{ strokeWidth: 5 }}
            />
            <Line type="monotone" dataKey="Regression Line" stroke="#8884d8" dot={false} />
            {isPredictions && (
              <Line strokeDasharray="5 5" dataKey="Predicted Revenue" stroke="#f2b455" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Predictions;
