import { Table } from "antd";
import { useMemo } from "react";
import { Space, Dropdown } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const DataTable = ({ columns, dataSource, actions, isLoading }) => {
  const items = [
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

  const convertedItems = useMemo(() => {
    if (actions?.onEdit && actions?.onDelete) {
      return items;
    } else {
      return [items[0]];
    }
  }, [actions]);

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
                  items: convertedItems,
                  onClick: ({ key }) => {
                    switch (key) {
                      case "edit":
                        actions.onEdit(record);
                        break;
                      case "delete":
                        actions?.onDelete(record);
                        break;
                      default:
                        break;
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
    [columns, convertedItems]
  );
  return (
    <Table
      dataSource={dataSource}
      columns={convertedColumns}
      scroll={{ x: true }}
      loading={isLoading}
    />
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
};
export default DataTable;
