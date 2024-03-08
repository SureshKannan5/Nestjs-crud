import DataTable from "../app/components/DataTable";
import { Content } from "antd/es/layout/layout";
import { Button, Tag, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  useDeleteTaskMutation,
  useListAllTasksQuery,
} from "../redux/services/baseApiSetup";
import { STATUS_BADGE, PAGE_NOTIFICATIONS } from "../app/utils/constants";
import CustomOffCanvas from "../app/components/CustomOffCanvas";
import { useDispatch, useSelector } from "react-redux";
import { getCanvasInfo, setCanvasInfo } from "../redux/slices/canvas.slice";
import DeleteModal from "../app/components/DeleteModal";

const { Title } = Typography;

const HomePage = () => {
  const [loadPage, setLoadPage] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const canvasReduxState = useSelector(getCanvasInfo);

  const { data } = useListAllTasksQuery({});

  const [deleteTask] = useDeleteTaskMutation();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const matchedStatus = STATUS_BADGE[status];

        return (
          <Tag color={matchedStatus.color} icon={matchedStatus.icon}>
            {matchedStatus.name}
          </Tag>
        );
      },
    },
  ];

  const showDrawer = () => {
    dispatch(
      setCanvasInfo(canvasReduxState, {
        action: "create",
        isOpen: true,
        title: "Create Task",
      })
    );
  };

  const onEditRow = (record) => {
    dispatch(
      setCanvasInfo(canvasReduxState, {
        selectedRow: record,
        isOpen: true,
        action: "update",
        title: "Update Task",
      })
    );
  };

  const onDeletedRow = (record) => {
    dispatch(
      setCanvasInfo(canvasReduxState, {
        selectedRow: record,
      })
    );
    setModalOpen(() => true);
  };

  const hideModal = () => {
    setModalOpen(() => false);
  };

  const handleDelete = async () => {
    console.log(canvasReduxState);
    const { selectedRow } = canvasReduxState;
    console.log(selectedRow);
    try {
      const response = await deleteTask(selectedRow._id).unwrap();

      if (response.message === "Task deleted sucessfully") {
        PAGE_NOTIFICATIONS.success("Organization deleted sucessfully");
        setModalOpen(() => false);
        dispatch(
          setCanvasInfo(canvasReduxState, {
            selectedRow: {},
          })
        );

        setLoadPage((state) => !state);
      }
    } catch (error) {
      console.log(error);
      PAGE_NOTIFICATIONS.error(error.data.message);
    }
  };

  return (
    <>
      <DeleteModal
        open={modalOpen}
        handleDelete={handleDelete}
        hideModal={hideModal}
      />
      {canvasReduxState.isOpen && <CustomOffCanvas />}
      <div className="home_page_container">
        <Content
          className="whiteBox shadow layoutPadding"
          style={{
            margin: "10px auto",
            width: "100%",
            maxWidth: "100%",
            flex: "none",
          }}
        >
          <Title level={3}>Task Management</Title>
          <div className="filter-container">
            <div></div>
            <Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
              Add Task
            </Button>
          </div>

          <DataTable
            columns={columns}
            dataSource={data || []}
            isLoading={false}
            actions={{ onEdit: onEditRow, onDelete: onDeletedRow }}
          />
        </Content>
      </div>
    </>
  );
};

export default HomePage;
