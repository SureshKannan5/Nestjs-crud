import { Table } from "antd";
import { useMemo } from "react";
import { Space, Dropdown } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const DataTable = ({ columns, dataSource, actions, isLoading, ...props }) => {
  const items = [
    {
      label: "View",
      key: "view",
      icon: <EyeOutlined />,
    },
    {
      label: "Edit",
      key: "edit",
      icon: <EditOutlined />,
    },
    {
      type: "divider",
    },

    {
      label: "Delete",
      key: "delete",
      icon: <DeleteOutlined />,
    },
  ];

  const convertedColumns = useMemo(
    () => [
      ...columns,
      {
        title: "Action",
        key: "operation",
        render: (_, record) => (
          <Space size="middle">
            {convertedColumns && (
              <Dropdown
                menu={{
                  items,
                  onClick: ({ key }) => {
                    switch (key) {
                      case "edit":
                        actions.onEdit(record);
                        break;

                      case "delete":
                        actions.onDelete(record);
                        break;
                      default:
                        actions.onView(record);
                    }
                  },
                }}
                trigger={["click"]}
              >
                <EllipsisOutlined
                  style={{ cursor: "pointer", fontSize: "24px" }}
                  onClick={(e) => e.preventDefault()}
                />
              </Dropdown>
            )}
          </Space>
        ),
      },
    ],
    [columns, actions]
  );
  return (
    <Table
      dataSource={dataSource}
      rowKey={(record) => record?._id}
      columns={convertedColumns}
      scroll={{ x: true }}
      loading={isLoading}
      {...props}
    />
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
};
export default DataTable;
