"use client";

import { useState, useEffect } from "react";
import { fetchIssues } from "./serveractions";
import IssueList from "./IssueList";
import Loading from "@/app/loading";
import Filters from "@/app/components/admin/Filters";
import { IssueResponseType, IssueStatusType } from "@/app/types";

type IssueListContentProps = {
  statuses: IssueStatusType[];
};

export default function IssueListContent({ statuses }: IssueListContentProps) {
  const [issues, setIssues] = useState<IssueResponseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchFilteredIssues = async (
    pageNum: number,
    status: string,
    type: string
  ) => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();

      if (status) queryParams.append("status", status);
      if (type) queryParams.append("type", type);
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
  const handleFilterChange = async (status: string, type: string) => {
    setSelectedStatus(status);
    setSelectedType(type);
    setPage(1); // Reset to first page when filters change
    await fetchFilteredIssues(1, status, type);
  };

  // Handle page changes
  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    await fetchFilteredIssues(newPage, selectedStatus, selectedType);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await fetchFilteredIssues(page, selectedStatus, selectedType);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page, selectedStatus, selectedType]);

  if (loading && !issues.length) {
    return <Loading />;
  }

  // const handleFilterChange = async (status: string, type: string) => {
  //   setLoading(true);
  //   try {
  //     setIssues([]);
  //     const queryParams = new URLSearchParams();

  //     if (status) queryParams.append("status", status);
  //     if (type) queryParams.append("type", type);
  //     queryParams.append("page", page.toString());

  //     const response = await fetch(
  //       `/api/issues/filters?${queryParams.toString()}`
  //     );
  //     const filteredIssues = await response.json();

  //     setIssues(filteredIssues.response);
  //     setTotalCount(filteredIssues.totalCount);
  //     setSelectedStatus(status);
  //     setSelectedType(type);
  //   } catch (error) {
  //     console.error("Error applying filters:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Filters
        statuses={statuses}
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
