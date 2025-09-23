import axios from "axios";
import { useState, useEffect } from "react";

import Swal from "sweetalert2";

export interface LotDetail {
  id: string;
  lot: string;
  product_name: string;
  proc_disp: string;
}

export const Use_feature = () => {
  const [lotDetailLoading, setLotDetailLoading] = useState<boolean>(false);
  const [MainTableLoading, setMainTableLoading] = useState<boolean>(false);
  const [selectedLot, setSelectedLot] = useState<string>("");
  const [Error, setError] = useState<boolean>(false);
  const [lotDetail, setLotDetail] = useState<LotDetail | null>(null);
  const [lotFilter, setLotFilter] = useState<LotDetail[]>([]);
  const [dataMainTable, setDataMainTable] = useState<[]>([]);

  const fetchLotForFilter = async () => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-joblist/get-all-detail`;
    const params = {};

    try {
      setLotDetailLoading(true);
      const response = await axios.get(url, { params });

      if (response.status === 200) {
        if (response.data.status === "OK") {
          if (
            Array.isArray(response.data.data) &&
            response.data.data.length > 0
          ) {
            const lotArray = response.data.data.map((item: any) => ({
              lot: item.lot,
              ...item,
            }));
            setLotFilter(lotArray);
          } else {
            setLotFilter([]);
            Swal.fire({
              icon: "info",
              title: "ไม่มีข้อมูล",
              text: "ไม่พบข้อมูล Lot ที่เลือก",
            });
          }
        }
      }
    } catch (err: any) {
      console.error("Lot detail fetch error:", err);
      setError(err.message || "Something went wrong");
      Swal.fire({
        title: "Error!",
        text: err.message || "ไม่สามารถดึงข้อมูลได้",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLotDetailLoading(false);
    }
  };

  const fetchLotDetail = async () => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-joblist/get-lot-detail`;
    const params = { lot: selectedLot };

    try {
      setLotDetailLoading(true);
      const response = await axios.get(url, { params });

      if (response.status === 200) {
        if (response.data.status === "OK") {
          if (
            Array.isArray(response.data.data) &&
            response.data.data.length > 0
          ) {
            setLotDetail(response.data.data[0]); // ✅ เก็บ object เดียว
          } else {
            setLotDetail(null);
            Swal.fire({
              icon: "info",
              title: "ไม่มีข้อมูล",
              text: "ไม่พบข้อมูล Lot ที่เลือก",
            });
          }
        }
      }
    } catch (err: any) {
      console.error("Lot detail fetch error:", err);
      setError(err.message || "Something went wrong");
      Swal.fire({
        title: "Error!",
        text: err.message || "ไม่สามารถดึงข้อมูลได้",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLotDetailLoading(false);
    }
  };

  const fetchMainTableData = async () => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-joblist/get-main-table`;
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

  const postCreate = async (): Promise<{
    success: boolean;
    message?: string;
  }> => {
    if (!lotDetail) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือก Lot ก่อน",
        text: "คุณต้องเลือก Lot เพื่อสร้างข้อมูลใหม่",
      });
      return { success: false, message: "กรุณาเลือก Lot ก่อน" };
    }

    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-joblist/create-main-record`;

    try {
      const payload = {
        lot_no: lotDetail.lot,
        product_name: lotDetail.product_name,
        process: lotDetail.proc_disp,
      };

      const response = await axios.post(url, payload);

      if (response.status === 201 && response.data.status === "OK") {
        Swal.fire({
          icon: "success",
          title: "สร้างข้อมูลสำเร็จ",
          timer: 1500,
          showConfirmButton: false,
        });
        await fetchMainTableData(); // ✅ refresh หลังสำเร็จ
        return { success: true };
      } else {
        Swal.fire({
          icon: "error",
          title: "สร้างข้อมูลไม่สำเร็จ",
          text: response.data?.message ?? "Unknown error",
        });
        return {
          success: false,
          message: response.data?.message ?? "Unknown error",
        };
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error?.message ?? "ไม่สามารถเชื่อมต่อ API ได้",
      });
      return {
        success: false,
        message: error?.message ?? "ไม่สามารถเชื่อมต่อ API ได้",
      };
    }
  };

  const handleUpdateEditData = async (formData: any) => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-joblist/update-main-record`;

    try {
      const payload = {
        id: String(formData.id ?? "0"),
        pkr_remain_pcs: String(formData.pkr_remain_pcs ?? "0"),
        pkr_tear_pcs: String(formData.pkr_tear_pcs ?? "0"),
        pic_incomplete_pcs: String(formData.pic_incomplete_pcs ?? "0"),
        pic_misposition_pcs: String(formData.pic_misposition_pcs ?? "0"),
        adh_flow_flow: String(formData.adh_flow_flow ?? "0"),
        mat_remain_pcs: String(formData.mat_remain_pcs ?? "0"),
        others_rej: String(formData.others_rej ?? "0"),
        remark: String(formData.remark ?? ""),
      };

      const response = await axios.patch(url, payload);

      if (response.status === 200 && response.data.status === "OK") {
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
        });
        await fetchMainTableData();
      } else {
        Swal.fire({
          icon: "error",
          title: "บันทึกไม่สำเร็จ",
          text: response.data.message || "กรุณาลองใหม่",
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.message || "ไม่สามารถบันทึกข้อมูลได้",
      });
    }
  };

  const handleUpdateFinishTime = async (
    id: string,
    formData: any
  ): Promise<void> => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-joblist/finish-job`;

    try {
      const response = await axios.patch(url, { id });

      if (response.status === 200 && response.data.status === "OK") {
        await Swal.fire({
          icon: "success",
          title: "อัปเดตเวลาเสร็จสิ้นเรียบร้อย",
        });

        // ✅ เรียก update main record + refresh
        await handleUpdateEditData(formData);

        // ✅ ทำให้ฟังก์ชันนี้ return promise ของ fetchMainTableData
        return await fetchMainTableData();
      } else {
        Swal.fire({
          icon: "error",
          title: "ไม่สำเร็จ",
          text: response.data.message || "ไม่สามารถอัปเดต finish time",
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.message || "ไม่สามารถอัปเดต finish time ได้",
      });
    }
  };

  const handleUpdateRepairData = async (id: number, data: any) => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-joblist/update-repair-data`;

    try {
      const payload = {
        id: String(id),
        bodysmall_ng_pcs: String(data.bodysmall_ng_pcs ?? "0"),
        bodybig_ng_pcs: String(data.bodybig_ng_pcs ?? "0"),
        acf_ng_pcs: String(data.acf_ng_pcs ?? "0"),
        bodysmall_acc_pcs: String(data.bodysmall_acc_pcs ?? "0"),
        bodybig_acc_pcs: String(data.bodybig_acc_pcs ?? "0"),
        acf_acc_pcs: String(data.acf_acc_pcs ?? "0"),
      };

      const response = await axios.patch(url, payload);

      if (response.status === 200 && response.data.status === "OK") {
        Swal.fire({
          icon: "success",
          title: "อัปเดตข้อมูลการซ่อมสำเร็จ",
        });
        return await fetchMainTableData();
      } else {
        Swal.fire({
          icon: "warning",
          title: "อัปเดตไม่สำเร็จ",
          text: response.data.message || "โปรดลองใหม่",
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.message || "ไม่สามารถอัปเดตข้อมูลการซ่อมได้",
      });
    }
  };

  const UpdateTotalSheet = async (id: number, totalSheet: string) => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-joblist/update-total-sheet`;

    try {
      const payload = { id, total_sheet: Number(totalSheet) };
      const response = await axios.patch(url, payload);

      if (response.status === 200 && response.data.status === "OK") {
        await Swal.fire({
          icon: "success",
          title: "อัปเดต Total Sheet สำเร็จ",
        });

        // ✅ return fetchMainTableData ให้ parent รอ refresh เสร็จ
        return await fetchMainTableData();
      } else {
        Swal.fire({
          icon: "warning",
          title: "อัปเดตไม่สำเร็จ",
          text: response.data?.message || "โปรดลองใหม่",
        });
        return response.data;
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.message || "ไม่สามารถอัปเดต Total Sheet ได้",
      });
      return { status: "ERROR", message: err.message };
    }
  };

  const UpdateInspectorID = async (id: number, inspectorIDs: string) => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-joblist/update-inspector-id`;

    try {
      const payload = { id, insp_id: inspectorIDs };
      const response = await axios.patch(url, payload);

      if (response.status === 200 && response.data.status === "OK") {
        await Swal.fire({
          icon: "success",
          title: "อัปเดต Inspector สำเร็จ",
        });

        // ✅ return fetchMainTableData เช่นกัน
        return await fetchMainTableData();
      } else {
        Swal.fire({
          icon: "warning",
          title: "อัปเดตไม่สำเร็จ",
          text: response.data?.message || "โปรดลองใหม่",
        });
        return response.data;
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.message || "ไม่สามารถอัปเดต Inspector ID ได้",
      });
      return { status: "ERROR", message: err.message };
    }
  };

  useEffect(() => {
    fetchMainTableData();
    fetchLotForFilter();
  }, []);

  useEffect(() => {
    if (selectedLot) {
      fetchLotDetail();
    }
  }, [selectedLot]);

  return {
    selectedLot,
    setSelectedLot,

    lotDetail,
    setLotDetail,
    lotFilter,

    dataMainTable,
    setDataMainTable,

    MainTableLoading,

    handleUpdateEditData,
    handleUpdateFinishTime,

    fetchLotForFilter,
    handleUpdateRepairData,
    postCreate,
    UpdateInspectorID,
    fetchMainTableData,
    UpdateTotalSheet,
    lotDetailLoading,
    Error,
  };
};
