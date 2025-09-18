import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface DialogEditRecordProps {
  open: boolean;
  onClose: () => void;
  rowData: any; // สามารถปรับเป็น type ที่ชัดเจนถ้ารู้โครงสร้าง row
  onSave: (data: any) => void;
}

const DialogEditRecord = ({
  open,
  onClose,
  rowData,
  onSave,
}: DialogEditRecordProps) => {
  const [formData, setFormData] = useState(rowData ?? {});

  // อัพเดตเมื่อ rowData เปลี่ยน
  // ถ้าไม่ใส่ useEffect เวลาเลือก row ใหม่ dialog จะยังโชว์ค่าเก่า
  // สามารถใช้ useEffect อัพเดต state ได้:
  // useEffect(() => { setFormData(rowData ?? {}); }, [rowData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <DialogContent>
      <DialogTitle>Edit Record</DialogTitle>
      <DialogContent dividers>
        {/* ตัวอย่างช่องแก้ไข */}
        <TextField
          label="Lot No"
          value={formData.lot_no || ""}
          onChange={(e) => handleChange("lot_no", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product Name"
          value={formData.product_name || ""}
          onChange={(e) => handleChange("product_name", e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default DialogEditRecord;
