import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

interface DialogConfirmPasswordProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void; // callback ให้ parent call API
}

const DialogConfirmPassword = ({
  open,
  onClose,
  onConfirm,
}: DialogConfirmPasswordProps) => {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    if (password === "1111") {
      onConfirm(); // ✅ เรียกฟังก์ชัน parent เพื่อ call API
      setPassword(""); // reset state
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

  const handleClose = () => {
    setPassword(""); // reset state เมื่อปิด
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ยืนยันรหัสผ่าน</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" className="mb-2">
          กรุณาใส่รหัสผ่านเพื่อยืนยันการดำเนินการ
        </Typography>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          disabled={!password}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmPassword;
