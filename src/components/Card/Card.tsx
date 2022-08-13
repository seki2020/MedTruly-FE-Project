import { AppointmentItemType, SERVICE_TYPE } from "types";
import _ from "lodash";
import styles from "components/Card/Card.module.css";

const FAKE_USER_IMAGE_URL = "/logo192.png";

const TYPEDISPLAYMAP = {
  TYPE_A: "Type A",
  TYPE_B: "Type B",
  TYPE_C: "Type C",
};

const convertDateFormat = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TypeACard = ({ item }: { item: AppointmentItemType }) => (
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
);

const TypeBCard = ({ item }: { item: AppointmentItemType }) => (
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
);

const TypeCCard = ({ item }: { item: AppointmentItemType }) => (
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
);

export const Card = ({ item }: { item: AppointmentItemType }) => {
  if (item.type === SERVICE_TYPE.typeA) return <TypeACard item={item} />;
  if (item.type === SERVICE_TYPE.typeB) return <TypeBCard item={item} />;
  if (item.type === SERVICE_TYPE.typeC) return <TypeCCard item={item} />;
  return null;
};
