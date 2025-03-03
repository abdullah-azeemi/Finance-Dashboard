import { useTheme } from "@emotion/react";
import BoxHeader from "../../components/BoxHeader"; // Fix casing
import DashboardBox from "../../components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "../../state/api";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => [
        { name: key, value: value },
        { name: `${key} of Total`, value: totalExpenses - value },
      ]);
    }
  }, [kpiData]);

  return (
    <>
      {}
      <DashboardBox gridArea="g">
        <BoxHeader title="List of Products" sideText={`${productData?.length} products`} />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="150px"  
          sx={{
            "& .MuiDataGrid-root": {
              fontSize: "0.75rem",
              border: "none",
              color: palette.grey[300],
              backgroundColor: "transparent",
            },
            "& .MuiDataGrid-cell": {
              padding: "2px",
              fontSize: "0.7rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              fontSize: "0.8rem",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={20}
            rowHeight={30}
            hideFooter
            disableColumnMenu
            disableSelectionOnClick
            rows={productData || []}
            columns={[
              { field: "_id", headerName: "ID", flex: 1, minWidth: 80 },
              { field: "expense", headerName: "Expense", flex: 0.5, minWidth: 60, renderCell: (params: GridCellParams) => `$${params.value}` },
              { field: "price", headerName: "Price", flex: 0.5, minWidth: 60, renderCell: (params: GridCellParams) => `$${params.value}` }
            ]}
          />
        </Box>
      </DashboardBox>

      {}
      <DashboardBox gridArea="h">
        <BoxHeader title="Recent Orders" sideText={`${transactionData?.length} latest transactions`} />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="80px"
          sx={{
            "& .MuiDataGrid-root": {
              fontSize: "0.75rem",
              color: palette.grey[300],
              border: "none",
              backgroundColor: "transparent",
            },
            "& .MuiDataGrid-cell": {
              padding: "2px",
              fontSize: "0.7rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              fontSize: "0.8rem",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={20}
            rowHeight={30}
            hideFooter
            disableColumnMenu
            disableSelectionOnClick
            rows={transactionData || []}
            columns={[
              { field: "_id", headerName: "ID", flex: 1, minWidth: 80 },
              { field: "buyer", headerName: "Buyer", flex: 0.6, minWidth: 60 },
              { field: "amount", headerName: "Amount", flex: 0.4, minWidth: 50, renderCell: (params: GridCellParams) => `$${params.value}` },
              { field: "productIds", headerName: "Count", flex: 0.2, minWidth: 40, renderCell: (params: GridCellParams) => (params.value as Array<string>).length }
            ]}
          />
        </Box>
      </DashboardBox>

      {}
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={80} height={80}> {}
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={10}
                  outerRadius={20}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h6" fontSize="0.7rem">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
    </>
  );
};

export default Row3;

