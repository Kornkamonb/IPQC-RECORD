import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export const Use_feature = () => {
  const [dataMainTable, setDataMainTable] = useState<[]>([]);
  const [mainTableLoading, setMainTableLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchMainTableData = async () => {
    const url = `${
      import.meta.env.VITE_IP_API_NEST
    }/smart-pkr-inspection-record/complete-record/get-main-table`;
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

  return {
    dataMainTable,
    mainTableLoading,
    error,
  };
};
