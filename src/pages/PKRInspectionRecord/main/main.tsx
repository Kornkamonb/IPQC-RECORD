import { Use_feature } from "../hooks/use_feature";
import Table_MUIX from "../components/Table_MUI";

import { GridColDef } from "@mui/x-data-grid";
import DialogCreateHeader from "../components/dialogCreateHeader";
import { Dialog } from "@mui/material";
import { HandleFunction } from "../function/function";
import DialogEditRecord from "../components/dialogEdit";
import dayjs from "dayjs";
import DialogConfirmPassword from "../components/dialogConfirmPassword";
import DialogRepair from "../components/dialogRepair";

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
    handleConfirmDialog,
    openRepairDialog,
    setOpenRepairDialog,
    handleClickRepair,
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
      headerAlign: "center",
      align: "center",
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
      width: 100,
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
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        if (params.value) {
          return <div>{dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")}</div>;
        }
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
          onRepair={handleClickRepair}
        />
      </Dialog>

      <DialogConfirmPassword
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={(password) => {
          handleConfirmDialog(password);
          setOpenConfirmDialog(false);
        }}
      />

      <DialogRepair
        open={openRepairDialog}
        rowData={selectedRow}
        onClose={() => setOpenRepairDialog(false)}
        onConfirm={(data) => handleClickRepair(data)} // ✅ ตรงนี้เรียก saveRepair()
      />
    </div>
  );
};

export default PKRInspectionRecord;
