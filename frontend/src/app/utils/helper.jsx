import {
  FieldTimeOutlined,
  CheckOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";

export const getStatusBadge = {
  TODO: { name: "Todo", color: "red", icon: <ScheduleOutlined /> },
  IN_PROGRESS: {
    name: "In Progress",
    color: "purple",
    icon: <FieldTimeOutlined />,
  },
  DONE: { name: "Done", color: "green", icon: <CheckOutlined color="green" /> },
};
