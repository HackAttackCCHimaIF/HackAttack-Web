/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utility/utils";
import Image from "next/image";

const getDateGradient = (index: number) => {
  const colors = [
    "bg-gradient-to-r from-sky-400 to-white/80",
    "bg-gradient-to-r from-green-400 to-white/80",
    "bg-gradient-to-r from-red-400 to-white/80",
  ];
  return colors[index % colors.length];
};

const getDateConnector = (index: number) => {
  const configs = [
    {
      gradient: "bg-gradient-to-t from-sky-400 to-white/80",
      shadow: "shadow-[0_0_20px_rgba(56,189,248,0.6)]",
    },
    {
      gradient: "bg-gradient-to-t from-green-400 to-white/80",
      shadow: "shadow-[0_0_20px_rgba(74,222,128,0.6)]",
    },
    {
      gradient: "bg-gradient-to-t from-red-400 to-white/80",
      shadow: "shadow-[0_0_20px_rgba(248,113,113,0.6)]",
    },
  ];

  const { gradient, shadow } = configs[index % configs.length];
  return `${gradient} ${shadow}`;
};

const Timeline = () => {
  const timelineData = [
    {
      id: 1,
      title: "Open Register Batch 1",
      description:
        "Start your journey here! The first wave of registration is open for early applicants who are ready to take on the challenge.",
      date: "27 Oktober - 1 November",
      category: "Setup",
      icon: <Calendar className="w-5 h-5" />,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Registration Batch 2",
      description:
        "Missed the first batch? Don’t worry — secure your spot in the second registration window before it closes!",
      date: "3 November - 8 November",
      category: "Process",
      icon: <Users className="w-5 h-5" />,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Technical Meeting",
      description:
        "Join us for a mandatory technical meeting where we’ll walk you through the competition rules, submission guidelines, and judging criteria. Ask questions, meet other participants, and get fully prepared.",
      date: "8 November",
      category: "Analytics",
      icon: <TrendingUp className="w-5 h-5" />,
      status: "upcoming",
    },
    {
      id: 4,
      title: "Proposal Submission Deadline",
      description:
        "Submit your team’s project proposal and showcase your initial ideas. Make it count — this is your first step to reaching the final!",
      date: "11 November",
      category: "Growth",
      icon: <MapPin className="w-5 h-5" />,
      status: "upcoming",
    },
    {
      id: 5,
      title: "Finalist Announcement",
      description:
        "We’ll reveal the selected teams who made it to the finals! Check your inbox and prepare for the next stage.",
      date: "21 November",
      category: "Growth",
      icon: <MapPin className="w-5 h-5" />,
      status: "upcoming",
    },
    {
      id: 6,
      title: "Technical Meeting for Finalists",
      description:
        "Finalist teams will join an exclusive session to discuss final-stage details, judging formats, and presentation flow.",
      date: "29 November",
      category: "Growth",
      icon: <MapPin className="w-5 h-5" />,
      status: "upcoming",
    },
    {
      id: 7,
      title: "Final Hackathon Day",
      description:
        "It’s time to bring your ideas to life! Develop, test, and polish your final project during this intensive day of innovation.",
      date: "6 December",
      category: "Growth",
      icon: <MapPin className="w-5 h-5" />,
      status: "upcoming",
    },
    {
      id: 8,
      title: "Final Presentation Day",
      description:
        "Present your solution to the panel of judges. Highlight your creativity, teamwork, and impact in front of experts and fellow participants.",
      date: "7 December",
      category: "Growth",
      icon: <MapPin className="w-5 h-5" />,
      status: "upcoming",
    },
    {
      id: 9,
      title: "Winner Announcement",
      description:
        "The moment you've been waiting for — celebrate your hard work and see which teams will take home the grand prize!",
      date: "7 December",
      category: "Growth",
      icon: <MapPin className="w-5 h-5" />,
      status: "upcoming",
    },
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "upcoming":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className=" mx-auto p-6 w-full relative">
      <div className="absolute inset-0 flex flex-col items-center justify-start space-y-8 z-0">
        <div className="relative max-w-[614px] max-h-[614px]">
          <Image
            src="/landing-page/circlegatau.png"
            alt="circle"
            width={614}
            height={614}
          />
        </div>
        <div className="relative max-w-[614px] max-h-[614px]">
          <Image
            src="/landing-page/circlegatau.png"
            alt="circle"
            width={614}
            height={614}
          />
        </div>
        <div className="relative  max-w-[614px] max-h-[614px]">
          <Image
            src="/landing-page/circlegatau.png"
            alt="circle"
            width={614}
            height={614}
          />
        </div>
        <div className="relative md:hidden max-w-[614px] max-h-[614px]">
          <Image
            src="/landing-page/circlegatau.png"
            alt="circle"
            width={614}
            height={614}
          />
        </div>
      </div>
      <div className="text-center mb-12 relative z-10">
        <div className="absolute inset-0 flex justify-center">
          <div className="w-1/5 bg-red-500 rounded-full blur-3xl opacity-50"></div>
        </div>

        <h1 className="text-4xl font-semibold text-white mb-2 relative z-10">
          Timeline Event
        </h1>
        <p className="text-lg text-white relative z-10">Hackattack 2025</p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="absolute md:left-1/2 left-4 transform md:-translate-x-1/2 w-1  h-full rounded-full bg-gradient-to-b from-gray-200  to-transparent"></div>

        <div className="hidden md:block">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className="relative mb-12 flex w-full items-center justify-evenly"
              >
                {isEven ? (
                  <>
                    <div className="w-5/12 pr-8 flex justify-end h-fit">
                      <Card
                        className={cn(
                          "shadow-border px-2 flex items-center justify-center py-2 border-none text-white rounded-full",
                          getDateGradient(index)
                        )}
                      >
                        <CardContent className="text-center font-semibold">
                          {item.date}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                      <div className="p-2 border rounded-full">
                        <div
                          className={`w-4 h-4 rounded-full ${getDateConnector(
                            index
                          )} p-2.5 shadow-lg z-10`}
                        ></div>
                      </div>
                    </div>

                    <div className="w-5/12 pl-8">
                      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-none bg-white/5 text-white">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl font-semibold text-white">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-white/90 mb-4 leading-relaxed">
                            {item.description}
                          </p>
                          <Badge
                            className={`${getStatusColor(
                              item.status
                            )} capitalize font-medium`}
                          >
                            {item.status.replace("-", " ")}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-5/12 pr-8">
                      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-none bg-white/5 text-white">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl font-semibold">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-white/90 mb-4 leading-relaxed">
                            {item.description}
                          </p>
                          <Badge
                            className={`${getStatusColor(
                              item.status
                            )} capitalize font-medium`}
                          >
                            {item.status.replace("-", " ")}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                      <div className="p-2 border rounded-full">
                        <div
                          className={`w-4 h-4 rounded-full ${getDateConnector(
                            index
                          )} p-2.5 shadow-lg z-10`}
                        ></div>
                      </div>
                    </div>

                    <div className="w-5/12 pl-8 flex h-fit">
                      <Card
                        className={cn(
                          "shadow-border px-2 flex items-center justify-center py-2 border-none text-white rounded-full",
                          getDateGradient(index)
                        )}
                      >
                        <CardContent className="text-center font-semibold">
                          {item.date}
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col space-y-8 md:hidden">
          {timelineData.map((item, index) => (
            <div key={item.id} className="relative flex items-start">
              <div className="absolute left-0 top-4">
                <div className="p-2 border rounded-full">
                  <div
                    className={`w-4 h-4 rounded-full ${getDateConnector(
                      index
                    )} p-2.5 shadow-lg z-10`}
                  ></div>
                </div>
              </div>

              <div className="ml-12 w-full">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-none bg-white/5 text-white">
                  <CardHeader className="pb-2">
                    <div className="text-sm opacity-70 mb-1">{item.date}</div>
                    <CardTitle className="text-xl font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-white/90 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    <Badge
                      className={`${getStatusColor(
                        item.status
                      )} capitalize font-medium`}
                    >
                      {item.status.replace("-", " ")}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
