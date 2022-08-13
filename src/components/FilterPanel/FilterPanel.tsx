import styles from "components/FilterPanel/FilterPanel.module.css";

interface FilterPanelProps {
  onSearchTextChange: (val: string) => void;
  onPeriodChange: (val: string) => void;
  onPatientsChange: (val: string) => void;
  onTypeOfAppointmentChange: (val: string) => void;
}
export const FilterPanel = ({
  onSearchTextChange,
  onPeriodChange,
  onPatientsChange,
  onTypeOfAppointmentChange,
}: FilterPanelProps) => {
  return <div>FilterPanel...</div>;
};
