import { Use_feature } from "../hooks/use_feature";
import Table_MUIX from "../components/Table_MUI";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

const InspectionCompleteRecord = () => {
  const { dataMainTable, mainTableLoading } = Use_feature();

  const mainTableColumns: GridColDef[] = [
    {
      field: "create_date",
      headerName: "Create Date",
      width: 190,
      renderCell: (params: any) => {
        return (
          <div className="text-sm md:text-base overflow-hidden text-ellipsis">
            {dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
    {
      field: "update_date",
      headerName: "Update Date",
      width: 190,
      renderCell: (params: any) => {
        return (
          <div className="text-sm md:text-base overflow-hidden text-ellipsis">
            {dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
    { field: "lot_no", headerName: "Lot No", width: 150 },
    { field: "product_name", headerName: "Product Name", width: 180 },
    { field: "process", headerName: "Process", width: 150 },
    {
      field: "total_sheet",
      headerName: "Total Sheet",
      width: 130,
      type: "number",
    },
    { field: "insp_id", headerName: "Inspector ID", width: 130 },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 190,
      renderCell: (params: any) => {
        return (
          <div className="text-sm md:text-base overflow-hidden text-ellipsis">
            {dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
    {
      field: "pkr_remain_pcs",
      headerName: "PKR Remain (pcs)",
      width: 150,
      type: "number",
    },
    {
      field: "pkr_tear_pcs",
      headerName: "PKR Tear (pcs)",
      width: 150,
      type: "number",
    },
    {
      field: "pic_incomplete_pcs",
      headerName: "PIC Incomplete (pcs)",
      width: 170,
      type: "number",
    },
    {
      field: "pic_misposition_pcs",
      headerName: "PIC Misposition (pcs)",
      width: 180,
      type: "number",
    },
    { field: "adh_flow_flow", headerName: "ADH Flow", width: 130 },
    {
      field: "mat_remain_pcs",
      headerName: "Mat Remain (pcs)",
      width: 160,
      type: "number",
    },
    { field: "others_rej", headerName: "Others Reject", width: 150 },
    {
      field: "stop_time",
      headerName: "Stop Time",
      width: 190,
      renderCell: (params: any) => {
        return (
          <div className="text-sm md:text-base overflow-hidden text-ellipsis">
            {dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
    { field: "remark", headerName: "Remark", width: 200 },
    {
      field: "bodysmall_ng_pcs",
      headerName: "Body Small NG (pcs)",
      width: 180,
      type: "number",
    },
    {
      field: "bodybig_ng_pcs",
      headerName: "Body Big NG (pcs)",
      width: 180,
      type: "number",
    },
    {
      field: "acf_ng_pcs",
      headerName: "ACF NG (pcs)",
      width: 150,
      type: "number",
    },
    {
      field: "bodysmall_acc_pcs",
      headerName: "Body Small Acc (pcs)",
      width: 180,
      type: "number",
    },
    {
      field: "bodybig_acc_pcs",
      headerName: "Body Big Acc (pcs)",
      width: 180,
      type: "number",
    },
    {
      field: "acf_acc_pcs",
      headerName: "ACF Acc (pcs)",
      width: 150,
      type: "number",
    },
    {
      field: "time_finish",
      headerName: "Time Finish",
      width: 190,
      renderCell: (params: any) => {
        return (
          <div className="text-sm md:text-base overflow-hidden text-ellipsis">
            {dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table_MUIX
        datas={dataMainTable}
        columns={mainTableColumns}
        not_show_Count={false}
        loading={mainTableLoading}
        height={800}
      />
    </div>
  );
};
export default InspectionCompleteRecord;
