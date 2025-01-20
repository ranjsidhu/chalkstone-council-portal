"use client";

import { useState, useEffect } from "react";
import { fetchIssues } from "./serveractions";
import IssueList from "./IssueList";
import Loading from "@/app/loading";
import Filters from "@/app/components/admin/Filters";
import { IssueResponseType, IssueStatusType, Staff } from "@/app/types";

type IssueListContentProps = {
  statuses: IssueStatusType[];
  staff: Staff[];
};

export default function IssueListContent({
  statuses,
  staff,
}: IssueListContentProps) {
  const [issues, setIssues] = useState<IssueResponseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchFilteredIssues = async (
    pageNum: number,
    status: string,
    type: string,
    staff: string
  ) => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();

      if (status) queryParams.append("status", status);
      if (type) queryParams.append("type", type);
      if (staff) queryParams.append("staff", staff);
      queryParams.append("page", pageNum.toString());

      let response;

      if (queryParams.size === 1) {
        const issuesResponse = await fetchIssues(pageNum);
        setIssues(issuesResponse!.issues);
        setTotalCount(issuesResponse!.count);
      } else {
        response = await fetch(`/api/issues/filters?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error(`Request failed: ${response.statusText}`);
        }
        const { response: filtersResponse, totalCount } = await response.json();
        setIssues(filtersResponse);
        setTotalCount(totalCount);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = async (
    status: string,
    type: string,
    staff: string
  ) => {
    setSelectedStatus(status);
    setSelectedType(type);
    setSelectedStaff(staff);
    setPage(1); // Reset to first page when filters change
    await fetchFilteredIssues(1, status, type, staff);
  };

  // Handle page changes
  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    await fetchFilteredIssues(
      newPage,
      selectedStatus,
      selectedType,
      selectedStaff
    );
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await fetchFilteredIssues(
          page,
          selectedStatus,
          selectedType,
          selectedStaff
        );
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, selectedStatus, selectedType, selectedStaff]);

  if (loading && !issues.length) {
    return <Loading />;
  }

  return (
    <>
      <Filters
        statuses={statuses}
        staff={staff}
        selectedStaff={selectedStaff}
        selectedStatus={selectedStatus}
        selectedType={selectedType}
        onFilterChange={handleFilterChange}
        isLoading={loading}
      />
      <IssueList
        issues={issues}
        setPage={handlePageChange}
        page={page}
        totalCount={totalCount}
      />
    </>
  );
}
