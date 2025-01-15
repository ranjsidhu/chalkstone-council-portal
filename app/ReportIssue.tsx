"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Camera, MapPin, Send } from "lucide-react";
import { ISSUE_OPTIONS } from "./constants";
import getAddress from "./utils/getAddress";
import handleSubmit from "./utils/handleSubmit";

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import("./components/Map"), { ssr: false });

type IssueType = {
  id: number | null;
  name: string;
};

export default function ReportIssue() {
  const [position, setPosition] = useState<[number, number]>([50.73, -3.53]);
  const [issueType, setIssueType] = useState<IssueType>({ id: null, name: "" });
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setPosition([50.73, -3.53]);
    setIssueType({ id: null, name: "" });
    setDescription("");
    setImage(null);
    setAddress("");
  };

  const handleLocationSelect = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    setLoading(true);
    try {
      await getAddress(lat, lng, setAddress);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <span className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Report an Issue</h1>
          <p className="text-gray-600">
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
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block mb-2 font-medium">Select Location</label>
            <div className="h-[300px] rounded-lg overflow-hidden">
              <Map
                position={position}
                onLocationSelect={handleLocationSelect}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Click on the map to set the issue location
            </p>
            {loading && (
              <div className="p-2 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">Fetching address...</p>
              </div>
            )}
            {!loading && address && (
              <div className="p-2 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">
                  Selected location: {address}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <label className="block mb-2 font-medium">Issue Type</label>
            <select
              value={issueType.name}
              onChange={(e) => {
                const select = e.target;
                const id = Number(select.children[select.selectedIndex].id);
                setIssueType({ id, name: e.target.value });
              }}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an issue type</option>
              {ISSUE_OPTIONS.map((issue) => (
                <option
                  key={issue.id}
                  id={issue.id.toString()}
                  value={issue.name}
                >
                  {issue.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md h-32"
              placeholder="Please provide details about the issue..."
              required
            />
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <label className="block mb-2 font-medium">Add Photo</label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200">
                <Camera className="w-5 h-5" />
                <span>Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
              {image && (
                <span className="text-sm text-gray-600">{image.name}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Submit Report
          </button>
        </form>
      </div>
    </main>
  );
}
