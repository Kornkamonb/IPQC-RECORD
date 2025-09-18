import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export const Use_feature = () => {
  const [lotDetailLoading, setLotDetailLoading] = useState<boolean>(false);
  const [MainTableLoading, setMainTableLoading] = useState<boolean>(false);
  const [selectedLot, setSelectedLot] = useState<string>("ALL");
  const [Error, setError] = useState<boolean>(false);
  const [lotDetail, setLotDetail] = useState<[]>([]);
  const [dataMainTable, setDataMainTable] = useState<[]>([]);

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
            // ✅ map เฉพาะ lot เพื่อใช้กับ MyAutocomplete
            const lotArray = response.data.data.map((item: any) => ({
              posm_item_code: item.lot, // ให้ key ชื่อเดียวกับ uniqueKey
              ...item, // เผื่อคุณอยากใช้ข้อมูลอื่นในอนาคต
            }));
            setLotDetail(lotArray);
          } else {
            setLotDetail([]);
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

  useEffect(() => {
    fetchMainTableData();
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

    dataMainTable,
    setDataMainTable,
    MainTableLoading,
  };
};
