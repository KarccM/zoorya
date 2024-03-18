import { useState } from "react";

interface ModalState {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

export default (): ModalState => {
  const [modal, setModal] = useState<boolean>(false);

  return {
    modal,
    setModal,
    openModal: () => setModal(true),
    closeModal: () => setModal(false),
    toggleModal: () => setModal(prev => !prev),
  }
};