import React, { useEffect, useState } from "react";
import { List, FilterPanel } from "components";
import styles from "App.module.css";
import dummyData from "mock/appointments.json";
import {
  AppointmentItemType,
  APPOINTMENT_TYPE,
  RawDataType,
  OptionsType,
} from "types";
import _ from "lodash";
import "antd/dist/antd.css";

function diffMonths(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7 * 4;
  return Math.abs(Math.round(diff));
}

function App() {
  const [data, setData] = useState<RawDataType>();
  const [keywords, setKeywords] = useState<string>();
  const [period, setPeriod] = useState<string>();
  const [patients, setPatients] = useState();
  const [type, setType] = useState();
  const [periodOptions, setPeriodOptions] = useState<OptionsType<unknown>[]>();
  const [patientsOptions, setPatientsOptions] =
    useState<OptionsType<unknown>[]>();
  const [typesOptions, setTypesOptions] = useState<OptionsType<unknown>[]>();

  const initiatePeriods = (jsonDate: AppointmentItemType[]) => {
    const monthOptions = jsonDate
      .map((row) => {
        const monthDiffCount = diffMonths(
          new Date(row.serviceStart),
          new Date(row.serviceEnd)
        );

        if (monthDiffCount === 0) {
          return [row.serviceStart.slice(0, 10)];
        }

        return new Array(monthDiffCount).fill("").map((v, i) => {
          const date = new Date(row.serviceStart);
          return new Date(date.setMonth(date.getMonth() + i))
            .toISOString()
            .slice(0, 10);
        });
      })
      .flat()
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    setPeriodOptions(
      _.uniq(monthOptions).map((period) => {
        return {
          label: period.slice(0, 7),
          value: period,
        };
      })
    );
  };

  const initiateTags = (jsonData: AppointmentItemType[]) => {
    const filteredTypes = _(jsonData)
      .map((item) => item.type)
      .uniq()
      .sort()
      .value();

    setTypesOptions(
      filteredTypes.map((type) => ({ label: type, value: type }))
    );
  };

  useEffect(() => {
    // period options initiate
    const rawList = dummyData.data.allNotes.edges as AppointmentItemType[];
    initiatePeriods(rawList);
    initiateTags(rawList);
  }, []);

  const filterData = (json: any) => {
    let rawList = json.data.allNotes.edges as AppointmentItemType[];

    // search
    if (keywords) {
      rawList = rawList.filter((row) => {
        return `${row.patient.account.firstName.toLowerCase()}${row.patient.account.lastName.toLowerCase()}`.includes(
          keywords.toLowerCase()
        );
      });
    }

    // period
    if (period) {
      rawList = rawList.filter((row) => {
        return (
          new Date(row.serviceStart).getTime() <= new Date(period).getTime() &&
          new Date(row.serviceEnd).getTime() >= new Date(period).getTime()
        );
      });
    }

    if (type) {
      rawList = rawList.filter((row) => {
        return row.type === type;
      });
    }

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
          typesOptions={typesOptions}
          patientsOptions={patientsOptions}
          periodOptions={periodOptions}
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
