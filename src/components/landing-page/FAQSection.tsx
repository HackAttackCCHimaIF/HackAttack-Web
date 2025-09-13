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
    { question: "Registration requirements?", answer: "Details about registration requirements go here." },
    { question: "Fee for Batch 1 & 2?", answer: "Fee details for Batch 1 and Batch 2 go here." },
    { question: "What documents are required for the registration process?", answer: "List the required documents here." },
    { question: "When is the deadline for idea submission and registration?", answer: "Provide the deadline date and details here." },
    { question: "What will participants receive during the HackAttack event?", answer: "List the benefits and goodies participants will receive." },
    { question: "Are cross institution teams allowed?", answer: "Yes, cross-institution teams are allowed." },
    { question: "Extra special FAQ?", answer: "This is the last FAQ and will be centered in the grid." },
  ];

  return (
    <section className="w-full py-12  bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {faqs.map((faq, index) => {
          const isRightSide = index % 2 === 1; // item di kanan
          const isLastSingle = index === faqs.length - 1 && faqs.length % 2 !== 0;

          return (
            <Accordion
              key={index}
              type="single"
              collapsible
              className={`w-full md:col-span-3
                ${isRightSide ? "md:col-start-5" : ""}
                ${isLastSingle ? "md:col-start-3" : ""}`}
            >
              <AccordionItem
                value={`item-${index}`}
                className="bg-neutral-900 border border-neutral-800 py-2 px-4 rounded-4xl"
              >
                <AccordionTrigger className="flex w-full justify-between font-semibold text-xl text-left items-center text-[#98F47A] hover:no-underline">
                  {faq.question}
                  
                </AccordionTrigger>
                <AccordionContent className="text-neutral-300 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>


      </div>
    </section>
  );
}
