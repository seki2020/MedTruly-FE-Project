import { AppointmentItemType } from "types";
import styles from "components/Card/Card.module.css";

export const Card = ({ item }: { item: AppointmentItemType }) => {
  return (
    <div className={styles.root}>
      <div>{item.patient.account.firstName}</div>
      <div>{item.type}</div>
      <div>{item.signee.account.firstName}</div>
      <div>
        {item.serviceStart}-{item.serviceEnd}
      </div>
    </div>
  );
};
