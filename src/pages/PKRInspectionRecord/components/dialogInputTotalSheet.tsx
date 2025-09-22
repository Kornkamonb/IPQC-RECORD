import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

interface DialogTotalSheetProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (totalSheet: string) => void;
  formData: { total_sheet?: string }; // 👈 รับ formData จาก parent
}

const DialogTotalSheet = ({
  open,
  onClose,
  onConfirm,
  formData,
}: DialogTotalSheetProps) => {
  const [totalSheet, setTotalSheet] = useState(formData.total_sheet || "");

  const handleConfirm = () => {
    if (!totalSheet.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูล",
        text: "Total Sheet ห้ามเว้นว่าง",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    onConfirm(totalSheet);
    setTotalSheet("");
    onClose();
  };

  const handleCancel = () => {
    setTotalSheet("");
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
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
            📝
          </Avatar>
          กรอกจำนวน Total Sheet
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
              background: "linear-gradient(to bottom, #0ea5e9, #0284c7)",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: "#1e293b",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            📄 Total Sheet Input
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 3,
              color: "#64748b",
              fontSize: "0.95rem",
              lineHeight: 1.6,
            }}
          >
            โปรดกรอกจำนวนแผ่น (Total Sheet) ให้ถูกต้อง เพื่อบันทึกลงระบบ
          </Typography>

          <TextField
            label="🧾 Total Sheet"
            type="number"
            value={totalSheet}
            onChange={(e) => setTotalSheet(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            autoFocus
            placeholder="กรอกจำนวน Total Sheet"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                "&:hover fieldset": {
                  borderColor: "#0ea5e9",
                  borderWidth: 2,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0ea5e9",
                  borderWidth: 2,
                  boxShadow: "0 0 0 3px rgba(14, 165, 233, 0.1)",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#0ea5e9",
                fontWeight: 600,
              },
            }}
          />
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
          color="inherit"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1,
            fontWeight: 600,
            borderWidth: 2,
            borderColor: "#6b7280",
            color: "#6b7280",
            background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
            "&:hover": {
              borderColor: "#4b5563",
              background: "linear-gradient(145deg, #f9fafb 0%, #f3f4f6 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(107, 114, 128, 0.25)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          ❌ Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disabled={!totalSheet}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1,
            fontWeight: 600,
            background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
            boxShadow: "0 8px 25px rgba(14, 165, 233, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 35px rgba(14, 165, 233, 0.5)",
            },
            "&:disabled": {
              background: "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
              color: "white",
              opacity: 0.7,
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          ✅ Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogTotalSheet;
