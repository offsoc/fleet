import React from "react";

import strUtils from "utilities/strings";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "delete-host-modal";

interface IDeleteHostModalProps {
  onSubmit: () => void;
  onCancel: () => void;
  /** Manage host page only */
  isAllMatchingHostsSelected?: boolean;
  /** Manage host page only */
  selectedHostIds?: number[];
  /** Manage host page only */
  hostsCount?: number;
  /** Host details page only */
  hostName?: string;
  isUpdating: boolean;
}

const DeleteHostModal = ({
  onSubmit,
  onCancel,
  isAllMatchingHostsSelected,
  selectedHostIds,
  hostsCount,
  hostName,
  isUpdating,
}: IDeleteHostModalProps): JSX.Element => {
  const pluralizeHost = () => {
    if (!selectedHostIds) {
      return "host";
    }
    return strUtils.pluralize(selectedHostIds.length, "host");
  };

  const hostText = () => {
    if (selectedHostIds) {
      return `${selectedHostIds.length}${
        isAllMatchingHostsSelected ? "+" : ""
      } ${pluralizeHost()}`;
    }
    return hostName;
  };
  const largeVolumeText = (): string => {
    if (
      selectedHostIds &&
      isAllMatchingHostsSelected &&
      hostsCount &&
      hostsCount >= 500
    ) {
      return " When deleting a large volume of hosts, it may take some time for this change to be reflected in the UI.";
    }
    return "";
  };

  return (
    <Modal title="Delete host" onExit={onCancel} className={baseClass}>
      <>
        <p>
          This will remove the record of <b>{hostText()}</b>.{largeVolumeText()}
        </p>
        <div className="modal-cta-wrap">
          <Button
            type="button"
            onClick={onSubmit}
            variant="alert"
            className="delete-loading"
            isLoading={isUpdating}
          >
            Delete
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            Cancel
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteHostModal;
