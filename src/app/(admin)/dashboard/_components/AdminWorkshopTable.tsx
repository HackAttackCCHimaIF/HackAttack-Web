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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge, badgeVariants } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Eye,
  Circle,
  XCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type Status = "Pending" | "Approve" | "Rejected";

interface Member {
  name: string;
  email: string;
  role: "Team Leader" | "Member";
  institution: string;
  team: string;
  status: "Pending" | "Approve" | "Rejected";
  date: string;
  reason?: string;
}

const initialData: Member[] = [
  {
    name: "Yesi Sukmawati",
    email: "yesi.sukmawati23@gmail.com",
    role: "Team Leader",
    team: "Volkaholics",
    institution: "Telkom University",
    status: "Pending",
    date: "15/08/2025",
  },
  {
    name: "Indah Pratiwi",
    email: "indah.pratiwi05@gmail.com",
    role: "Member",
    team: "Volkaholics",
    institution: "Telkom University",
    status: "Pending",
    date: "15/08/2025",
  },
  {
    name: "Salma Safira",
    email: "salma.safira02@gmail.com",
    role: "Member",
    team: "Volkaholics",
    institution: "Telkom University",
    status: "Pending",
    date: "15/08/2025",
  },
  {
    name: "Daffa Hakim",
    email: "daffa.hakim@gmail.com",
    role: "Team Leader",
    team: "Next Devs",
    institution: "UI",
    status: "Approve",
    date: "16/08/2025",
  },
];


const getStatusBadge = (status: Status) => {
  switch (status) {
    case "Pending":
      return (
        <Badge className="bg-orange-50 rounded-full text-orange-400 font-semibold py-2">
          <Circle className="!w-3 !h-3 fill-current text-orange-400 mr-1" />
          Pending
        </Badge>
      );
    case "Approve":
      return (
        <Badge className="bg-green-500 rounded-full text-lime-200 font-semibold py-2">
          <Circle className="!w-3 !h-3 fill-current text-lime-200 mr-1" />
          Approved
        </Badge>
      );
    case "Rejected":
      return (
        <Badge className="bg-red-600 rounded-full text-red-200 font-semibold py-2">
          <Circle className="!w-3 !h-3 fill-current text-red-200 mr-1" />
          Rejected
        </Badge>
      );
  }
};

export default function AdminWorkshopTable() {
  const [search, setSearch] = useState("");
  const [participants, setParticipants] = useState(initialData);

  const [selected, setSelected] = useState<{
    index: number;
    action: "Approve" | "Reject" | null;
  }>({ index: -1, action: null });

  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleApprove = () => {
    if (selected.index !== -1) {
      const updated = [...participants];
      updated[selected.index].status = "Approve";
      setParticipants(updated);
      setSelected({ index: -1, action: null });
      setShowSuccess(true);
    }
  };

  const handleReject = () => {
    setShowReason(true); // buka modal alasan setelah YES
  };

  const handleSubmitReason = () => {
    if (selected.index !== -1) {
      const updated = [...participants];
      updated[selected.index].status = "Rejected";
      updated[selected.index].reason = reason;
      setParticipants(updated);
      setShowReason(false);
      setReason("");
      setSelected({ index: -1, action: null });
      setShowSuccess(true);
    }
  };

  const filteredData = participants.filter((item) =>
    item.team.toLowerCase().includes(search.toLowerCase())
  );

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white text-black"
              >
                <Filter className="h-4 w-4 text-[#5B5B5B]" /> Filter By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Date</DropdownMenuItem>
              <DropdownMenuItem>Institution</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                <TableHead className="text-white">Actions</TableHead>
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
                  <TableCell className="py-4 px-6">
                    <Dialog>
                        <DialogTrigger>
                            <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 bg-white/10 border-white/20 text-white"
                            >
                                <Eye className="h-4 w-4" /> Details ({row.name})
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="!max-w-3xl lg:!max-w-7xl !w-full rounded-2xl backdrop-blur-lg bg-gradient-to-b from-white/50 to-black/50 text-white">
                            <DialogHeader>
                            <DialogTitle className="text-xl font-bold">
                                Team Members : {row.team}
                            </DialogTitle>
                            </DialogHeader>

                            {/* List anggota tim */}
                            <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
                                <div
                                className="bg-white/20 backdrop-blur-lg rounded-lg p-4 shadow-md flex flex-col"
                                >
                                {/* Nama & Role */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col items-start gap-2 w-full">
                                        <div className="flex items-start justify-between w-full">
                                            <div>
                                                <h3 className="font-semibold text-lg">{row.name}</h3>
                                                <p className="text-sm text-white">{row.email}</p>
                                            </div>
                                            <div className="flex items-start gap-6 mt-3">
                                                <div className="flex gap-1">
                                                    <button className={badgeVariants({className: "cursor-pointer px-6 bg-[#4e4e4e]"})}>
                                                        <CheckCircle className="size-4"/> Yes!
                                                    </button>
                                                    <button className={badgeVariants({className: "cursor-pointer px-6 bg-red-600"})}>
                                                        <XCircle className="size-4"/> No!
                                                    </button>
                                                </div>
                                                <Badge className="bg-[#FAB94F] text-white ml-auto">
                                                    <Clock/>
                                                    {row.status}
                                                </Badge>
                                            </div>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                row.role === "Team Leader"
                                                ? "bg-black text-white"
                                                : "bg-gray-700 text-gray-200"
                                            }`}
                                            >
                                            {row.role}
                                        </span>
                                    </div>
                                </div>

                                {/* Documents Section */}
                                <div className="mt-4">
                                    <h4 className="font-semibold">Documents</h4>
                                    <div className="flex items-center gap-3 mt-2 flex-col p-2 bg-white/30 rounded-md min-h-[140px]">
                                        <div className="w-full flex justify-between">
                                            <h5 className="text-xs">Link Files</h5>
                                            <Badge className="bg-[#FFF2DD] text-[#D98634] rounded-full">
                                                <Circle className="fill-current text-[#D98634] !size-2"/> Verification Required
                                            </Badge>
                                        </div>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            size={"sm"}
                                            variant="outline"
                                            className="bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:text-white"
                                        >
                                            <Eye/> Open Document
                                        </Button>
                                        <Button
                                            size={"sm"}
                                            variant="outline"
                                            className="bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:text-white"
                                        >
                                            <CheckCircle/> Verify?
                                        </Button>
                                    </div>
                                    
                                    </div>
                                </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    {getStatusBadge(row.status)}
                  </TableCell>
                  <TableCell className="py-4 px-6">{row.date}</TableCell>
                  <TableCell className="flex gap-2 py-4 px-6 flex-col">
                    {row.status === "Pending" ? (
                      <>
                        {/* Approve */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() =>
                                setSelected({ index: idx, action: "Approve" })
                              }
                              className="bg-[#8B8B8B] text-white border w-[120px] border-white/20 flex items-center justify-start gap-2 rounded-full"
                            >
                              <CheckCircle />
                              Approve
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="backdrop-blur-lg bg-black/80 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-lg font-bold">
                                Are you sure you want to approve this team?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-300">
                                This action will approve{" "}
                                <span className="font-semibold">
                                  {row.team}
                                </span>
                                .
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex gap-3 justify-center mt-6">
                              <AlertDialogCancel className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700">
                                NO
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleApprove}
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                              >
                                YES
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* Reject */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              onClick={() =>
                                setSelected({ index: idx, action: "Reject" })
                              }
                              className="bg-red-600 text-white w-[120px] flex items-center justify-start rounded-full gap-2"
                            >
                              <XCircle />
                              Reject
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="backdrop-blur-lg bg-black/80 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-lg font-bold">
                                Are you sure you want to reject this team?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-300">
                                This action will reject{" "}
                                <span className="font-semibold">
                                  {row.team}
                                </span>
                                .
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex gap-3 mt-6 items-center justify-center w-full">
                              <AlertDialogCancel className="bg-red-600 border-none text-white px-6 py-2 rounded-md hover:bg-red-700 max-w-[120px] w-full">
                                NO
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleReject}
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 max-w-[120px] w-full"
                              >
                                YES
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    ) : (
                      getStatusBadge(row.status)
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Modal alasan reject */}
        <Dialog open={showReason} onOpenChange={setShowReason}>
          <DialogContent className="backdrop-blur-lg bg-black/80 text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Provide Rejection Reason
              </DialogTitle>
              {selected.index !== -1 && (
                <p className="text-gray-300">
                  Rejecting team:{" "}
                  <span className="font-semibold">
                    {participants[selected.index].team}
                  </span>
                </p>
              )}
            </DialogHeader>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Write the reason for rejection..."
              className="mt-3 bg-white/10 text-white border border-white/20"
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button
                onClick={() => setShowReason(false)}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReason}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal success */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="backdrop-blur-lg bg-black/80 text-white text-center">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                ✅ Success!
              </DialogTitle>
              <p className="text-gray-300 mt-2">
                Notification has been sent to the team&apos;s email.
              </p>
            </DialogHeader>
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => setShowSuccess(false)}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                OK
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
