"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Eye,
  Circle,
  ChevronDown,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

type Status = "Submitted" | "Not Submitted";

interface Participant {
  team: string;
  institution: string;
  members: number;
  status: Status;
  date: string;
}

const initialData: Participant[] = [
  {
    team: "Volkaholics",
    institution: "Telkom University",
    members: 3,
    status: "Submitted",
    date: "15/08/2025",
  },
  {
    team: "Next Devs",
    institution: "UI",
    members: 4,
    status: "Submitted",
    date: "16/08/2025",
  },
  {
    team: "Hackify",
    institution: "ITB",
    members: 5,
    status: "Not Submitted",
    date: "16/08/2025",
  },
];

const getStatusBadge = (status: Status) => {
  switch (status) {
    case "Submitted":
      return (
        <Badge className="bg-green-500 rounded-full text-white font-semibold py-2">
          <Circle className="!w-2 !h-2 mr-1 fill-current" />
          Submitted
        </Badge>
      );
    case "Not Submitted":
      return (
        <Badge className="bg-red-600 rounded-full text-white font-semibold py-2">
          <Circle className="!w-2 !h-2 mr-1 fill-current" />
          Not Submitted
        </Badge>
      );
  }
};

export default function AdminSubmissionTable() {
    const [search, setSearch] = useState("");
    const [participants] = useState(initialData);
    const [open, setOpen] = useState(false);

  // filter states
  const [filterSubmitted, setFilterSubmitted] = useState(false);
  const [filterNotSubmitted, setFilterNotSubmitted] = useState(false);

  const handleSelectAll = () => {
    setFilterSubmitted(true);
    setFilterNotSubmitted(true);
  };

  const handleApply = () => {
    // hanya trigger re-render, logikanya ada di filteredData
  };

  const filteredData = participants.filter((item) => {
    const matchesSearch = item.team
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      (filterSubmitted && item.status === "Submitted") ||
      (filterNotSubmitted && item.status === "Not Submitted") ||
      (!filterSubmitted && !filterNotSubmitted); // jika filter belum dipilih, tampilkan semua

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="rounded-[20px] p-[2px] bg-gradient-to-r from-[#0F75BD] to-[#64BB48] h-full">
      <div className="bg-gradient-to-t from-black to-[#575757] rounded-[18px] p-6 text-white h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">Registration Progress</h2>
          <p className="text-sm text-gray-300">
            Overview of Participant Registration Progress
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/10 border border-white text-white placeholder:text-gray-400"
            />
          </div>

          <div className="inline-flex w-52">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-white text-black w-full"
                >
                    <Filter className="h-4 w-4 text-[#5B5B5B]" />
                    Filter By
                    <ChevronDown
                    className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                    }`}
                    />
                </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="p-2 w-52">
                {/* Checkbox Submitted */}
                <div
                    className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
                    onClick={() => setFilterSubmitted(!filterSubmitted)}
                >
                    <Checkbox
                    checked={filterSubmitted}
                    onCheckedChange={(checked) =>
                        setFilterSubmitted(checked === true)
                    }
                    />
                    <span className="text-sm">Submitted</span>
                </div>

                {/* Checkbox Not Submitted */}
                <div
                    className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
                    onClick={() => setFilterNotSubmitted(!filterNotSubmitted)}
                >
                    <Checkbox
                    checked={filterNotSubmitted}
                    onCheckedChange={(checked) =>
                        setFilterNotSubmitted(checked === true)
                    }
                    />
                    <span className="text-sm">Not Submitted</span>
                </div>

                <DropdownMenuSeparator />

                {/* Action links */}
                <div className="flex items-center justify-between px-2 py-1">
                    <button
                    onClick={handleSelectAll}
                    className="text-blue-600 text-sm hover:underline"
                    >
                    Select all
                    </button>
                    <button
                    onClick={handleApply}
                    className="text-blue-600 text-sm hover:underline font-medium"
                    >
                    Apply
                    </button>
                </div>
                </DropdownMenuContent>
            </DropdownMenu>
         </div>


        </div>

        {/* Table */}
        <div className="rounded-md border-none overflow-hidden flex-1 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-white">Team Name</TableHead>
                <TableHead className="text-white">Institution</TableHead>
                <TableHead className="text-white">Members</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Registration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, idx) => (
                <TableRow
                  key={idx}
                  className={`border-white/10 ${
                    idx % 2 === 0 ? "bg-white/20" : ""
                  }`}
                >
                  <TableCell className="py-4 px-6">{row.team}</TableCell>
                  <TableCell className="py-4 px-6">{row.institution}</TableCell>
                  <TableCell>
                    <Dialog>
                        <DialogTrigger>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 bg-white/10 border-white/20 text-white"
                        >
                            <Eye className="h-4 w-4" /> Details ({row.members})
                        </Button>
                        </DialogTrigger>

                        <DialogContent className="!max-w-3xl lg:!max-w-5xl !w-full rounded-2xl backdrop-blur-lg bg-gradient-to-b from-white/50 to-black/50 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">
                            Team Members : {row.team}
                            </DialogTitle>
                        </DialogHeader>

                        {/* List anggota tim */}
                        <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
                            {[
                            {
                                name: "Yesi Sukmawati",
                                role: "Team Leader",
                            },
                            {
                                name: "Indah Pratiwi",
                                role: "Member",
                            },
                            {
                                name: "Salma Safira",
                                role: "Member",
                            },
                            ].map((member, idx) => (
                            <div
                                key={idx}
                                className="bg-white/20 backdrop-blur-lg rounded-lg p-4 shadow-md flex flex-col gap-3"
                            >
                                {/* Nama & Role */}
                                <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">{member.name}</h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    member.role === "Team Leader"
                                        ? "bg-black text-white"
                                        : "bg-gray-700 text-gray-200"
                                    }`}
                                >
                                    {member.role}
                                </span>
                                </div>

                                {/* Documents Status */}
                                <div className="flex items-center justify-between bg-white/10 rounded-md px-4 py-2">
                                <span className="text-sm font-medium">Documents</span>
                                <Badge
                                    className={`rounded-full px-3 py-1 ${
                                    idx === 0
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 text-white"
                                    }`}
                                >
                                    {idx === 0 ? "All Completed" : "Missing Files"}
                                </Badge>
                                </div>
                            </div>
                            ))}
                        </div>
                        </DialogContent>
                    </Dialog>
                    </TableCell>

                  <TableCell className="py-4 px-6">
                    {getStatusBadge(row.status)}
                  </TableCell>
                  <TableCell className="py-4 px-6">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
