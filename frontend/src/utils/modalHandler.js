import * as bootstrap from "bootstrap";

export const modalInit = (modalID, closeIDs, openIDs = [], open = true) => {
  const modal = new bootstrap.Modal(document.getElementById(modalID));

  function closeModal() {
    window.removeEventListener("popstate", closeModal);
    modal.hide();
  }

  function openModal() {
    window.addEventListener("popstate", closeModal);
    modal.show();
  }

  closeIDs.forEach((closeID) => {
    const closeButton = document.getElementById(closeID);
    closeButton.addEventListener("click", closeModal);
  });

  openIDs.forEach((openID) => {
    const openButton = document.getElementById(openID);
    openButton.addEventListener("click", openModal);
  });

  if (open) openModal();

  return [openModal, closeModal];
};
