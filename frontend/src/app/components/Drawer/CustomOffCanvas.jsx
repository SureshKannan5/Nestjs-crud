import { Drawer, Form, Button, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCanvasInfo,
  setCanvasInfo,
} from "../../../redux/slices/canvas.slice";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../../redux/services/baseApiSetup";
import { TASK_STATUS_OPTIONS, PAGE_NOTIFICATIONS } from "../../utils/constants";
import CustomSelect from "../CustomSelect";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import TaskViewUI from "./TaskViewUI";

const CustomOffCanvas = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const canvasReduxState = useSelector(getCanvasInfo);

  const { title, selectedRow, isOpen, refreshPage } = canvasReduxState;

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  // set form fields for selected task

  useEffect(() => {
    if (!isEmpty(selectedRow)) {
      form.setFieldsValue(selectedRow);
    }
  }, [selectedRow, form]);

  // submit form Date when appropriate action.

  const onSubmit = async (values) => {
    const isCreateView = title === "Create Task";

    // Create a new task with fields
    if (isCreateView) {
      try {
        await createTask(values).unwrap();
        PAGE_NOTIFICATIONS.success("Task created sucessfully");
        onClose("event", true);
      } catch (error) {
        PAGE_NOTIFICATIONS.error(error.data.message);
      }
      return;
    }

    try {
      // Update Existing task
      await updateTask({ id: selectedRow._id, payload: values }).unwrap();
      PAGE_NOTIFICATIONS.success("Task updated sucessfully");
      onClose("event", true);
    } catch (error) {
      PAGE_NOTIFICATIONS.error(error.data.message);
    }
  };

  // actions needs to perform when canvas is closed. close and empty the form fields and trigger page refresh action

  const onClose = (cleseEvent, reloadPage) => {
    dispatch(
      setCanvasInfo(canvasReduxState, {
        selectedRow: {},
        refreshPage: reloadPage ? !refreshPage : refreshPage,
        isOpen: false,
        title: "",
      })
    );
  };

  const onSelectChange = (value) => {
    form.setFieldValue(value);
  };
  return (
    <Drawer
      title={title}
      onClose={onClose}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      {title === "View Task" ? (
        <TaskViewUI />
      ) : (
        <Form
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{
            remember: true,
          }}
          form={form}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Please enter title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="please enter url description"
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <CustomSelect
              options={TASK_STATUS_OPTIONS}
              placeholder="Select Status"
              onChange={onSelectChange}
            />
          </Form.Item>

          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form>
      )}
    </Drawer>
  );
};

export default CustomOffCanvas;
