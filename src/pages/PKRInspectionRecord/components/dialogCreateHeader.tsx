import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import MyAutocomplete from "../components/Autocomplete";
import { Use_feature } from "../hooks/use_feature";

const DialogCreateHeader = ({ onClose }: { onClose: () => void }) => {
  const {
    selectedLot,
    setSelectedLot,

    lotDetail,
  } = Use_feature();

  return (
    <>
      <DialogTitle>Create New Record</DialogTitle>
      <DialogContent>
        {/* ใส่ฟอร์มหรือ input ที่คุณต้องการ */}
        <div>
          <MyAutocomplete
            modalData={lotDetail}
            selectValue={selectedLot}
            setSelectValue={setSelectedLot}
            uniqueKey="posm_item_code"
            label="Item Code"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            /* handle submit */
          }}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default DialogCreateHeader;
