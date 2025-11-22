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
  Chip,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { X } from "lucide-react"; // ใช้ไอคอนลบ

interface DialogInspectorNamesProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (names: string) => void;
  initialValue?: string; // ถ้ามีค่าเก่า ส่งเข้ามา เช่น "A_B_C"
}

const DialogInspectorNames = ({
  open,
  onClose,
  onConfirm,
  initialValue = "",
}: DialogInspectorNamesProps) => {
  const [currentName, setCurrentName] = useState("");
  const [names, setNames] = useState<string[]>(
    initialValue ? initialValue.split("_") : []
  );

  const handleAddName = () => {
    const trimmed = currentName.trim();
    if (!trimmed) return;
    if (names.includes(trimmed)) {
      Swal.fire({
        icon: "info",
        title: "ชื่อซ้ำ",
        text: "คุณได้เพิ่มชื่อนี้แล้ว",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }
    setNames([...names, trimmed]);
    setCurrentName("");
  };

  const handleRemoveName = (nameToRemove: string) => {
    setNames(names.filter((name) => name !== nameToRemove));
  };

  const handleSave = () => {
    if (names.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "ยังไม่มีชื่อผู้ตรวจสอบ",
        text: "กรุณาเพิ่มอย่างน้อย 1 ชื่อ",
      });
      return;
    }
    onConfirm(names.join("_"));
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddName();
    }
  };

  const handleCancel = () => {
    setCurrentName("");
    setNames(initialValue ? initialValue.split("_") : []);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
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
            👥
          </Avatar>
          ใส่ชื่อ Inspector
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 4,
          background: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        <Typography
          variant="body2"
          sx={{ mb: 2, mt:2, color: "#475569", fontWeight: 500 }}
        >
          ใส่ชื่อ Inspector แล้วกด Enter หรือกดปุ่ม ➕
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Inspector Name"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            placeholder="กรอกชื่อแล้วกด Enter"
          />
          <Button
            onClick={handleAddName}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
              },
            }}
          >
            ➕
          </Button>
        </Box>

        {/* แสดงรายการชื่อที่เพิ่มแล้ว */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {names.map((name) => (
            <Chip
              key={name}
              label={name}
              onDelete={() => handleRemoveName(name)}
              deleteIcon={
                <IconButton size="small" sx={{ color: "white" }}>
                  <X size={14} />
                </IconButton>
              }
              sx={{
                bgcolor: "#22c55e",
                color: "white",
                fontWeight: 600,
                px: 1,
                "& .MuiChip-deleteIcon": { color: "white" },
              }}
            />
          ))}
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
          sx={{ borderRadius: 3, px: 3, py: 1, fontWeight: 600 }}
        >
          ❌ Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={names.length === 0}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1,
            fontWeight: 600,
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
            },
          }}
        >
          ✅ Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogInspectorNames;
