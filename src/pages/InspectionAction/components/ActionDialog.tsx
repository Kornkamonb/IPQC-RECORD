import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
// Import styled from MUI's styling system
import { styled } from "@mui/system";

// --- Custom styled components for a fresher look (Arial Font) ---

const commonArialStyle = {
  fontFamily: "Arial, sans-serif",
};

const StyledDialogTitle = styled(DialogTitle)(({}) => ({
  ...commonArialStyle, // Apply Arial
  backgroundColor: "#e3f2fd", // Light blue background for title
  color: "#1976d2", // A nice shade of blue for text
  fontWeight: 500,
  fontSize: "1.75rem", // Larger title
  padding: "16px 24px",
  borderBottom: "1px solid #bbdefb", // Subtle border
}));

const StyledButton = styled(Button)(({}) => ({
  ...commonArialStyle, // Apply Arial
  textTransform: "none", // Keep button text as is
  fontWeight: 600,
  padding: "8px 20px",
  borderRadius: "8px", // More rounded buttons
  "&.MuiButton-containedPrimary": {
    backgroundColor: "#4caf50", // A fresh green for primary action
    "&:hover": {
      backgroundColor: "#388e3c",
    },
  },
  "&.MuiButton-outlinedInherit": {
    borderColor: "#90caf9", // Light blue border for outlined
    color: "#1976d2",
    "&:hover": {
      backgroundColor: "#e3f2fd",
      borderColor: "#64b5f6",
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  // Apply Arial to the entire TextField container
  ...commonArialStyle,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px", // More rounded text fields
    "& fieldset": {
      borderColor: "#90caf9", // Light blue border for fields
    },
    "&:hover fieldset": {
      borderColor: "#64b5f6", // Slightly darker on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2", // Primary blue when focused
      borderWidth: "2px", // Thicker border on focus
    },
  },
  "& .MuiInputLabel-root": {
    ...commonArialStyle, // Ensure label is Arial
    color: "#424242", // Darker label color
    fontWeight: 500,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#1976d2", // Primary blue when label is focused
  },
}));

// --- Interface and Component Logic (No Change) ---

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
    onSubmit(id, actionDetail, actionBy);
  };

  return (
    // Apply Arial to the main Dialog component via sx for maximum coverage
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          fontFamily: "Arial, sans-serif", // Ensures all default text uses Arial
        },
      }}
    >
      <StyledDialogTitle>บันทึกข้อมูลการแก้ไข (Action)</StyledDialogTitle>
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <div className="flex flex-col gap-5">
          <div className="mt-2"></div>
          <StyledTextField
            label="Action Detail"
            fullWidth
            value={actionDetail}
            onChange={(e) => setActionDetail(e.target.value)}
            multiline
            minRows={4}
            variant="outlined"
          />
          <StyledTextField
            label="Action By"
            fullWidth
            value={actionBy}
            onChange={(e) => setActionBy(e.target.value)}
            variant="outlined"
          />
        </div>
      </DialogContent>
      <DialogActions
        sx={{ padding: "16px 24px", borderTop: "1px solid #eeeeee" }}
      >
        <StyledButton onClick={onClose} color="inherit" variant="outlined">
          ยกเลิก
        </StyledButton>
        <StyledButton
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          บันทึก
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;
