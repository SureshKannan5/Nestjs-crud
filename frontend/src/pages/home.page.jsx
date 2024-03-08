import DataTable from "../app/components/DataTable";
import { Content } from "antd/es/layout/layout";
import { Button, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import {
  useDeleteTaskMutation,
  useListFilteredTasksMutation,
} from "../redux/services/baseApiSetup";
import {
  PAGE_NOTIFICATIONS,
  SORT_OPTIONS,
  FILTER_STATUS_OPTIONS,
  TASK_TABLE_COLUMNS,
} from "../app/utils/constants";
import CustomOffCanvas from "../app/components/CustomOffCanvas";
import { useDispatch, useSelector } from "react-redux";
import { getCanvasInfo, setCanvasInfo } from "../redux/slices/canvas.slice";
import DeleteModal from "../app/components/DeleteModal";
import CustomSelect from "../app/components/CustomSelect";
import { get, isEmpty } from "lodash";

const { Title, Text } = Typography;

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [listPayload, setListPayload] = useState({
    sortKey: "ASC",
    status: "ALL",
  });

  const dispatch = useDispatch();

  const canvasReduxState = useSelector(getCanvasInfo);

  const [deleteTask] = useDeleteTaskMutation();

  const [listFilteredTasks, allTasksResponse] = useListFilteredTasksMutation();

  const getFilterTasks = useCallback(async () => {
    try {
      const response = await listFilteredTasks({
        page: tableParams.current,
        limit: tableParams.pageSize,
        payload: listPayload,
      }).unwrap();

      setTableParams((state) => ({ ...state, total: response.totalTasks }));
    } catch (error) {
      console.log("error", error);
    }
  }, [
    listPayload.sortKey,
    tableParams.current,
    listPayload.status,
    tableParams.pageSize,
  ]);

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
    const { selectedRow } = canvasReduxState;
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
      }
    } catch (error) {
      console.log(error);
      PAGE_NOTIFICATIONS.error(error.data.message);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter);
    setTableParams((state) => ({ ...state, ...pagination }));
  };

  // component life cycle

  useEffect(() => {
    getFilterTasks();
  }, [getFilterTasks]);

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
            <Space direction="vertical">
              {" "}
              <Text>Filter By Status</Text>
              <CustomSelect
                style={{ width: 200 }}
                options={FILTER_STATUS_OPTIONS}
                defaultValue={FILTER_STATUS_OPTIONS[0]}
                placeholder="Select Status"
                onChange={(status) =>
                  setListPayload((state) => ({
                    ...state,
                    status,
                  }))
                }
              />
            </Space>

            <Space dir="horizontal">
              <Space direction="horizontal">
                <Text>Sort By</Text>
                <CustomSelect
                  style={{ width: 200 }}
                  defaultValue={SORT_OPTIONS[0]}
                  options={SORT_OPTIONS}
                  placeholder="Sort By"
                  onChange={(sortKey) => {
                    setListPayload((state) => ({
                      ...state,
                      sortKey,
                    }));
                  }}
                />
              </Space>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showDrawer}
              >
                Add Task
              </Button>
            </Space>
          </div>

          <DataTable
            columns={TASK_TABLE_COLUMNS}
            dataSource={
              !isEmpty(allTasksResponse.data?.data)
                ? allTasksResponse.data?.data
                : []
            }
            isLoading={allTasksResponse.isLoading}
            pagination={tableParams}
            actions={{ onEdit: onEditRow, onDelete: onDeletedRow }}
            onChange={handleTableChange}
          />
        </Content>
      </div>
    </>
  );
};

export default HomePage;
