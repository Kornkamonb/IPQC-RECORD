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

interface DialogConfirmPasswordProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

const DialogConfirmPassword = ({
  open,
  onClose,
  onConfirm,
}: DialogConfirmPasswordProps) => {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    if (password === "1111") {
      onConfirm(password);
      setPassword("");
      onClose();
    } else {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ถูกต้อง",
        text: "กรุณาลองอีกครั้ง",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleCancel = () => {
    setPassword("");
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
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
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
            🔐
          </Avatar>
          ยืนยันรหัสผ่าน
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 4,
          background: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        {/* Password Input Card */}
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
              background: "linear-gradient(to bottom, #f59e0b, #d97706)",
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
            🔒 Security Verification
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
            กรุณาใส่รหัสผ่านเพื่อยืนยันการดำเนินการ เพื่อความปลอดภัยของระบบ
          </Typography>

          <TextField
            label="🔑 Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            autoFocus
            placeholder="กรุณาใส่รหัสผ่าน"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                "&:hover fieldset": {
                  borderColor: "#f59e0b",
                  borderWidth: 2,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#f59e0b",
                  borderWidth: 2,
                  boxShadow: "0 0 0 3px rgba(245, 158, 11, 0.1)",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#f59e0b",
                fontWeight: 600,
              },
            }}
          />

          {/* Security Note */}
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: "rgba(245, 158, 11, 0.1)",
              borderRadius: 2,
              border: "1px solid rgba(245, 158, 11, 0.2)",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#92400e",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              ⚠️ หมายเหตุ: การดำเนินการนี้จะมีผลต่อข้อมูลในระบบ
            </Typography>
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
          disabled={!password}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1,
            fontWeight: 600,
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 35px rgba(245, 158, 11, 0.5)",
            },
            "&:disabled": {
              background: "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
              color: "white",
              opacity: 0.7,
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          🔓 Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmPassword;
