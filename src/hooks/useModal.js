import { useState, useCallback } from 'react';

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [modalContent, setModalContent] = useState(null);

  const openModal = useCallback((content = null) => {
    setModalContent(content);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
    document.body.style.overflow = 'unset';
  }, []);

  return {
    isOpen,
    modalContent,
    openModal,
    closeModal,
  };
};

export default useModal;
