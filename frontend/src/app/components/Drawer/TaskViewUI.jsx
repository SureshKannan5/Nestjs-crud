import { Descriptions } from "antd";
import { useSelector } from "react-redux";
import { getCanvasInfo } from "../../../redux/slices/canvas.slice";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useLazyGetSingleTaskQuery } from "../../../redux/services/baseApiSetup";
import { STATUS_BADGE } from "../../utils/constants";
import moment from "moment";
import { Tag } from "antd";

// UI Component for viewing task information

const TaskViewUI = () => {
  const { selectedRow } = useSelector(getCanvasInfo);

  const [getTaskById, { data }] = useLazyGetSingleTaskQuery();

  // fetch a Selected By ID

  useEffect(() => {
    if (!isEmpty(selectedRow["_id"])) {
      getTaskById(selectedRow["_id"]);
    }
  }, [getTaskById, selectedRow]);

  // get Status ui badge

  const getMatchedBadge = () => {
    const matchedStatus = STATUS_BADGE[data?.status];

    return (
      <Tag color={matchedStatus.color} icon={matchedStatus.icon}>
        {matchedStatus.name}
      </Tag>
    );
  };

  return (
    <Descriptions layout="vertical">
      <Descriptions.Item label="Title" span={24}>
        {data?.title || ""}
      </Descriptions.Item>
      <Descriptions.Item label="Description" span={24}>
        {data?.description || ""}
      </Descriptions.Item>
      <Descriptions.Item label="Status" span={24}>
        {data?.status && getMatchedBadge(data.status)}
      </Descriptions.Item>
      <Descriptions.Item label="Created Date" span={24}>
        {data?.createdAt
          ? moment(data?.createdAt).format("MMMM Do YYYY, h:mm:ss a")
          : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Last Updated Date" span={8}>
        {data?.updatedAt
          ? moment(data?.updatedAt).format("MMMM Do YYYY, h:mm:ss a")
          : ""}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default TaskViewUI;
