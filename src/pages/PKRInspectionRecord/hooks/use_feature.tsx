import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
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

  const handleUpdateEditData = async () => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/inspection-joblist/update-data`;
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

  const handleUpdateFinishTime = async () => {
    const url = `${import.meta.env.VITE_IP_API_NEST}/your/api/endpoint`;

    const response = await axios.post(url, {
      data: { foo: "bar" },
    });

    if (response.status !== 200) {
      console.error();
    }

    return response.data;
  };

  const handleUpdateRepairData = async (data: any) => {
    try {
      console.log("Updating repair data...", data);
      // call API ที่คุณต้องการ
      // await axios.post("/api/update-repair", data);
    } catch (err) {
      console.error("Failed to update repair data", err);
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
  };
};
