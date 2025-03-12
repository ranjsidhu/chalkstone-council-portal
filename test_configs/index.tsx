import { IssueResponseType, IssueStatusType, Staff } from "@/app/types";

const ISSUE_CARD_CONFIG = {
  container: "issue-card-container",
  button: "issue-card-view-details-btn",
};

const ISSUE_BUTTON_CONFIG = {
  container: "issue-button-container",
};

const ISSUE_DETAIL_CONFIG = {
  container: "issue-detail-container",
  address: "issue-detail-address",
  created: "issue-detail-created",
  updated: "issue-detail-updated",
  image: "issue-detail-image",
  description: "issue-detail-description",
  buttons: "issue-detail-buttons",
  goBack: "issue-detail-go-back",
};

const MOCK_ISSUE: IssueResponseType = {
  id: 1,
  lat: 0,
  long: 0,
  issue_type_id: 1,
  description: "A pothole",
  address: "123 Fake St",
  image_filename: null,
  status_id: 1,
  issue_types: { name: "Pothole" },
  issue_statuses: { name: "Open" },
  staff_issues: [],
  created_at: "2021-10-25T00:00:00.000Z",
  updated_at: "2021-10-25T00:00:00.000Z",
};

const FILTERS_CONFIG = {
  container: "filters-container",
  statusFilter: "status-filter",
  typeFilter: "type-filter",
  staffFilter: "staff-filter",
};

const MOCK_STATUSES: IssueStatusType[] = [
  {
    id: 1,
    name: "Open",
  },
  {
    id: 2,
    name: "In Progress",
  },
  {
    id: 3,
    name: "Resolved",
  },
  {
    id: 4,
    name: "Closed",
  },
  {
    id: 5,
    name: "Unassigned",
  },
];

const MOCK_STAFF: Staff[] = [
  {
    id: 1,
    name: "John Doe",
    created_at: "2021-10-25T00:00:00.000Z",
    updated_at: "2021-10-25T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Jane Doe",
    created_at: "2021-10-25T00:00:00.000Z",
    updated_at: "2021-10-25T00:00:00.000Z",
  },
  {
    id: 3,
    name: "John Doe 2",
    created_at: "2021-10-25T00:00:00.000Z",
    updated_at: "2021-10-25T00:00:00.000Z",
  },
];

const CHART_CONFIG = {
  container: "chart-container",
  chart: "chart",
};

const ANALYTICS_CARD_CONFIG = {
  container: "analytics-card-container",
  title: "analytics-card-title",
  data: "analytics-card-data",
};

const HEADER_CONFIG = {
  container: "header-container",
  logo: "header-logo",
  adminButton: "header-admin-button",
  signOutButton: "header-sign-out-button",
  logInButton: "header-log-in-button",
};

const LOGIN_MODAL_CONFIG = {
  container: "login-modal-container",
  closeButton: "login-modal-close-button",
  form: "login-modal-form",
  username: "login-modal-username",
  password: "login-modal-password",
  submitButton: "login-modal-submit-button",
  error: "login-modal-error",
};

const IMAGE_UPLOAD_CONFIG = {
  container: "image-upload-container",
  removeButton: "image-upload-remove-button",
  fileInput: "image-upload-file-input",
  uploadPhotoText: "image-upload-upload-photo-text",
  previewName: "image-upload-preview-name",
  previewImage: "image-upload-preview-image",
};

const ISSUE_SELECT_CONFIG = {
  container: "issue-select-container",
  select: "issue-select-select",
  label: "issue-select-label",
  option: "issue-select-option",
};

export {
  ISSUE_CARD_CONFIG,
  ISSUE_BUTTON_CONFIG,
  ISSUE_DETAIL_CONFIG,
  MOCK_ISSUE,
  FILTERS_CONFIG,
  MOCK_STATUSES,
  MOCK_STAFF,
  CHART_CONFIG,
  ANALYTICS_CARD_CONFIG,
  HEADER_CONFIG,
  LOGIN_MODAL_CONFIG,
  IMAGE_UPLOAD_CONFIG,
  ISSUE_SELECT_CONFIG,
};
