import { Filter } from "lucide-react";
import { IssueStatusType, Staff } from "@/app/types";
import { ISSUE_OPTIONS } from "@/app/constants";
import { FILTERS_CONFIG } from "@/test_configs";

type FilterProps = {
  statuses: IssueStatusType[];
  staff: Staff[];
  selectedStatus: string;
  selectedType: string;
  selectedStaff: string;
  // eslint-disable-next-line no-unused-vars
  onFilterChange: (status: string, type: string, staff: string) => void;
  isLoading?: boolean;
};

const { container, statusFilter, typeFilter, staffFilter } = FILTERS_CONFIG;

export default function Filters({
  statuses,
  selectedStatus,
  selectedType,
  selectedStaff,
  isLoading,
  staff,
  onFilterChange,
}: FilterProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value, selectedType, selectedStaff);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(selectedStatus, e.target.value, selectedStaff);
  };

  const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(selectedStatus, selectedType, e.target.value);
  };

  return (
    <div
      data-testid={container}
      className="bg-white rounded-lg shadow p-6 mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <h3 className="font-medium text-gray-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="status-filter"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            data-testid={statusFilter}
            id="status-filter"
            value={selectedStatus}
            onChange={handleStatusChange}
            disabled={isLoading}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="type-filter"
            className="block text-sm font-medium text-gray-700"
          >
            Issue Type
          </label>
          <select
            data-testid={typeFilter}
            id="type-filter"
            value={selectedType}
            onChange={handleTypeChange}
            disabled={isLoading}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">All Types</option>
            {ISSUE_OPTIONS.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="staff-filter"
            className="block text-sm font-medium text-gray-700"
          >
            Staff Member
          </label>
          <select
            data-testid={staffFilter}
            id="type-filter"
            value={selectedStaff}
            onChange={handleStaffChange}
            disabled={isLoading}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">All Staff</option>
            {staff.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
