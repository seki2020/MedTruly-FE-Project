import React, { useCallback, useEffect, useState } from "react";
import { List, FilterPanel } from "components";
import styles from "App.module.css";
import dummyData from "mock/appointments.json";
import {
  AppointmentItemType,
  APPOINTMENT_TYPE,
  RawDataType,
  OptionsType,
  SERVICE_TYPE,
} from "types";
import _ from "lodash";
import "antd/dist/antd.css";
import { diffMonths } from "utils";

function App() {
  const [data, setData] = useState<RawDataType>();
  const [keywords, setKeywords] = useState<string>();
  const [period, setPeriod] = useState<string>();
  const [patients, setPatients] = useState<string>();
  const [type, setType] = useState<string>();
  const [periodOptions, setPeriodOptions] = useState<OptionsType<string>[]>();
  const [patientsOptions, setPatientsOptions] =
    useState<OptionsType<string>[]>();
  const [typesOptions, setTypesOptions] = useState<OptionsType<string>[]>();

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

    const result = _.uniq(monthOptions).map((period) => {
      return {
        label: period.slice(0, 7),
        value: period,
      };
    });

    // add all options
    result.unshift({ label: "ALL", value: "" });

    setPeriodOptions(result);
  };

  const initiateTags = (jsonData: AppointmentItemType[]) => {
    const filteredTypes = _(jsonData)
      .map((item) => item.type)
      .uniq()
      .sort()
      .value();

    const result = filteredTypes.map((type) => ({ label: type, value: type }));

    // add all options
    result.unshift({ label: "ALL" as SERVICE_TYPE, value: "" as SERVICE_TYPE });
    setTypesOptions(result);
  };

  const initiatePatients = (jsonData: AppointmentItemType[]) => {
    const filteredPatientAccount = _(jsonData)
      .map((item) => JSON.stringify(item.patient.account))
      .uniq()
      .sort()
      .value();

    const result = filteredPatientAccount.map((patient) => {
      const item = JSON.parse(patient);
      return {
        label: `${item.firstName} ${item.lastName}`,
        value: item.id,
      };
    });

    // add all options
    result.unshift({ label: "ALL" as SERVICE_TYPE, value: "" as SERVICE_TYPE });

    setPatientsOptions(result);
  };

  useEffect(() => {
    // period options initiate
    const rawList = dummyData.data.allNotes.edges as AppointmentItemType[];
    initiatePeriods(rawList);
    initiateTags(rawList);
    initiatePatients(rawList);
  }, []);

  const filterData = useCallback(
    (json: { data: { allNotes: { edges: {} } } }) => {
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
            new Date(row.serviceStart).getTime() <=
              new Date(period).getTime() &&
            new Date(row.serviceEnd).getTime() >= new Date(period).getTime()
          );
        });
      }

      // patients
      if (patients) {
        rawList = rawList.filter((row) => {
          return row.patient.account.id === patients;
        });
      }

      // type
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
        (item: AppointmentItemType) =>
          item.status === APPOINTMENT_TYPE.COMPLETED
      );

      setData({ task, review, done });
    },
    [keywords, period, patients, type]
  );

  useEffect(() => {
    filterData(dummyData);
  }, [keywords, period, patients, type, filterData]);

  return (
    <div className={styles.app}>
      <div className={styles.left}>
        <FilterPanel
          typesOptions={typesOptions}
          patientsOptions={patientsOptions}
          periodOptions={periodOptions}
          onSearchTextChange={setKeywords}
          onPeriodChange={setPeriod}
          onPatientsChange={setPatients}
          onTypeOfAppointmentChange={setType}
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
