import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useMemo } from "react";

interface MyAutocompleteProps {
  modalData: any[];
  selectValue: string;
  setSelectValue: (value: string) => void;
  uniqueKey: string;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

const removeDuplicates = (data: any, key: any) => {
  const uniqueSet = new Set();
  return data.filter((item: any) => {
    if (uniqueSet.has(item[key])) {
      return false;
    }
    uniqueSet.add(item[key]);
    return true;
  });
};

const MyAutocomplete = ({
  modalData,
  selectValue,
  setSelectValue,
  uniqueKey,
  label,
  disabled,
}: MyAutocompleteProps) => {
  const sortedUniqueOptions = useMemo(() => {
    const uniqueOptions = removeDuplicates(modalData, uniqueKey);
    uniqueOptions.unshift({ [uniqueKey]: "ALL" });

    // Sort by the first character (same as groupBy criteria)
    return uniqueOptions.sort((a, b) =>
      a[uniqueKey].charAt(0).localeCompare(b[uniqueKey].charAt(0))
    );
  }, [modalData, uniqueKey]);

  return (
    <Autocomplete
      size="small"
      disabled={disabled}
      options={sortedUniqueOptions}
      getOptionLabel={(option) => option[uniqueKey]}
      groupBy={(option) => option[uniqueKey].charAt(0)}
      value={
        sortedUniqueOptions.find(
          (item: any) => item[uniqueKey] === selectValue
        ) || null
      }
      onChange={(event, newValue) => {
        console.log(event);
        setSelectValue(newValue ? newValue[uniqueKey] : "ALL");
      }}
      renderInput={(params) => (
        <TextField {...params} label={label || "Select an Option"} />
      )}
      isOptionEqualToValue={(option, value) =>
        option[uniqueKey] === value[uniqueKey]
      }
    />
  );
};

export default MyAutocomplete;
