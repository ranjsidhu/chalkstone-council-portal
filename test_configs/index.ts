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

export {
  ISSUE_CARD_CONFIG,
  ISSUE_BUTTON_CONFIG,
  ISSUE_DETAIL_CONFIG,
  MOCK_ISSUE,
  FILTERS_CONFIG,
  MOCK_STATUSES,
  MOCK_STAFF,
};
