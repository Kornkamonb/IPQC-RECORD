import { Use_feature } from "../hooks/use_feature";
import Table_MUIX from "../components/Table_MUI";
import MyAutocomplete from "../components/Autocomplete";
import { GridColDef } from "@mui/x-data-grid";
import DialogCreateHeader from "../components/dialogCreateHeader";
import { Button, Dialog } from "@mui/material";
import { Function } from "../function/function";
import DialogEditRecord from "../components/dialogEdit";

const PKRInspectionRecord = () => {
  const {
    openHeaderDialog,
    openConfirmDialog,
    handleClickCreateHeader,
    handleCloseHeaderDialog,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    handleClickEdit,
    openEditDialog,
    handleCloseEditDialog,
    handleSaveEdit,
    selectedRow,
  } = Function();

  const {
    selectedLot,
    setSelectedLot,

    lotDetail,

    dataMainTable,

    MainTableLoading,
  } = Use_feature();

  const pocketInspectionColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Edit",
      width: 180,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleClickEdit(params.row)}
        >
          Edit
        </Button>
      ),
    },
    { field: "create_date", headerName: "Create Date", width: 180 },
    { field: "update_date", headerName: "Update Date", width: 180 },
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
    { field: "start_time", headerName: "Start Time", width: 180 },
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
    { field: "stop_time", headerName: "Stop Time", width: 180 },
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
    { field: "time_finish", headerName: "Time Finish", width: 180 },
  ];

  return (
    <div className="p-4 space-y-4">
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickCreateHeader}
          className="rounded-full shadow-md"
        >
          Create Record
        </Button>
      </div>

      <div>
        <Table_MUIX
          datas={dataMainTable}
          columns={pocketInspectionColumns}
          not_show_Count={false}
          loading={MainTableLoading}
          height={800}
        />
      </div>

      <Dialog
        open={openHeaderDialog}
        onClose={handleCloseHeaderDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogCreateHeader onClose={handleCloseHeaderDialog} />
      </Dialog>

      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogEditRecord
          open={openEditDialog}
          rowData={selectedRow}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEdit}
        />
      </Dialog>
    </div>
  );
};

export default PKRInspectionRecord;
