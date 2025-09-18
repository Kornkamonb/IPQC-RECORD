import { useState } from "react";
import Swal from "sweetalert2";
import { Use_feature } from "../hooks/use_feature";

export const Function = () => {
  const [openHeaderDialog, setOpenHeaderDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<[]>([]);

  const { handleUpdateEditData } = Use_feature();

  /** กดปุ่ม Create Header */
  const handleClickCreateHeader = () => {
    setOpenHeaderDialog(true);
  };

  /** ปิด Dialog Create Header */
  const handleCloseHeaderDialog = () => {
    setOpenHeaderDialog(false);
  };

  /** ตัวอย่าง confirm dialog เผื่อใช้ภายหลัง */
  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleClickEdit = (rowData: any) => {
    console.log("Edit row:", rowData);
    // เปิด dialog หรือทำ action ที่ต้องการ
    setSelectedRow(rowData);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveEdit = async () => {
    try {
      await handleUpdateEditData(selectedRow); // 👈 เรียกใช้ฟังก์ชันที่มาจาก use_feature
      Swal.fire({
        icon: "success",
        title: "Edit Saved",
        timer: 1500,
        showConfirmButton: false,
      });
      setOpenEditDialog(false);
    } catch (err) {
      console.error("Failed to save edit:", err);
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: "เกิดข้อผิดพลาด กรุณาลองใหม่",
      });
    }
  };

  return {
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
  };
};
