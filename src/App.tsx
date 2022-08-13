import React, { useEffect, useState } from "react";
import { List, FilterPanel } from "components";
import styles from "App.module.css";
import dummyData from "mock/appointments.json";
import { AppointmentItemType, APPOINTMENT_TYPE, RawDataType } from "types";

function App() {
  const [data, setData] = useState<RawDataType>();
  const [keywords, setKeywords] = useState<string>();
  const [period, setPeriod] = useState<string>();
  const [patients, setPatients] = useState();
  const [type, setType] = useState();

  const filterData = (json: any) => {
    const rawList = json.data.allNotes.edges;
    const task = rawList.filter(
      (item: AppointmentItemType) => item.status === APPOINTMENT_TYPE.PENDING
    );
    const review = rawList.filter(
      (item: AppointmentItemType) =>
        item.status === APPOINTMENT_TYPE.NEED_REVIEW
    );
    const done = rawList.filter(
      (item: AppointmentItemType) => item.status === APPOINTMENT_TYPE.COMPLETED
    );

    setData({ task, review, done });
  };

  useEffect(() => {
    filterData(dummyData);
  }, [keywords, period, patients, type]);

  const handleSearchTextChange = (val: string) => {
    setKeywords(val);
  };
  const hanlePeriodChange = (val: string) => {
    setPeriod(val);
  };
  const handlePatientsChange = (val: string) => {
    setPatients(val as any);
  };
  const handleTypeOfAppointmentChange = (val: string) => {
    setType(val as any);
  };

  return (
    <div className={styles.app}>
      <div className={styles.left}>
        <FilterPanel
          onSearchTextChange={handleSearchTextChange}
          onPeriodChange={hanlePeriodChange}
          onPatientsChange={handlePatientsChange}
          onTypeOfAppointmentChange={handleTypeOfAppointmentChange}
        ></FilterPanel>
      </div>
      <div className={styles.right}>
        <List items={data?.task} title={"Tasks"}></List>
        <List items={data?.review} title={"Review"}></List>
        <List items={data?.done} title={"Done"}></List>
      </div>
    </div>
  );
}

export default App;
