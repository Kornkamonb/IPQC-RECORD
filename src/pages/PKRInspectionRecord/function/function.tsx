import { useState } from "react";
import Swal from "sweetalert2";
import { Use_feature } from "../hooks/use_feature";

export const HandleFunction = () => {
  const [openHeaderDialog, setOpenHeaderDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openRepairDialog, setOpenRepairDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>({}); // เปลี่ยนจาก [] เป็น {}

  const {
    handleUpdateEditData,
    handleUpdateFinishTime,
    fetchLotForFilter,
    handleUpdateRepairData,
  } = Use_feature();

  /** กดปุ่ม Create Header */
  const handleClickCreateHeader = async () => {
    Swal.fire({
      title: "กำลังโหลดข้อมูล...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await fetchLotForFilter();

    Swal.close();
    setOpenHeaderDialog(true);
  };

  /** ปิด Dialog Create Header */
  const handleCloseHeaderDialog = () => {
    setOpenHeaderDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleClickEdit = (rowData: any) => {
    console.log("Edit row:", rowData);
    setSelectedRow(rowData);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedRow({}); // รีเซ็ต selectedRow เมื่อปิด dialog
  };

  const handleSaveEdit = async (editData: any) => {
    try {
      console.log("HandleFunction handleSaveEdit - received data:", editData);
      await handleUpdateEditData(editData || selectedRow);
      Swal.fire({
        icon: "success",
        title: "Edit Saved",
        timer: 1500,
        showConfirmButton: false,
      });
      setOpenEditDialog(false);
      setSelectedRow({});
    } catch (err) {
      console.error("Failed to save edit:", err);
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "เกิดข้อผิดพลาด กรุณาลองใหม่",
      });
    }
  };

  const handleConfirmDialog = async (password: string) => {
    if (password !== "1111") {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ถูกต้อง",
        text: "กรุณาลองอีกครั้ง",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    try {
      const result = await handleUpdateFinishTime();
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: result.message,
        confirmButtonColor: "#10b981",
      });
      setOpenConfirmDialog(false);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err?.message || "ไม่สามารถบันทึกข้อมูลได้",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // แก้ไขฟังก์ชัน handleClickRepair
  const handleClickRepair = (repairData?: any) => {
    console.log(
      "HandleFunction handleClickRepair - received data:",
      repairData
    );

    // ถ้าไม่มีข้อมูล repair (กดปุ่ม Repair จาก EditDialog) -> เปิด RepairDialog
    if (!repairData) {
      setOpenEditDialog(false);
      setOpenRepairDialog(true);
      return;
    }

    // ถ้ามีข้อมูล repair แล้ว (ส่งมาจาก RepairDialog) -> บันทึก
    const saveRepair = async () => {
      try {
        console.log("Calling handleUpdateRepairData with:", repairData);
        await handleUpdateRepairData(repairData);

        await Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
          text: "ข้อมูลการซ่อมถูกอัปเดตเรียบร้อยแล้ว",
          timer: 1500,
          showConfirmButton: false,
        });

        setOpenRepairDialog(false);
        setSelectedRow({});
      } catch (error) {
        console.error("Error while calling handleUpdateRepairData:", error);
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถบันทึกข้อมูลการซ่อมได้ กรุณาลองใหม่อีกครั้ง",
        });
        setOpenRepairDialog(false);
      }
    };

    saveRepair();
  };

  const handleCloseRepairDialog = () => {
    setOpenRepairDialog(false);
    setSelectedRow({});
  };

  return {
    openHeaderDialog,
    openConfirmDialog,
    openEditDialog,
    openRepairDialog,
    selectedRow,
    handleClickCreateHeader,
    handleCloseHeaderDialog,
    handleOpenConfirmDialog,
    handleCloseConfirmDialog,
    handleClickEdit,
    handleCloseEditDialog,
    handleSaveEdit,
    handleConfirmDialog,
    handleClickRepair,
    handleCloseRepairDialog,
    setOpenConfirmDialog,
    setOpenRepairDialog,
  };
};
