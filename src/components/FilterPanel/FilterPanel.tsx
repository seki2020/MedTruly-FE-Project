import styles from "components/FilterPanel/FilterPanel.module.css";
import { DatePicker, Select, Input, Dropdown } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

interface FilterPanelProps {
  periodOptions: any;
  onSearchTextChange: (val: string) => void;
  onPeriodChange: (val: string) => void;
  onPatientsChange: (val: string) => void;
  onTypeOfAppointmentChange: (val: string) => void;
}
export const FilterPanel = ({
  periodOptions,
  onSearchTextChange,
  onPeriodChange,
  onPatientsChange,
  onTypeOfAppointmentChange,
}: FilterPanelProps) => {
  const [keyword, setKeyword] = useState<string>();

  return (
    <div>
      <div className={styles.row}>
        <Input
          value={keyword}
          placeholder="Search..."
          onChange={(e) => {
            setKeyword(e.target.value);
            onSearchTextChange(e.target.value);
          }}
          prefix={<SearchOutlined />}
        />
      </div>
      <div className={styles.row}>
        <div>PERIOD</div>
        <Select options={periodOptions} onChange={onPeriodChange}></Select>
      </div>
      <div className={styles.row}>
        <div>PATIENTS</div>
      </div>
    </div>
  );
};
