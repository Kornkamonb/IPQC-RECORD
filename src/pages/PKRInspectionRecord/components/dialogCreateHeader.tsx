import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import MyAutocomplete from "../components/Autocomplete";
import { Use_feature } from "../hooks/use_feature";

const DialogCreateHeader = ({ onClose }: { onClose: () => void }) => {
  const { selectedLot, setSelectedLot, lotDetail, lotFilter } = Use_feature();

  return (
    <>
      <DialogTitle>Create New Record</DialogTitle>
      <DialogContent>
        {/* ใส่ฟอร์มหรือ input ที่คุณต้องการ */}
        <div className="mt-4">
          <MyAutocomplete
            modalData={lotFilter}
            selectValue={selectedLot}
            setSelectValue={setSelectedLot}
            uniqueKey="lot"
            label="Lot NO"
          />
        </div>
        {/* แสดงรายละเอียดหลังจากเลือก lot */}
        {selectedLot && lotDetail && (
          <div className="mt-4 space-y-2 rounded-lg border p-3 bg-gray-50">
            <p>
              <strong>Lot:</strong> {lotDetail.lot}
            </p>
            <p>
              <strong>Product:</strong> {lotDetail.product_name}
            </p>
            <p>
              <strong>Process:</strong> {lotDetail.proc_disp}
            </p>
          </div>
        )}
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
          Create
        </Button>
      </DialogActions>
    </>
  );
};

export default DialogCreateHeader;
