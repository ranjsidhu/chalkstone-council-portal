"use client";

import { useState, useEffect } from "react";
import { MAP_CENTER } from "../../constants";
import { getAddress, handleSubmit } from "@/app/utils";
import {
  Description,
  ImageUpload,
  IssueSelect,
  MapSelect,
  SubmitButton,
} from "@/app/components";
import { type IssueSelectOptionType } from "@/app/types";

export default function ReportIssue() {
  const [position, setPosition] = useState(MAP_CENTER);
  const [issueType, setIssueType] = useState<IssueSelectOptionType>({
    id: null,
    name: "",
  });
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set initial address on load
    getAddress(MAP_CENTER[0], MAP_CENTER[1]).then((data) => setAddress(data));
  }, []);

  const resetForm = () => {
    setPosition(MAP_CENTER);
    setIssueType({ id: null, name: "" });
    setDescription("");
    setImage(null);
    setAddress("");
  };

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <span className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Report an Issue</h1>
          <p className="text-gray-600 mb-4">
            Help us improve our community by reporting issues in your area
          </p>
        </span>
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              {
                position,
                issue: issueType,
                description,
                image,
                address,
              },
              resetForm
            )
          }
          className="space-y-6"
        >
          <MapSelect
            position={position}
            address={address}
            loading={loading}
            setPosition={setPosition}
            setLoading={setLoading}
            setAddress={setAddress}
          />

          <IssueSelect issueType={issueType} setIssueType={setIssueType} />

          <Description
            description={description}
            setDescription={setDescription}
          />

          <ImageUpload image={image} setImage={setImage} />

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
