import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface ActionDialogProps {
  open: boolean;
  onClose: () => void;
  id: string;
  onSubmit: (id: string, action_detail: string, action_by: string) => void;
  initialData?: { action_detail?: string; action_by?: string };
}

const ActionDialog: React.FC<ActionDialogProps> = ({
  open,
  onClose,
  id,
  onSubmit,
  initialData,
}) => {
  const [actionDetail, setActionDetail] = useState("");
  const [actionBy, setActionBy] = useState("");

  useEffect(() => {
    if (initialData) {
      setActionDetail(initialData.action_detail || "");
      setActionBy(initialData.action_by || "");
    } else {
      setActionDetail("");
      setActionBy("");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    onSubmit(id, actionDetail, actionBy); // ✅ ส่งครบ 3 ตัว
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="font-bold text-lg text-gray-700">
        บันทึกข้อมูลการแก้ไข (Action)
      </DialogTitle>

      <DialogContent>
        <div className="mt-4 flex flex-col gap-4">
          <TextField
            label="Action Detail"
            fullWidth
            value={actionDetail}
            onChange={(e) => setActionDetail(e.target.value)}
            multiline
            minRows={2}
          />
          <TextField
            label="Action By"
            fullWidth
            value={actionBy}
            onChange={(e) => setActionBy(e.target.value)}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit" variant="outlined">
          ยกเลิก
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          บันทึก
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
