"use client";

import { useState, useEffect } from "react";
import { Modal, Select } from "antd";
import toast from "react-hot-toast";
import { fetchStaff, assignStaffToIssue } from "./serveractions";

export default function StaffModal({
  visible,
  issueId,
  setIsModalOpen,
}: {
  visible: boolean;
  issueId: number;
  setIsModalOpen: (open: boolean) => void;
}) {
  const { Option } = Select;
  const [staff, setStaff] = useState([]);
  const [staffId, setStaffId] = useState(0);

  useEffect(() => {
    const fetchStaffList = async () => {
      await fetchStaff().then((data) => setStaff(data));
    };
    fetchStaffList();
  }, []);

  const cancelAction = () => setIsModalOpen(false);

  const confirmAction = async () => {
    try {
      await assignStaffToIssue(staffId, issueId);
      setIsModalOpen(false);
      toast.success("Staff assigned to issue successfully");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      title="Staff"
      open={visible}
      onCancel={cancelAction}
      onOk={confirmAction}
      destroyOnClose
    >
      <Select
        placeholder="Select staff"
        className="w-full"
        onChange={(e) => setStaffId(e)}
      >
        {staff.map((staff: any) => (
          <Option key={staff.id} value={staff.id}>
            {staff.name}
          </Option>
        ))}
      </Select>
    </Modal>
  );
}
