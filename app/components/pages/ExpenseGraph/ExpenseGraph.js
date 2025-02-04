import React from 'react'
import CapGraph from "@capillarytech/cap-ui-library/CapGraph";
import NavBar from '../../organisms/NavBar/NavBar';
import { groupBy } from 'lodash';
function AnalysisGraph() {
    const dataObj = [
        { orderStage: "Order Authorized", key: "Sep 1", value: 100.9 },
        { orderStage: "Order Authorized", key: "Sep 2", value: 28.8 },
        { orderStage: "Order Authorized", key: "Sep 3", value: 39.3 },
        { orderStage: "Order Authorized", key: "Sep 4", value: 81.4 },
        { orderStage: "Order Authorized", key: "Sep 5", value: 47 },
        { orderStage: "Order Authorized", key: "Sep 6", value: 20.3 },
        { orderStage: "Order Authorized", key: "Sep 7", value: 24 },
        { orderStage: "Order Authorized", key: "Sep 8", value: 100.9 },
        { orderStage: "Order Pending", key: "Sep 1", value: 35.9 },
        { orderStage: "Order Pending", key: "Sep 2", value: 4.8 },
        { orderStage: "Order Pending", key: "Sep 3", value: 56.3 },
        { orderStage: "Order Pending", key: "Sep 4", value: 70.4 },
        { orderStage: "Order Dispatched", key: "Sep 1", value: 45 },
        { orderStage: "Order Dispatched", key: "Sep 2", value: 33 },
        { orderStage: "Order Dispatched", key: "Sep 3", value: 67 },
        { orderStage: "Order Delivered", key: "Sep 1", value: 56 },
        { orderStage: "Order Delivered", key: "Sep 2", value: 76 },
        { orderStage: "Order Delivered", key: "Sep 3", value: 87 },
      ];
  return (
    <>
    <NavBar />
    <CapGraph height={400} data={dataObj } xAxis='key' yAxis='value' legend={{
        marker: "circle",
          position: "bottom-left",
    }}
    graphList={[{
        type: "intervalStack",
        barColors: ["#BAE1FF", "#489FF2", "#1D61EE", "#2546B3"],
        stackBy: "orderStage",
        groupBy: "orderStage",
    }]}
    size={12}
    />
    </>
  )
}
export default AnalysisGraph