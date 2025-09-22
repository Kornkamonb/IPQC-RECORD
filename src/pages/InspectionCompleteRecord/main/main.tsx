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
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <div>{dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      field: "update_date",
      headerName: "Update Date",
      width: 190,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <div>{dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      field: "lot_no",
      headerName: "Lot No",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "process",
      headerName: "Process",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "total_sheet",
      headerName: "Total Sheet",
      width: 130,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "insp_id",
      headerName: "Inspector ID",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 190,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <div>{dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      field: "pkr_remain_pcs",
      headerName: "PKR Remain (pcs)",
      width: 150,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pkr_tear_pcs",
      headerName: "PKR Tear (pcs)",
      width: 150,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pic_incomplete_pcs",
      headerName: "PIC Incomplete (pcs)",
      width: 170,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pic_misposition_pcs",
      headerName: "PIC Misposition (pcs)",
      width: 180,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "adh_flow_flow",
      headerName: "ADH Flow",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mat_remain_pcs",
      headerName: "Mat Remain (pcs)",
      width: 160,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "others_rej",
      headerName: "Others Reject",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stop_time",
      headerName: "Stop Time",
      width: 190,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <div>{dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bodysmall_ng_pcs",
      headerName: "Body Small NG (pcs)",
      width: 180,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bodybig_ng_pcs",
      headerName: "Body Big NG (pcs)",
      width: 180,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "acf_ng_pcs",
      headerName: "ACF NG (pcs)",
      width: 150,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bodysmall_acc_pcs",
      headerName: "Body Small Acc (pcs)",
      width: 180,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "bodybig_acc_pcs",
      headerName: "Body Big Acc (pcs)",
      width: 180,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "acf_acc_pcs",
      headerName: "ACF Acc (pcs)",
      width: 150,
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "time_finish",
      headerName: "Time Finish",
      width: 190,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <div>{dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
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
