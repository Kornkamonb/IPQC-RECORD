import { Use_feature } from "../hooks/use_feature";
import Table_MUIX from "../components/Table_MUI";
import Tooltip from "@mui/material/Tooltip";
import { GridColDef } from "@mui/x-data-grid";
import DialogCreateHeader from "../components/dialogCreateHeader";
import { Dialog } from "@mui/material";
import { HandleFunction } from "../function/function";
import DialogEditRecord from "../components/dialogEdit";
import dayjs from "dayjs";
import DialogConfirmPassword from "../components/dialogConfirmPassword";
import DialogRepair from "../components/dialogRepair";
import DialogInspectorNames from "../components/dialogInputIDInspector";
import DialogTotalSheet from "../components/dialogInputTotalSheet";

const PKRInspectionRecord = () => {
  const {
    openHeaderDialog,
 
    handleClickCreateHeader,
    handleCloseHeaderDialog,
  
    handleClickEdit,
    openEditDialog,
    handleCloseEditDialog,
    handleSaveEdit,
    selectedRow,
   
    openRepairDialog,
    setOpenRepairDialog,
    handleClickRepair,
   
    
 
  } = HandleFunction();

  const { dataMainTable, fetchMainTableData, MainTableLoading,    handleSaveTotalSheet,
    handleOpenTotalSheetDialog,
    handleCloseTotalSheetDialog,openTotalSheetDialog, handleOpenInspectorDialog,
    handleOpenConfirmDialog,
    handleConfirmDialog,
    setOpenConfirmDialog,
    openConfirmDialog,
    openInspectorDialog,
    setOpenInspectorDialog,
    handleSaveInspectorNames,
    handleCloseopenInspectorDialog } = Use_feature();

  const pocketInspectionColumns: GridColDef[] = [
    {
      field: "id",
      headerName: "Edit",
      width: 60,
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
          </button>
        </div>
      ),
    },
  
    {
      field: "time_finish",
      headerName: "LD check",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        const row = params.row;

        if (row.time_finish) {
          return (
            <div>{dayjs(row.time_finish).format("YYYY-MM-DD HH:mm:ss")}</div>
          );
        }

        const isDisabled = !row.stop_time; // ❌ ถ้า stop_time เป็น null => disable ปุ่ม

        return (
          <div className="flex items-center justify-center w-full">
            <Tooltip
              title="กรุณากรอก result ให้ครบก่อน check"
              placement="top"
              arrow
              disableHoverListener={!isDisabled} // ปิด tooltip ถ้าไม่ disable
            >
              <span>
                {" "}
                {/* จำเป็นต้องใช้ span เพื่อให้ tooltip ทำงานกับ disabled button */}
                <button
                  onClick={() => !isDisabled && handleOpenConfirmDialog(row)}
                  disabled={isDisabled}
                  className={`
                flex items-center justify-center gap-2
                px-3 py-1.5 rounded-full shadow-md transition-all duration-300
                ${
                  isDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-600 text-black hover:text-white hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                }
              `}
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
                </button>
              </span>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "start_time",
      headerName: "Start",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        const value = params.value;

        if (!value) {
          return <span className="text-gray-400 italic">wait</span>;
        }

        const date = dayjs(value).format("YYYY-MM-DD");
        const time = dayjs(value).format("HH:mm");

        return (
          <div className="flex flex-col items-center">
            <span>{date}</span>
            <span
              className="
                px-2 py-0.5 rounded-full text-xs font-semibold
                bg-green-100 text-green-800
              "
            >
              {time}
            </span>
          </div>
        );
      },
    },
    {
      field: "stop_time",
      headerName: "Stop",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        const value = params.value;

        if (!value) {
          return <span className="text-gray-400 italic">wait</span>;
        }

        const date = dayjs(value).format("YYYY-MM-DD");
        const time = dayjs(value).format("HH:mm");

        return (
          <div className="flex flex-col items-center">
            <span>{date}</span>
            <span
              className="
                px-2 py-0.5 rounded-full text-xs font-semibold
                bg-green-100 text-green-800
              "
            >
              {time}
            </span>
          </div>
        );
      },
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        const value = params.value;

        return (
          <div className="flex flex-col items-center">
            <span
              className="
                px-2 py-0.5 rounded-full text-xs font-semibold
                 text-gray-800
              "
            >
              {value}
            </span>
          </div>
        );
      },
    },
    {
      field: "lot_no",
      headerName: "Lot No",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        const value = params.value;

        return (
          <div className="flex flex-col items-center">
            <span
              className="
                px-2 py-0.5 rounded-full text-xs font-semibold
                 text-gray-800
              "
            >
              {value}
            </span>
          </div>
        );
      },
    },
    // {
    //   field: "process",
    //   headerName: "Process",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "total_sheet",
      headerName: "Total Sheet",
      width: 120,
      type: "number",
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        if (params.value) {
          return (
            <div className="flex items-center justify-center gap-2">
              <span>{params.value}</span>
              <button
                onClick={() => handleOpenTotalSheetDialog(params.row)}
                className="
                  px-2 py-2 bg-gray-300 hover:bg-yellow-500 
                  text-xs font-semibold rounded-full shadow-md
                  hover:scale-105 transition-all
                "
              >
                ✏️
              </button>
            </div>
          );
        }
        return (
          <div
            className="
          flex items-center justify-center"
          >
            <button
              onClick={() => handleOpenTotalSheetDialog(params.row)}
              className="
             flex items-center justify-center gap-2
                px-3 py-1.5 
                bg-lime-100 hover:bg-lime-600 
                text-black font-semibold
                cursor-pointer
                rounded-full shadow-md
                transition-all duration-300
                hover:scale-105 hover:shadow-lg hover:text-white
                focus:outline-none focus:ring-2 focus:ring-lime-300
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
              Sht qty
            </button>
          </div>
        );
      },
    },

    {
      field: "insp_id",
      headerName: "Inspector ID",
      width: 190,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        if (params.value) {
          return (
            <div className="flex items-end justify-end gap-2">
              <span>{params.value.replace(/_/g, ", ")}</span>
              <button
                onClick={() => handleOpenInspectorDialog(params.row)}
                className="
                  px-2 py-1 bg-gray-300 hover:bg-yellow-500 
                  text-xs font-semibold rounded-md shadow-md
                  hover:scale-105 transition-all
                "
              >
                ✏️
              </button>
            </div>
          );
        }
        return (
          <div
            className="
            flex items-center justify-center"
          >
            <button
              onClick={() => handleOpenInspectorDialog(params.row)}
              className="
            flex items-center justify-center gap-2
                px-3 py-1.5 
                bg-pink-100 hover:bg-pink-600 
                text-black font-semibold
                cursor-pointer
                rounded-full shadow-md
                transition-all duration-300
                hover:scale-105 hover:shadow-lg hover:text-white
                focus:outline-none focus:ring-2 focus:ring-pink-300
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
              ID
            </button>
          </div>
        );
      },
    },

    // {
    //   field: "pkr_remain_pcs",
    //   headerName: "PKR Remain (pcs)",
    //   width: 150,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "pkr_tear_pcs",
    //   headerName: "PKR Tear (pcs)",
    //   width: 150,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "pic_incomplete_pcs",
    //   headerName: "PIC Incomplete (pcs)",
    //   width: 170,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "pic_misposition_pcs",
    //   headerName: "PIC Misposition (pcs)",
    //   width: 180,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "adh_flow_flow",
    //   headerName: "ADH Flow",
    //   width: 130,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "mat_remain_pcs",
    //   headerName: "Mat Remain (pcs)",
    //   width: 160,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "others_rej",
    //   headerName: "Others Reject",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },

    // {
    //   field: "remark",
    //   headerName: "Remark",
    //   width: 200,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "bodysmall_ng_pcs",
    //   headerName: "Body Small NG (pcs)",
    //   width: 180,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "bodybig_ng_pcs",
    //   headerName: "Body Big NG (pcs)",
    //   width: 180,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "acf_ng_pcs",
    //   headerName: "ACF NG (pcs)",
    //   width: 150,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "bodysmall_acc_pcs",
    //   headerName: "Body Small Acc (pcs)",
    //   width: 180,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "bodybig_acc_pcs",
    //   headerName: "Body Big Acc (pcs)",
    //   width: 180,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "acf_acc_pcs",
    //   headerName: "ACF Acc (pcs)",
    //   width: 150,
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
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

     

      <Dialog
        open={openHeaderDialog}
        onClose={handleCloseHeaderDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogCreateHeader
          onClose={handleCloseHeaderDialog}
          fetchMainTableData={fetchMainTableData} // ✅ เพิ่มตรงนี้
        />
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

      {/* ===== Dialog สำหรับ Total Sheet ===== */}
      <Dialog
        open={openTotalSheetDialog}
        onClose={handleCloseTotalSheetDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 5,
            overflow: "hidden",
            maxWidth: 600,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogTotalSheet
          open={openTotalSheetDialog}
          onClose={handleCloseTotalSheetDialog}
          formData={{ total_sheet: selectedRow?.total_sheet }}
          onConfirm={handleSaveTotalSheet} // ✅ ฟังก์ชันที่เรียกใช้ UpdateTotalSheet ใน use_feature
        />
      </Dialog>

      <Dialog
        open={openInspectorDialog}
        onClose={() => setOpenInspectorDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 5,
            overflow: "hidden",
            maxWidth: 600,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          },
        }}
      >
        <DialogInspectorNames
          open={openInspectorDialog}
          onClose={handleCloseopenInspectorDialog}
          initialValue={selectedRow?.insp_id}
          onConfirm={handleSaveInspectorNames} // ✅ ฟังก์ชันที่เรียกใช้ UpdateInspectorID ใน use_feature
        />
      </Dialog>

       <div>
        <Table_MUIX
          datas={dataMainTable}
          columns={pocketInspectionColumns}
          not_show_Count={false}
          loading={MainTableLoading}
          height={800}
        />
      </div>
    </div>
  );
};

export default PKRInspectionRecord;
