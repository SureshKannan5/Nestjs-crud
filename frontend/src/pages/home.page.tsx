import DataTable from "../app/components/DataTable";
import { Content } from "antd/es/layout/layout";
import { Button, Typography } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import React from "react";
import { useListAllTasksQuery } from "../redux/services/baseApiSetup";

const { Title } = Typography;

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const [action, setAction] = useState("create");

  const [loadPage, setLoadPage] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const showDrawer = () => {
    setAction("create");
    setIsOpen(true);
  };
  const onCloseDrawer = () => {
    setIsOpen(false);
  };

  const { data } = useListAllTasksQuery({});

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
    },
  ];

  const onEditRow = (record) => {
    setAction("update");
    setSelectedRow(() => record);
    setIsOpen(true);
  };

  const onDeletedRow = (record) => {
    setSelectedRow(() => record);
    setModalOpen(true);
  };

  const hideModal = () => setModalOpen(() => false);

  // const handleDelete = async () => {
  //   try {
  //     await deleteOrganization(selectedRow._id).unwrap();

  //     pageNotifications.success("Organization deleted sucessfully");
  //     setModalOpen(() => false);
  //     setSelectedRow(() => null);
  //     setLoadPage((state) => !state);
  //   } catch (error) {
  //     console.log(error);
  //     pageNotifications.error("Delete action failed");
  //   }
  // };

  return (
    <>
      {/* <DeleteModal
        open={modalOpen}
        content={"Are you sure you want delete organization"}
        handleDelete={handleDelete}
        hideModal={hideModal}
      /> */}
      {/* {isOpen && (
        <CustomOffCanVas
          title={
            action === "create"
              ? "Create a new Organization"
              : "Update Organization"
          }
          isOpen={isOpen}
          action={action}
          onClose={onCloseDrawer}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          setLoadPage={setLoadPage}
        />
      )} */}
      <div className="home_page_container">
        <Content
          className="whiteBox shadow layoutPadding"
          style={{
            margin: "30px auto",
            width: "100%",
            maxWidth: "100%",
            flex: "none",
          }}
        >
          <Title level={3}>Task Management</Title>
          <div className="filter-container">
            <div></div>
            <Button type="primary" icon={<ShopOutlined />} onClick={showDrawer}>
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
