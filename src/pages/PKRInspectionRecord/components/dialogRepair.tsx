import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
} from "@mui/material";
import { useState, useEffect } from "react";

interface DialogRepairProps {
  open: boolean;
  onClose: () => void;
  rowData?: any;
  onConfirm: (data: any) => void;
}

const DialogRepair = ({
  open,
  onClose,
  rowData,
  onConfirm,
}: DialogRepairProps) => {
  const [formData, setFormData] = useState({
    bodysmall_ng_pcs: null,
    bodybig_ng_pcs: null,
    acf_ng_pcs: null,
    bodysmall_acc_pcs: null,
    bodybig_acc_pcs: null,
    acf_acc_pcs: null,
    ...rowData,
  });

  // sync formData เมื่อ rowData เปลี่ยน
  useEffect(() => {
    if (rowData) {
      setFormData({
        bodysmall_ng_pcs: rowData.bodysmall_ng_pcs || null,
        bodybig_ng_pcs: rowData.bodybig_ng_pcs || null,
        acf_ng_pcs: rowData.acf_ng_pcs || null,
        bodysmall_acc_pcs: rowData.bodysmall_acc_pcs || null,
        bodybig_acc_pcs: rowData.bodybig_acc_pcs || null,
        acf_acc_pcs: rowData.acf_acc_pcs || null,
        ...rowData,
      });
    } else {
      setFormData({
        bodysmall_ng_pcs: null,
        bodybig_ng_pcs: null,
        acf_ng_pcs: null,
        bodysmall_acc_pcs: null,
        bodybig_acc_pcs: null,
        acf_acc_pcs: null,
      });
    }
  }, [rowData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // ส่งข้อมูลที่มี rowData + ข้อมูลใหม่ที่แก้ไข
    const dataToSave = {
      ...rowData, // ข้อมูลเดิมทั้งหมด
      ...formData, // ข้อมูลที่แก้ไขใหม่
    };

    console.log("DialogRepair handleSave - sending data:", dataToSave);
    onConfirm(dataToSave);
    onClose();
  };

  const handleCancel = () => {
    // รีเซ็ตข้อมูลเมื่อยกเลิก
    setFormData({
      bodysmall_ng_pcs: rowData?.bodysmall_ng_pcs || null,
      bodybig_ng_pcs: rowData?.bodybig_ng_pcs || null,
      acf_ng_pcs: rowData?.acf_ng_pcs || null,
      bodysmall_acc_pcs: rowData?.bodysmall_acc_pcs || null,
      bodybig_acc_pcs: rowData?.bodybig_acc_pcs || null,
      acf_acc_pcs: rowData?.acf_acc_pcs || null,
      ...rowData,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            🔧
          </Avatar>
          Repair Record
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 4,
          background: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        {/* แสดงข้อมูลพื้นฐาน */}
        {rowData && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: "rgba(255,255,255,0.7)",
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
              <strong>Lot No:</strong> {rowData.lot_no || "-"}
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <strong>Product:</strong> {rowData.product_name || "-"}
            </Box>
          </Box>
        )}

        {/* Repair Fields */}
        <Box
          sx={{
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
              background: "linear-gradient(to bottom, #10b981, #059669)",
            },
          }}
        >
          {/* Body Small */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <span style={{ fontSize: "1.2rem" }}>📱</span>
              <strong style={{ color: "#1e293b" }}>Body Small</strong>
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="NG (pcs)"
                type="number"
                value={formData.bodysmall_ng_pcs || ""}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? null : Number(e.target.value);
                  handleChange("bodysmall_ng_pcs", value);
                }}
                fullWidth
                inputProps={{ min: 0 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#10b981" },
                    "&.Mui-focused fieldset": { borderColor: "#10b981" },
                  },
                }}
              />
              <TextField
                label="Acc (pcs)"
                type="number"
                value={formData.bodysmall_acc_pcs || ""}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? null : Number(e.target.value);
                  handleChange("bodysmall_acc_pcs", value);
                }}
                fullWidth
                inputProps={{ min: 0 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#10b981" },
                    "&.Mui-focused fieldset": { borderColor: "#10b981" },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Body Big */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <span style={{ fontSize: "1.2rem" }}>📺</span>
              <strong style={{ color: "#1e293b" }}>Body Big</strong>
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="NG (pcs)"
                type="number"
                value={formData.bodybig_ng_pcs || ""}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? null : Number(e.target.value);
                  handleChange("bodybig_ng_pcs", value);
                }}
                fullWidth
                inputProps={{ min: 0 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#10b981" },
                    "&.Mui-focused fieldset": { borderColor: "#10b981" },
                  },
                }}
              />
              <TextField
                label="Acc (pcs)"
                type="number"
                value={formData.bodybig_acc_pcs || ""}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? null : Number(e.target.value);
                  handleChange("bodybig_acc_pcs", value);
                }}
                fullWidth
                inputProps={{ min: 0 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#10b981" },
                    "&.Mui-focused fieldset": { borderColor: "#10b981" },
                  },
                }}
              />
            </Box>
          </Box>

          {/* ACF */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <span style={{ fontSize: "1.2rem" }}>🔧</span>
              <strong style={{ color: "#1e293b" }}>ACF</strong>
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
            >
              <TextField
                label="NG (pcs)"
                type="number"
                value={formData.acf_ng_pcs || ""}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? null : Number(e.target.value);
                  handleChange("acf_ng_pcs", value);
                }}
                fullWidth
                inputProps={{ min: 0 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#10b981" },
                    "&.Mui-focused fieldset": { borderColor: "#10b981" },
                  },
                }}
              />
              <TextField
                label="Acc (pcs)"
                type="number"
                value={formData.acf_acc_pcs || ""}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? null : Number(e.target.value);
                  handleChange("acf_acc_pcs", value);
                }}
                fullWidth
                inputProps={{ min: 0 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover fieldset": { borderColor: "#10b981" },
                    "&.Mui-focused fieldset": { borderColor: "#10b981" },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          background: "linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%)",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button
          onClick={handleCancel}
          variant="outlined"
          color="error"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1,
            fontWeight: 600,
          }}
        >
          ❌ Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1,
            fontWeight: 600,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a67d8 0%, #6b4494 100%)",
            },
          }}
        >
          💾 Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogRepair;
