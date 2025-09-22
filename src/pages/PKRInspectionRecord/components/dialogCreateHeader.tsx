import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Avatar,
  Typography,
  Chip,
} from "@mui/material";
import MyAutocomplete from "../components/Autocomplete";
import { Use_feature } from "../hooks/use_feature";
import Swal from "sweetalert2";

const DialogCreateHeader = ({
  onClose,
  fetchMainTableData,
}: {
  onClose: () => void;
  fetchMainTableData: () => Promise<void>;
}) => {
  const { selectedLot, setSelectedLot, lotDetail, lotFilter, postCreate } =
    Use_feature();

  const handleCreate = async () => {
    const result = await postCreate();

    if (!result.success) {
      Swal.fire({
        icon: "warning",
        title: "ไม่สามารถสร้างข้อมูลได้",
        text: result.message ?? "กรุณาลองใหม่",
      });
      return;
    }

    // ✅ ปิด dialog ก่อน
    onClose();

    // ✅ Refresh table หลังสร้างสำเร็จ
    await fetchMainTableData();

    // ✅ ค่อยแสดง Swal หลัง dialog ปิด
    Swal.fire({
      icon: "success",
      title: "สร้างข้อมูลสำเร็จ",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
          textAlign: "center",
          fontSize: "1.4rem",
          fontWeight: 600,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}>
            ➕
          </Avatar>
          Create New Record
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 4,
          background: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        <Box
          sx={{
            mt: 2,
            p: 3,
            background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(255,255,255,0.8)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "4px",
              height: "100%",
              background: "linear-gradient(to bottom, #10b981, #059669)",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, color: "#1e293b", fontWeight: 700 }}
          >
            🏷️ Select Lot
          </Typography>

          <MyAutocomplete
            modalData={lotFilter}
            selectValue={selectedLot}
            setSelectValue={setSelectedLot}
            uniqueKey="lot"
            label="Lot NO"
          />
        </Box>

        {selectedLot && lotDetail && (
          <Box
            sx={{
              mt: 3,
              p: 3,
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.8)",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                background: "linear-gradient(to bottom, #3b82f6, #1d4ed8)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#1e293b", fontWeight: 700 }}
            >
              📋 Lot Details
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
              <Box>
                <Chip
                  label="Lot Number"
                  size="small"
                  sx={{ mb: 1, bgcolor: "#e0e7ff", color: "#4338ca" }}
                />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {lotDetail.lot}
                </Typography>
              </Box>

              <Box>
                <Chip
                  label="Product Name"
                  size="small"
                  sx={{ mb: 1, bgcolor: "#dcfce7", color: "#166534" }}
                />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {lotDetail.product_name}
                </Typography>
              </Box>

              <Box>
                <Chip
                  label="Process"
                  size="small"
                  sx={{ mb: 1, bgcolor: "#fef3c7", color: "#92400e" }}
                />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {lotDetail.proc_disp}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          background: "linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%)",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button onClick={onClose} variant="outlined" color="error">
          ❌ Cancel
        </Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          ✨ Create
        </Button>
      </DialogActions>
    </>
  );
};

export default DialogCreateHeader;
