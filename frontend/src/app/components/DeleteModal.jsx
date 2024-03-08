import { Modal } from "antd";
import PropTypes from "prop-types";
const DeleteModal = ({ open, hideModal, handleDelete }) => {
  return (
    <>
      <Modal
        open={open}
        title="Delete"
        onOk={handleDelete}
        onCancel={hideModal}
        okText="Delete"
        cancelText="Cancel"
      >
        Are you sure you want to delete this task?
      </Modal>
    </>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default DeleteModal;
