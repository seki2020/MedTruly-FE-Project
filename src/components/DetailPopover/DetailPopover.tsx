import { convertDateFormat, TYPEDISPLAYMAP } from "utils";
import { CardCommonProps, SERVICE_TYPE } from "types";
import styles from "components/DetailPopover/DetailPopover.module.css";

export const DetailPopover = ({ item }: CardCommonProps) => {
  return (
    <div className={styles.detailCompRoot}>
      <h1
        className={styles.detailCompTitle}
        style={{
          borderColor:
            item.type === SERVICE_TYPE.typeA
              ? "rgb(50, 179, 94)"
              : item.type === SERVICE_TYPE.typeB
              ? "rgb(58, 95, 229)"
              : "rgb(254, 172, 86)",
        }}
      >
        {TYPEDISPLAYMAP[item.type]}
      </h1>
      <div className={styles.serviceDate}>
        {convertDateFormat(item.serviceStart) +
          " - " +
          convertDateFormat(item.serviceEnd)}
      </div>
      <div className={styles.description}>{item.description}</div>
    </div>
  );
};
