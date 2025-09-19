import { useState } from "react";
import Swal from "sweetalert2";
import { Use_feature } from "../hooks/use_feature";

export const HandleFunction = () => {
  const [openHeaderDialog, setOpenHeaderDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<[]>([]);

  const {
    handleUpdateEditData,
    handleUpdateFinishTime,
    fetchLotForFilter,
    updateRepairData,
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
      const result = await handleUpdateFinishTime(); // เรียก service
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: result.message,
        confirmButtonColor: "#10b981",
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err?.message || "ไม่สามารถบันทึกข้อมูลได้",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleClickRepair = async (repairData: any) => {
    try {
      const result = await Swal.fire({
        title: "ยืนยันการซ่อม?",
        text: "คุณต้องการบันทึกข้อมูลการซ่อมหรือไม่",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "บันทึก",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });

      if (result.isConfirmed) {
        await updateRepairData(repairData);

        await Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ",
          text: "ข้อมูลการซ่อมถูกอัปเดตเรียบร้อยแล้ว",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error while calling updateRepairData:", error);

      await Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูลการซ่อมได้ กรุณาลองใหม่อีกครั้ง",
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
    handleConfirmDialog,
    setOpenConfirmDialog,
    handleClickRepair,
  };
};
