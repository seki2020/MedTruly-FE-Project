import { AppointmentItemType, ListProps } from "types";
import { Card } from "components";
import styles from "components/List/List.module.css";

export const List = ({ items, title }: ListProps) => {
  return (
    <div className={styles.panelContainer}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.itemContainer}>
        {items?.map((item: AppointmentItemType, index: number) => {
          return <Card item={item} key={`list-${title}-${index}`}></Card>;
        })}
      </div>
    </div>
  );
};
