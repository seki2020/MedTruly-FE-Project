export enum APPOINTMENT_TYPE {
  PENDING = "PENDING",
  NEED_REVIEW = "NEED_REVIEW",
  COMPLETED = "COMPLETED",
}

export enum SERVICE_TYPE {
  typeA = "TYPE_A",
  typeB = "TYPE_B",
  typeC = "TYPE_C",
}

export interface AccountType {
  firstName: string;
  id: string;
  lastName: string;
}

export interface PatientType {
  account: AccountType;
  id: string;
}

export interface SignessType {
  account: AccountType;
  id: string;
}

export interface ListProps {
  items?: AppointmentItemType[];
  title: string;
}

export interface FilterPanelProps {
  periodOptions?: OptionsType<unknown>[];
  patientsOptions?: OptionsType<unknown>[];
  typesOptions?: OptionsType<unknown>[];
  onSearchTextChange: (val: string) => void;
  onPeriodChange: (val: string) => void;
  onPatientsChange: (val: string) => void;
  onTypeOfAppointmentChange: (val: string) => void;
}

export interface AppointmentItemType {
  id: string;
  description: string;
  serviceEnd: string;
  serviceStart: string;
  type: SERVICE_TYPE;
  status: APPOINTMENT_TYPE;
  patient: PatientType;
  signee: SignessType;
}

export interface RawDataType {
  task: AppointmentItemType[];
  review: AppointmentItemType[];
  done: AppointmentItemType[];
}

export interface OptionsType<T> {
  label: string;
  value: T;
}
