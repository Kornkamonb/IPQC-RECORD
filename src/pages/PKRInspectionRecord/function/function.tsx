import { useState } from "react";
import Swal from "sweetalert2";
import { Use_feature } from "../hooks/use_feature";

export const HandleFunction = () => {
  const [openHeaderDialog, setOpenHeaderDialog] = useState<boolean>(false);

  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openRepairDialog, setOpenRepairDialog] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
 

  const {
    handleUpdateEditData,
   
    fetchLotForFilter,
    handleUpdateRepairData,

    // UpdateTotalSheet,
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

 

  






 
 

  return {
    openHeaderDialog,
   
    openEditDialog,
    openRepairDialog,
    selectedRow,
    handleClickCreateHeader,
    handleCloseHeaderDialog,
 
    handleClickEdit,
    handleCloseEditDialog,
    handleSaveEdit,
   
    handleClickRepair,
    handleCloseRepairDialog,
   
    setOpenRepairDialog,
  
  };
};
