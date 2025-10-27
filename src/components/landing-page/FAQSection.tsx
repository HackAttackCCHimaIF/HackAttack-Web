"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    { question: "Registration requirements?", answer: "Participants must be students or individuals who meet the eligibility criteria set by the committee. Each team should consist of minimal  3 members. Solo participants are welcome and can form teams via our Discord server." },
    { question: "Fee for Batch 1 & 2?", answer: "1st Wave  (October 27th – November 8th) : Tel U Students [IDR 150.000/team] and non Tel U Students [170.000/team] 2nd Wave  (November 10th – November 15th) : Tel U Students [IDR 200.000/team] and non Tel U Students [220.000/team] Register early to enjoy a lower fee!" },
    { question: "What documents are required for the registration process?", answer: "Each team is required to submit proof of payment, a student ID or identity card for each member, and basic team details including the team name, email address, and university or institution represented. All documents must be clear, readable, and compiled according to the provided submission guidelines." },
    { question: "When is the deadline for idea submission and registration?", answer: "No worries! You can join our Discord server to connect with other participants and form a team before registration closes." },
    { question: "What will participants receive during the HackAttack event?", answer: "Participants will receive: Access to two exclusive workshops for batch 1 registers, E-certificate of participation, The chance to win prizes worth up to IDR 10 million, Networking opportunities and real-world experience" },
    { question: "Are cross institution teams allowed?", answer: "Yes! Teams are allowed to have members from different universities or institutions. We encourage cross-campus collaboration and diversity in problem-solving." },
    { question: "When is the deadline for idea submission and registration?", answer: "Final registration deadline: November 15th 2025, 23:59 PM. Proposal submission deadline: November 18th, 23 : 59 PM. Make sure to complete both steps before the deadlines!" },
  ];

  return (
    <section className="w-full py-12  bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <Accordion
              type="single"
              collapsible
              className={`w-full md:col-span-3 grid grid-cols-1 md:grid-cols-7 gap-4`}>
        {faqs.map((faq, index) => {
          const isRightSide = index % 2 === 1; 
          const isLastSingle = index === faqs.length - 1 && faqs.length % 2 !== 0;

          return (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`bg-neutral-900 border border-neutral-800 py-2 px-4 rounded-4xl w-full md:col-span-3 h-fit
                  ${isRightSide ? "md:col-start-5" : ""}
                  ${isLastSingle ? "md:col-start-3" : ""}`}
              >
                <AccordionTrigger className="flex w-full justify-between font-semibold text-xl text-left items-center text-[#98F47A] hover:no-underline">
                  {faq.question}
                  
                </AccordionTrigger>
                <AccordionContent className="text-[#98F47A]/80 font-medium tracking-wide pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
          );
        })}
      </Accordion>


      </div>
    </section>
  );
}
