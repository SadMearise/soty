import { FC } from "react";
import { Alert as AlertType } from "../../store/features/alert/types";
import Alert from "./Alert";

type AlertsProps = {
  alerts: AlertType[];
  onClose: (id: number) => void;
};

const classes = {
  wrapper: "flex gap-3 flex-col-reverse",
};

const Alerts: FC<AlertsProps> = ({ alerts, onClose }) => (
  <div className={classes.wrapper}>
    {alerts.map((alert) => (
      <Alert
        key={alert.id}
        message={alert.message}
        severity={alert.severity}
        onClose={() => onClose(alert.id)}
      />
    ))}
  </div>
);

export default Alerts;
