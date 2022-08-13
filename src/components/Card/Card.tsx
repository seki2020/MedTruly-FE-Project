import React from "react";
import { AppointmentItemType, SERVICE_TYPE } from "types";
import { Popover } from "antd";
import styles from "components/Card/Card.module.css";
import { DetailPopover } from "components/DetailPopover/DetailPopover";
import { convertDateFormat, TYPEDISPLAYMAP } from "utils";

const FAKE_USER_IMAGE_URL = "/logo192.png";

const TypeACard: React.FC<{ item: AppointmentItemType }> = ({ item }) => (
  <Popover
    placement="bottomRight"
    content={<DetailPopover item={item}></DetailPopover>}
  >
    <div className={styles.root}>
      <h3 className={styles.title}>
        {item.patient.account.firstName + " " + item.patient.account.lastName}
      </h3>
      <div className={styles.signed}>
        <div className={styles.subTitle}>Signed By</div>
        <div>
          <span className={styles.userIcon}>
            <img
              src={FAKE_USER_IMAGE_URL}
              alt="user"
              style={{ width: 25, height: 25 }}
            />
          </span>
          <span className={styles.signedName}>
            {item.signee.account.firstName + " " + item.signee.account.lastName}
          </span>
        </div>
        <div className={styles.subTitle}>Service Date</div>
        <div className={styles.serviceDate}>
          {convertDateFormat(item.serviceStart) +
            " - " +
            convertDateFormat(item.serviceEnd)}
        </div>
      </div>
      <div className={`${styles.type} ${styles.typea}`}>
        {TYPEDISPLAYMAP[item.type]}
      </div>
    </div>
  </Popover>
);

const TypeBCard: React.FC<{ item: AppointmentItemType }> = ({ item }) => (
  <Popover
    placement="bottomRight"
    content={<DetailPopover item={item}></DetailPopover>}
  >
    <div className={styles.root}>
      <h3 className={styles.title}>
        {item.patient.account.firstName + " " + item.patient.account.lastName}
      </h3>
      <div className={styles.subTitle}>Service Date</div>
      <div className={styles.serviceDate}>
        {convertDateFormat(item.serviceStart) +
          " - " +
          convertDateFormat(item.serviceEnd)}{" "}
      </div>
      <div className={`${styles.type} ${styles.typeb}`}>
        {TYPEDISPLAYMAP[item.type]}
      </div>
    </div>
  </Popover>
);

const TypeCCard: React.FC<{ item: AppointmentItemType }> = ({ item }) => (
  <Popover
    placement="bottomRight"
    content={<DetailPopover item={item}></DetailPopover>}
  >
    <div className={styles.root}>
      <h3 className={styles.title}>
        {item.patient.account.firstName + " " + item.patient.account.lastName}
      </h3>
      <div className={styles.signed}>
        <div className={styles.typeCUsers}>
          <div>
            <div className={styles.subTitle}>Signed By</div>
            <div>
              <span className={styles.userIcon}>
                <img
                  src={FAKE_USER_IMAGE_URL}
                  alt="user"
                  style={{ width: 25, height: 25 }}
                />
              </span>
              <span className={styles.signedName}>
                {item.signee.account.firstName +
                  " " +
                  item.signee.account.lastName}
              </span>
            </div>
          </div>
          <div>
            <div className={styles.subTitle}>Attested By</div>
            <div>
              <span className={styles.userIcon}>
                <img
                  src={FAKE_USER_IMAGE_URL}
                  alt="user"
                  style={{ width: 25, height: 25 }}
                />
              </span>
              <span className={styles.signedName}>
                {item.signee.account.firstName +
                  " " +
                  item.signee.account.lastName}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.subTitle}>Service Date</div>
        <div className={styles.serviceDate}>
          {convertDateFormat(item.serviceStart) +
            " - " +
            convertDateFormat(item.serviceEnd)}{" "}
        </div>
      </div>
      <div className={`${styles.type} ${styles.typec}`}>
        {TYPEDISPLAYMAP[item.type]}
      </div>
    </div>
  </Popover>
);

export const Card: React.FC<{ item: AppointmentItemType }> = ({ item }) => {
  return (
    <>
      {item.type === SERVICE_TYPE.typeA ? (
        <TypeACard item={item} />
      ) : item.type === SERVICE_TYPE.typeB ? (
        <TypeBCard item={item} />
      ) : (
        <TypeCCard item={item} />
      )}
    </>
  );
};
