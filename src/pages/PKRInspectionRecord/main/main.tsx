import { Use_feature } from "../hooks/use_feature";
import Table_MUIX from "../components/Table_MUI";
import MyAutocomplete from "../components/Autocomplete";
import { GridColDef } from "@mui/x-data-grid";
import DialogCreateHeader from "../components/dialogCreateHeader";
import { Button, Dialog } from "@mui/material";
import { HandleFunction } from "../function/function";
import DialogEditRecord from "../components/dialogEdit";
import dayjs from "dayjs";
import DialogConfirmPassword from "../components/dialogConfirmPassword";

const PKRInspectionRecord = () => {
  const {
    openHeaderDialog,
    openConfirmDialog,
    handleClickCreateHeader,
    handleCloseHeaderDialog,
    handleOpenConfirmDialog,

    setOpenConfirmDialog,
    handleClickEdit,
    openEditDialog,
    handleCloseEditDialog,
    handleSaveEdit,
    selectedRow,
    handleConfirm,
  } = HandleFunction();

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
      width: 100,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <div className="flex items-center justify-center">
          <button
            onClick={() => handleClickEdit(params.row)}
            className="
    flex items-center justify-center gap-2
    px-3 py-1.5 
    bg-yellow-300 hover:bg-yellow-600 
    text-black font-semibold
    cursor-pointer
    rounded-full shadow-md
    transition-all duration-300
    hover:scale-105 hover:shadow-lg hover:text-white
    focus:outline-none focus:ring-2 focus:ring-yellow-300
  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.651 1.651a1.875 1.875 0 010 2.652l-8.486 8.486a4.5 4.5 0 01-1.897 1.13l-3.518.88a.75.75 0 01-.92-.92l.88-3.518a4.5 4.5 0 011.13-1.897l8.486-8.486a1.875 1.875 0 012.652 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5V19.5A1.5 1.5 0 0118 21H6a1.5 1.5 0 01-1.5-1.5V6A1.5 1.5 0 016 4.5h5.379"
              />
            </svg>
            Edit
          </button>
        </div>
      ),
    },
    {
      field: "create_date",
      headerName: "Create Date",
      width: 180,
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
      width: 180,
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
      width: 180,
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
      width: 180,
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
      width: 180,
      renderCell: (params: any) => {
        // ถ้ามีค่าแล้ว -> return ค่าให้ DataGrid แสดง
        if (params.value) {
          return <span>{params.value}</span>;
        }

        // ถ้าไม่มีค่า -> แสดงปุ่ม Confirm
        return (
          <div className="flex items-center justify-center w-full">
            <button
              onClick={() => handleOpenConfirmDialog(params.row)}
              className="
                flex items-center justify-center gap-2
                px-3 py-1.5 
                bg-blue-400 hover:bg-blue-600 
                text-black font-semibold
                cursor-pointer
                rounded-full shadow-md
                transition-all duration-300
                hover:scale-105 hover:shadow-lg hover:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-300
              "
            >
              {/* ไอคอน + */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Confirm
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <div>
        <button
          onClick={handleClickCreateHeader}
          className="
    flex items-center justify-center gap-2
    px-4 py-2
    bg-green-400 hover:bg-green-600
    text-black font-semibold
    cursor-pointer
    rounded-full shadow-md
    transition-all duration-300
    hover:scale-105 hover:shadow-lg hover:text-white
    focus:outline-none focus:ring-2 focus:ring-green-300
  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create Record
        </button>
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
        PaperProps={{
          sx: {
            borderRadius: 5,
            overflow: "hidden",
            maxWidth: 750,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogEditRecord
          open={openEditDialog}
          rowData={selectedRow}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEdit}
        />
      </Dialog>

      <DialogConfirmPassword
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={(password) => {
          handleConfirm(password);
          setOpenConfirmDialog(false);
        }}
      />
    </div>
  );
};

export default PKRInspectionRecord;
