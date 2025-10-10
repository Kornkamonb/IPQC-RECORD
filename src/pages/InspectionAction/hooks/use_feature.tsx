import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export const Use_feature = () => {
  interface ActionRow {
    id: string;
    action_detail: string;
    action_by: string;
    [key: string]: any;
  }

  const [dataMainTable, setDataMainTable] = useState<[]>([]);
  const [mainTableLoading, setMainTableLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [openActionDialog, setOpenActionDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<ActionRow | null>(null);

  const fetchMainTableData = async () => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-action/get-main-table`;
    const params = {};

    try {
      setMainTableLoading(true);
      const response = await axios.get(url, { params });

      if (response.status === 200) {
        if (response.data.status === "OK") {
          if (response.data.data.length > 0) {
            setDataMainTable(response.data.data);
          } else {
            setDataMainTable([]);
            Swal.fire({
              icon: "info",
              title: "ไม่มีข้อมูล",
              text: "ไม่มีข้อมูลในตารางหลัก",
            });
          }
        }
      }
    } catch (err: any) {
      console.error("Main table fetch error:", err);
      setError(err.message || "Something went wrong");
      Swal.fire({
        title: "Error!",
        text: err.message || "ไม่สามารถดึงข้อมูลได้",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setMainTableLoading(false);
    }
  };

  const handleUpdateAction = (row: any) => {
    setSelectedRow(row); // เก็บแถวที่เลือก
    setOpenActionDialog(true); // เปิด dialog
  };

  const handleCloseAction = () => {
    setOpenActionDialog(false);
  };

  // ✅ ส่งข้อมูลไปอัปเดต DB
  const handleSubmitAction = async (
    id: string,
    action_detail: string,
    action_by: string
  ) => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-action/update`;

    try {
      const response = await axios.patch(url, { id, action_detail, action_by });

      if (response.status === 200 && response.data.status === "OK") {
        Swal.fire({
          icon: "success",
          title: "อัปเดตสำเร็จ",
          text: "บันทึกข้อมูลเรียบร้อยแล้ว",
          confirmButtonColor: "#3085d6",
          timer: 1500,
          showConfirmButton: false,
        });

        setOpenActionDialog(false); // ✅ ปิด dialog ทันทีหลังสำเร็จ
        await fetchMainTableData();
      } else {
        Swal.fire({
          icon: "error",
          title: "อัปเดตไม่สำเร็จ",
          text: response.data.message || "กรุณาลองใหม่อีกครั้ง",
          confirmButtonColor: "#d33",
        });
        setOpenActionDialog(false);
      }
    } catch (error: any) {
      console.error("Error updating action:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
        confirmButtonColor: "#d33",
      });
      setOpenActionDialog(false);
    }
  };

  useEffect(() => {
    fetchMainTableData();
  }, []);

  return {
    dataMainTable,
    mainTableLoading,
    error,
    handleUpdateAction,
    openActionDialog,
    handleCloseAction,
    setOpenActionDialog,
    handleSubmitAction,
    selectedRow,
    setSelectedRow,
  };
};
