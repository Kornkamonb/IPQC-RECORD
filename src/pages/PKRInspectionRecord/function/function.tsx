import { useState } from "react";
import Swal from "sweetalert2";
import { Use_feature } from "../hooks/use_feature";

export const HandleFunction = () => {
  const [openHeaderDialog, setOpenHeaderDialog] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openRepairDialog, setOpenRepairDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [openTotalSheetDialog, setOpenTotalSheetDialog] = useState(false);
  const [openInspectorDialog, setOpenInspectorDialog] = useState(false);

  const {
    handleUpdateEditData,
    handleUpdateFinishTime,
    fetchLotForFilter,
    handleUpdateRepairData,
    UpdateInspectorID,

    UpdateTotalSheet,
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

  const handleOpenConfirmDialog = (rowData: any) => {
    setSelectedRow(rowData);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = (rowData: any) => {
    setSelectedRow(rowData);
    setOpenConfirmDialog(false);
  };

  const handleClickEdit = (rowData: any) => {
    setSelectedRow(rowData);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedRow({});
  };

  const handleSaveEdit = async (editData: any) => {
    try {
      await handleUpdateEditData(editData);
      setOpenEditDialog(false);
      setSelectedRow({});
    } catch (err) {
      console.error("Failed to save edit:", err);
    }
  };

  const handleConfirmDialog = async (password: string) => {
    if (password !== "1111") {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ถูกต้อง",
        text: "กรุณาลองอีกครั้ง",
      });
      return;
    }

    try {
      await handleUpdateFinishTime(selectedRow.id, selectedRow);
      setOpenConfirmDialog(false);
    } catch (err) {
      console.error("Failed to update finish time:", err);
    }
  };

  const handleClickRepair = (repairData?: any) => {
    console.log(
      "HandleFunction handleClickRepair - received data:",
      repairData
    );

    if (!repairData) {
      setOpenEditDialog(false);
      setOpenRepairDialog(true);
      return;
    }

    const saveRepair = async () => {
      try {
        await handleUpdateRepairData(repairData.id, repairData); // ✅ จะรอจน refresh เสร็จ
        setOpenRepairDialog(false);
        setSelectedRow({});
      } catch (error) {
        console.error("Error while calling handleUpdateRepairData:", error);
      }
    };
    saveRepair();
  };

  const handleCloseRepairDialog = () => {
    setOpenRepairDialog(false);
    setSelectedRow({});
  };

  const handleOpenTotalSheetDialog = (row: any) => {
    setSelectedRow(row);
    setOpenTotalSheetDialog(true);
  };

  const handleOpenInspectorDialog = (row: any) => {
    setSelectedRow(row);
    setOpenInspectorDialog(true);
  };

  const handleSaveTotalSheet = async (value: string) => {
    if (!selectedRow?.id) return;

    try {
      await UpdateTotalSheet(selectedRow.id, value);
      setOpenTotalSheetDialog(false);
    } catch (error) {
      console.error("Update Total Sheet error:", error);
    }
  };

  const handleSaveInspectorNames = async (value: string) => {
    if (!selectedRow?.id) return;

    try {
      await UpdateInspectorID(selectedRow.id, value);
      setOpenTotalSheetDialog(false);
    } catch (error) {
      console.error("Update Inspector error:", error);
    }
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
    handleOpenInspectorDialog,
    handleOpenTotalSheetDialog,
    openInspectorDialog,
    openTotalSheetDialog,
    setOpenTotalSheetDialog,
    setOpenInspectorDialog,
    handleSaveTotalSheet,
    handleSaveInspectorNames,
  };
};
