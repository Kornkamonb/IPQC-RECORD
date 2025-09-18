import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import Table_MUIX from "../components/Table_MUI"; // ใช้ component ของคุณเอง
import { AdhFlowData } from "../hooks/use_feature";

// ✅ type ของข้อมูลแต่ละแถว
export interface JobItemData {
  iqi_job_id_header: string;
  stf_no: string;
  check_item: string;
  report_type: string;
  first_report: string | null;
  result: string | null;
  verify: boolean;
}

export interface TableRow {
  id: string;
  item_code: string;
  invoice: string;
  lot: string;
  [key: string]: any;
}

export interface JobItemDialogProps {
  open: boolean;
  onClose: () => void;
  itemCode: string | null;
  tableData: JobItemData[];
  MainTableData?: TableRow[];
  fetchResultDataForDialog: (
    id: string,
    checkItem: string
  ) => Promise<AdhFlowData[]>;
  setOpenResultDialog: (val: boolean) => void;
  handleVerify: (id: string) => Promise<void>;
  loading?: boolean;
}

const JobItemDialog: React.FC<JobItemDialogProps> = ({
  open,
  onClose,
  itemCode,
  tableData,
  fetchResultDataForDialog,
  setOpenResultDialog,
  handleVerify,
  loading = false,
}) => {
  const columns = [
    {
      field: "iqi_job_id_header",
      headerName: "Job ID Header",
      minWidth: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stf_no",
      headerName: "STF No",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "check_item",
      headerName: "Check Item",
      minWidth: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <button
          onClick={async () => {
            const data = await fetchResultDataForDialog(
              params.row.iqi_job_id_header,
              params.row.check_item
            );
            if (data.length > 0) {
              setOpenResultDialog(true);
            } else {
              alert("ไม่พบข้อมูลสำหรับรายการนี้");
            }
          }}
          className="
            inline-flex 
            items-center 
            px-4 py-1.5 
            bg-orange-200 
            text-amber-800
            text-sm 
            font-bold
            rounded-2xl                  
            cursor-pointer
            shadow-sm 
            transition-all 
            duration-200 
            hover:bg-orange-300 
            hover:shadow-md 
            active:scale-95
            focus:outline-none 
            focus:ring-2 
            focus:ring-orange-300
          "
        >
          {params.value || "View"}
        </button>
      ),
    },
    {
      field: "report_type",
      headerName: "Report Type",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "first_report",
      headerName: "First Report",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => params.value ?? "-",
    },
    {
      field: "result",
      headerName: "Result",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        const value = params.value;
        if (value?.toLowerCase() === "pass") {
          return (
            <span className="px-2 py-1 text-md font-semibold text-green-800 bg-green-100 rounded-full">
              PASS
            </span>
          );
        }
        if (value?.toLowerCase() === "fail") {
          return (
            <span className="px-2 py-1 text-md font-semibold text-red-800 bg-red-100 rounded-full">
              FAIL
            </span>
          );
        }
        return <span>-</span>;
      },
    },
    {
      field: "verify",
      headerName: "Verify",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) =>
        params.value ? (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "1.5rem" }}
          >
            ✅
          </span>
        ) : (
          <span>-</span>
        ),
    },
  ];

  const itemCodeParts = itemCode?.split("_") || [];
  const item = itemCodeParts[0] || "";
  const invoice = itemCodeParts[1] || "";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      {/* ✅ Header Section */}
      <DialogTitle>
        <div>
          <div className="flex items-center justify-center">
            <h2>
              <span className="mt-2 inline-flex items-center px-4 py-1 rounded-full text-xl font-semibold bg-blue-100 text-blue-800 ring-1 ring-blue-300 shadow-sm">
                Job ID : {itemCode}
              </span>
            </h2>
          </div>

          <div className="flex justify-between items-center mt-2 text-lg text-gray-600">
            {/* ฝั่งซ้าย: ข้อมูล Item/Invoice */}
            {itemCode ? (
              <div className="flex gap-8">
                <p>
                  <strong>Item :</strong> {item}
                </p>
                <p>
                  <strong>Invoice :</strong> {invoice}
                </p>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">ไม่มีข้อมูลหลัก</p>
            )}

            {/* ฝั่งขวา: ปุ่ม Verify */}
            <Button
              onClick={() => handleVerify(itemCode ?? "")}
              variant="contained"
              className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-lime-500 to-green-500 hover:from-emerald-400 hover:via-lime-400 hover:to-green-400 text-white font-semibold text-sm px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
            >
              Verify
            </Button>
          </div>
        </div>
      </DialogTitle>

      {/* ✅ Content Section */}
      <DialogContent>
        <div className="rounded-2xl border border-gray-200 shadow-inner p-3 bg-gray-50">
          <Table_MUIX
            datas={tableData}
            columns={columns}
            not_show_Count={false}
            loading={loading}
            height={500}
          />
        </div>

        {/* ✅ Footer ปุ่มปิด */}
        <div className="flex justify-end mt-4">
          <Button
            onClick={onClose}
            className="
          bg-gray-200 hover:bg-gray-300 
          text-gray-700 font-medium
          px-6 py-2 rounded-lg
          shadow-sm hover:shadow-md
          transition-all duration-200
        "
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobItemDialog;
