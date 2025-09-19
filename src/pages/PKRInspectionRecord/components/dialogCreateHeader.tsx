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

const DialogCreateHeader = ({ onClose }: { onClose: () => void }) => {
  const { selectedLot, setSelectedLot, lotDetail, lotFilter } = Use_feature();

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
        {/* ใส่ฟอร์มหรือ input ที่คุณต้องการ */}
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
            sx={{
              mb: 2,
              color: "#1e293b",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
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

        {/* แสดงรายละเอียดหลังจากเลือก lot */}
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
              sx={{
                mb: 2,
                color: "#1e293b",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              📋 Lot Details
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
              <Box>
                <Chip
                  label="Lot Number"
                  size="small"
                  sx={{
                    mb: 1,
                    bgcolor: "#e0e7ff",
                    color: "#4338ca",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#1e293b",
                    fontWeight: 600,
                    fontSize: "1rem",
                    mb: 2,
                  }}
                >
                  {lotDetail.lot}
                </Typography>
              </Box>

              <Box>
                <Chip
                  label="Product Name"
                  size="small"
                  sx={{
                    mb: 1,
                    bgcolor: "#dcfce7",
                    color: "#166534",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#1e293b",
                    fontWeight: 600,
                    fontSize: "1rem",
                    mb: 2,
                  }}
                >
                  {lotDetail.product_name}
                </Typography>
              </Box>

              <Box>
                <Chip
                  label="Process"
                  size="small"
                  sx={{
                    mb: 1,
                    bgcolor: "#fef3c7",
                    color: "#92400e",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#1e293b",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
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
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1,
            fontWeight: 600,
            borderWidth: 2,
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
          onClick={() => {
            /* handle submit */
          }}
          variant="contained"
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1,
            fontWeight: 600,
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 35px rgba(16, 185, 129, 0.5)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          ✨ Create
        </Button>
      </DialogActions>
    </>
  );
};

export default DialogCreateHeader;
