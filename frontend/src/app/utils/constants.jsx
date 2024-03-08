import {
  FieldTimeOutlined,
  CheckOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { message } from "antd";

export const STATUS_BADGE = {
  TODO: { name: "Todo", color: "red", icon: <ScheduleOutlined /> },
  IN_PROGRESS: {
    name: "In Progress",
    color: "purple",
    icon: <FieldTimeOutlined />,
  },
  DONE: { name: "Done", color: "green", icon: <CheckOutlined color="green" /> },
};

export const PAGE_NOTIFICATIONS = {
  success: (content) => {
    message.success(content, 2);
  },
  error: (content) => {
    message.error(content, 2);
  },
  warning: (content) => {
    message.warning(content, 2);
  },
};

export const TASK_STATUS_OPTIONS = [
  { label: "To do", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

export const FILTER_STATUS_OPTIONS = [
  { label: "All", value: "all" },
  ...TASK_STATUS_OPTIONS,
];

export const SORT_OPTIONS = [
  { label: "Old to New", value: "ASC" },
  { label: "New to Old", value: "DESC" },
];
