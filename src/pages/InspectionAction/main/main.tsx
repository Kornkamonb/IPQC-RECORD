import { Use_feature } from "../hooks/use_feature";
import Table_MUIX from "../components/Table_MUI";
import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import ActionDialog from "../components/ActionDialog";

const InspectionAction = () => {
  const {
    dataMainTable,
    mainTableLoading,
    handleUpdateAction,
    openActionDialog,
    handleSubmitAction,
    setOpenActionDialog,
    selectedRow,
  } = Use_feature();

  const mainTableColumns: GridColDef[] = [
    {
      field: "product_name",
      headerName: "Product Name",
      width: 180,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "lot_no",
      headerName: "Lot No",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "process",
      headerName: "Process",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "insp_id",
      headerName: "Insp ID",
      width: 120,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "proc_rej",
      headerName: "Proc Rej",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "proc_rej_judge",
      headerName: "Judge",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            params.value === "BLOCK"
              ? "bg-red-500 text-white"
              : params.value === "PASS"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {params.value || "-"}
        </span>
      ),
    },
    {
      field: "other_rej",
      headerName: "Other Rej",
      width: 120,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "stop_time",
      headerName: "Stop Time",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const date = params.value
          ? dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")
          : "-";
        return (
          <span style={{ fontWeight: 500, color: "#1e88e5" }}>{date}</span>
        );
      },
    },
    {
      field: "action_detail",
      headerName: "Action Detail",
      width: 450,
      headerAlign: "center",
      align: "left",
      renderCell: (params: any) => {
        const row = params.row;

        // ✅ ถ้ามีเวลา finish แสดงผลเวลา
        if (row.action_detail) {
          return <div>{params.value}</div>;
        }

        // ✅ แสดงปุ่มกด action โดยไม่เช็คเงื่อนไข disable
        return (
          <div className="flex items-center justify-center w-full">
            <button
              onClick={() => handleUpdateAction(row)}
              className="
                flex items-center justify-center gap-2
                px-3 py-1.5 rounded-full shadow-md transition-all duration-300
                bg-blue-400 hover:bg-blue-600 text-black
                hover:text-white hover:scale-105 hover:shadow-lg
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
            </button>
          </div>
        );
      },
    },
    {
      field: "action_by",
      headerName: "Action By",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        params.value ? (
          <span>{params.value}</span>
        ) : (
          <span className="text-gray-400 italic">wait update</span>
        ),
    },
    {
      field: "action_date",
      headerName: "Action Date",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const date = params.value ? (
          dayjs(params.value).format("YYYY-MM-DD HH:mm:ss")
        ) : (
          <span className="text-gray-400 italic">wait update</span>
        );
        return <span>{date}</span>;
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

      <ActionDialog
        open={openActionDialog}
        onClose={() => setOpenActionDialog(false)}
        id={selectedRow?.id || ""} // ✅ ป้องกันกรณี null
        onSubmit={handleSubmitAction}
        initialData={{
          action_detail: selectedRow?.action_detail || "",
          action_by: selectedRow?.action_by || "",
        }}
      />
    </div>
  );
};
export default InspectionAction;
