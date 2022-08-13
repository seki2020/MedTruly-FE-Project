export const TYPEDISPLAYMAP = {
  TYPE_A: "Type A",
  TYPE_B: "Type B",
  TYPE_C: "Type C",
};

export const convertDateFormat = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const diffMonths = (dt2: Date, dt1: Date) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7 * 4;
  return Math.abs(Math.round(diff));
};
