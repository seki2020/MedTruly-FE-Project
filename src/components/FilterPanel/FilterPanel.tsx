import styles from "components/FilterPanel/FilterPanel.module.css";
import { Select, Input } from "antd";
import {
  SearchOutlined,
  CalendarOutlined,
  UsergroupAddOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { FilterPanelProps } from "types";

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
    <div className={styles.root}>
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
        <div className={styles.iconSelect}>
          <div className={styles.iconStyle}>
            <CalendarOutlined />
          </div>
          <Select
            options={periodOptions}
            onChange={onPeriodChange}
            defaultValue={"ALL"}
            style={{ width: "100%" }}
          ></Select>
        </div>
      </div>
      <div className={styles.row}>
        <div>PATIENTS</div>
        <div className={styles.iconSelect}>
          <div className={styles.iconStyle}>
            <UsergroupAddOutlined />
          </div>
          <Select
            options={patientsOptions}
            onChange={onPatientsChange}
            defaultValue={"ALL"}
            style={{ width: "100%" }}
          ></Select>
        </div>
      </div>
      <div className={styles.row}>
        <div>TYPE OF APPOINTMENT</div>
        <div className={styles.iconSelect}>
          <div className={styles.iconStyle}>
            <TagOutlined />
          </div>
          <Select
            options={typesOptions}
            onChange={onTypeOfAppointmentChange}
            defaultValue={"ALL"}
            style={{ width: "100%" }}
          ></Select>
        </div>
      </div>
    </div>
  );
};
