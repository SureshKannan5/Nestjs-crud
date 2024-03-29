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
  customPageSizeOptions,
} from "../app/utils/constants";
import CustomOffCanvas from "../app/components/Drawer/CustomOffCanvas";
import { useDispatch, useSelector } from "react-redux";
import { getCanvasInfo, setCanvasInfo } from "../redux/slices/canvas.slice";
import DeleteModal from "../app/components/DeleteModal";
import CustomSelect from "../app/components/CustomSelect";
import { isEmpty } from "lodash";

const { Title, Text } = Typography;

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // Datatable required fields are present in below state fro server side pagination

  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Filter payload for listing task.

  const [listPayload, setListPayload] = useState({
    sortKey: "DESC",
    status: "ALL",
  });

  const dispatch = useDispatch();

  const canvasReduxState = useSelector(getCanvasInfo);

  const [deleteTask] = useDeleteTaskMutation();

  const [listFilteredTasks, allTasksResponse] = useListFilteredTasksMutation();

  // below functions are called whenever canvas open and close
  const showDrawer = () => {
    dispatch(
      setCanvasInfo(canvasReduxState, {
        isOpen: true,
        title: "Create Task",
      })
    );
  };

  const hideModal = () => {
    setModalOpen(() => false);
  };

  // Task Actions View, edit, delete when these actions are clicked

  const onEditRow = (record) => {
    dispatch(
      setCanvasInfo(canvasReduxState, {
        selectedRow: record,
        isOpen: true,
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

  const onTaskView = async (record) => {
    dispatch(
      setCanvasInfo(canvasReduxState, {
        selectedRow: record,
        isOpen: true,
        title: "View Task",
      })
    );
  };

  // Delete the task with API actions and Update the page

  const handleDelete = async () => {
    const { selectedRow } = canvasReduxState;
    try {
      const response = await deleteTask(selectedRow._id).unwrap();

      if (response.message === "Task deleted sucessfully") {
        PAGE_NOTIFICATIONS.success("Task deleted sucessfully");
        setModalOpen(() => false);

        // clear selected row and toggle refresh for updated data
        dispatch(
          setCanvasInfo(canvasReduxState, {
            selectedRow: {},
            refreshPage: !canvasReduxState.refreshPage,
          })
        );
      }
    } catch (error) {
      console.log(error);
      PAGE_NOTIFICATIONS.error(error.data.message);
    }
  };

  // handle when pageNumber change in a table

  const handleTableChange = (pagination) => {
    setTableParams((state) => ({ ...state, ...pagination }));
  };

  // Handle filters values Chnage

  const onFilterChange = (name, value) => {
    setTableParams((state) => ({ ...state, current: 1, total: 0 }));

    setListPayload((state) => ({ ...state, [name]: value }));
  };

  // component life cycle

  // fetch data from the server whenever filter and refresh flag is changed

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
      PAGE_NOTIFICATIONS.error(error.data.message);
    }
  }, [
    listPayload.sortKey,
    tableParams.current,
    listPayload.status,
    tableParams.pageSize,
    canvasReduxState.refreshPage,
  ]);

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
                onChange={(value) => onFilterChange("status", value)}
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
                  onChange={(value) => onFilterChange("sortKey", value)}
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
            pagination={{
              showSizeChanger: true,
              ...tableParams,
              pageSizeOptions: customPageSizeOptions,
            }}
            actions={{
              onEdit: onEditRow,
              onDelete: onDeletedRow,
              onView: onTaskView,
            }}
            onChange={handleTableChange}
          />
        </Content>
      </div>
    </>
  );
};

export default HomePage;
