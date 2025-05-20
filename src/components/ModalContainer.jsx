/* eslint-disable react/prop-types */
import {
  ModalFooter,
  Button,
  ModalBody,
  ModalHeader,
  Modal,
} from "flowbite-react";

export const ModalContainer = ({
  openModal,
  setOpenModal,
  header,
  body,
  handleAccept,
}) => {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {body}
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            handleAccept();
            setOpenModal(false);
          }}
        >
          Продолжить
        </Button>
        <Button
          color="gray"
          onClick={() => {
            setOpenModal(false);
          }}
        >
          Отмена
        </Button>
      </ModalFooter>
    </Modal>
  );
};
