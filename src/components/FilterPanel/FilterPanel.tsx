import styles from "components/FilterPanel/FilterPanel.module.css";
import { Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { OptionsType } from "types";

interface FilterPanelProps {
  periodOptions?: OptionsType<unknown>[];
  patientsOptions?: OptionsType<unknown>[];
  typesOptions?: OptionsType<unknown>[];
  onSearchTextChange: (val: string) => void;
  onPeriodChange: (val: string) => void;
  onPatientsChange: (val: string) => void;
  onTypeOfAppointmentChange: (val: string) => void;
}
export const FilterPanel = ({
  periodOptions,
  patientsOptions,
  typesOptions,
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
        <Select options={patientsOptions} onChange={onPatientsChange}></Select>
      </div>
      <div className={styles.row}>
        <div>TYPE OF APPOINTMENT</div>
        <Select
          options={typesOptions}
          onChange={onTypeOfAppointmentChange}
        ></Select>
      </div>
    </div>
  );
};
