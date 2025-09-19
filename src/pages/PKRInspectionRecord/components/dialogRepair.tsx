import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import { useState } from "react";

interface DialogRepairProps {
  open: boolean;
  onClose: () => void;
  rowData: any; // สามารถปรับเป็น type ที่ชัดเจนถ้ารู้โครงสร้าง row
  onSave: (data: any) => void;
}

const DialogRepair = ({
  open,
  onClose,
  rowData,
  onSave,
}: DialogRepairProps) => {
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
    <DialogContent
      sx={{
        p: 0,
        maxWidth: 750,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          textAlign: "center",
          fontSize: "1.4rem",
          fontWeight: 600,
          py: 2,
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "transparent",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              width: 32,
              height: 32,
            }}
          >
            📝
          </Avatar>
          Edit Record
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 4,
          background: "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        {/* Product Information Card */}
        <Box
          sx={{
            mb: 2,
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
              background: "linear-gradient(to bottom, #667eea, #764ba2)",
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
            📦 Product Information
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            <Box>
              <Chip
                label="Lot Number"
                size="small"
                sx={{
                  mb: 1.5,
                  bgcolor: "#e0e7ff",
                  color: "#4338ca",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#1e293b",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              >
                {formData.lot_no ?? "-"}
              </Typography>
            </Box>
            <Box>
              <Chip
                label="Product Name"
                size="small"
                sx={{
                  mb: 1.5,
                  bgcolor: "#dcfce7",
                  color: "#166534",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#1e293b",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              >
                {formData.product_name ?? "-"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Form Fields Card */}
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
            ✏️ Edit Values
          </Typography>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            {[
              { field: "pkr_remain_pcs", label: "PKR Remain Pcs", icon: "📦" },
              { field: "pkr_tear_pcs", label: "PKR Tear Pcs", icon: "💥" },
              {
                field: "pic_incomplete_pcs",
                label: "PIC Incomplete Pcs",
                icon: "⚠️",
              },
              {
                field: "pic_misposition_pcs",
                label: "PIC Misposition Pcs",
                icon: "🔄",
              },
              { field: "adh_flow_flow", label: "Adh Flow Flow", icon: "🌊" },
              { field: "mat_remain_pcs", label: "Mat Remain Pcs", icon: "🧱" },
            ].map(({ field, label, icon }) => (
              <TextField
                key={field}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <span>{icon}</span>
                    {label}
                  </Box>
                }
                type="number"
                value={formData[field] ?? ""}
                onChange={(e) => handleChange(field, Number(e.target.value))}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    background:
                      "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                    "&:hover fieldset": {
                      borderColor: "#667eea",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#667eea",
                      borderWidth: 2,
                      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#667eea",
                    fontWeight: 600,
                  },
                }}
              />
            ))}

            <TextField
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>🚫</span>
                  Others Rej
                </Box>
              }
              type="number"
              value={formData.others_rej ?? ""}
              onChange={(e) =>
                handleChange("others_rej", Number(e.target.value))
              }
              fullWidth
              variant="outlined"
              sx={{
                gridColumn: "span 2",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                  "&:hover fieldset": {
                    borderColor: "#667eea",
                    borderWidth: 2,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                    borderWidth: 2,
                    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#667eea",
                  fontWeight: 600,
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 4,
          background: "linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%)",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            borderWidth: 2,
            borderColor: "#ef4444",
            color: "#ef4444",
            fontWeight: 600,
            background: "linear-gradient(145deg, #ffffff 0%, #fef2f2 100%)",
            "&:hover": {
              borderColor: "#dc2626",
              background: "linear-gradient(145deg, #fef2f2 0%, #fee2e2 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(239, 68, 68, 0.25)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          ❌ Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a67d8 0%, #6b4494 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 35px rgba(102, 126, 234, 0.5)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          💾 Save Changes
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default DialogRepair;
