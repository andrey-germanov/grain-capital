import { Button, Modal } from "antd";
import React, { useState } from "react";
import { removeUserAction } from "../../store/usersReducer";
import { useDispatch } from "react-redux";

type Props = {
  id: string;
  name: string;
};
export const RemoveUser = ({ id, name }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (e: React.MouseEvent<any, MouseEvent>) => {
    setIsModalOpen(true);
  };
  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(removeUserAction(id));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type="default"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          showModal(e);
        }}
      >
        Remove
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Remove <b>{name}</b> ?
      </Modal>
    </>
  );
};
