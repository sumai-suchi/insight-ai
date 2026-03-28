"use client";
import { useState } from "react";
import {
  HelpCircle,
  CreditCard,
  Settings,
  Mail,
  Zap,
  BookOpen,
  Briefcase,
  Layers3,
  MessageSquareHeart,
  FileText,
  Star,
  Users,
} from "lucide-react";

const faqs = [
  {
    icon: HelpCircle,
    question: "Is there a free trial available?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running.",
  },
  {
    icon: Layers3,
    question: "Can I change my plan later?",
    answer:
      "Of course you can! Our pricing scales with your company. Chat to our friendly team to find a solution that works for you as you grow.",
  },
  {
    icon: FileText,
    question: "What is your cancellation policy?",
    answer:
      "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
  },
  {
    icon: FileText,
    question: "Can other info be added to an invoice?",
    answer:
      "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name manually.",
  },
  {
    icon: Star,
    question: "What does 'lifetime access' mean?",
    answer:
      "Once you have purchased the UI kit, you will have access to all of the future updates, free of charge. We'll let you know about releases.",
  },
  {
    icon: CreditCard,
    question: "Is it a one-time payment?",
    answer:
      "Just a one-time payment! No recurring charges or surprises, we promise. We're just as sick of recurring charges as you are.",
  },
  {
    icon: CreditCard,
    question: "How does billing work?",
    answer:
      "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.",
  },
  {
    icon: Mail,
    question: "How do I change my account email?",
    answer:
      "You can change the email address associated with your account by going to <a href='#' class='text-blue-600 hover:underline'>untitled.com/account</a> from a laptop or desktop.",
  },
  {
    icon: MessageSquareHeart,
    question: "How does support work?",
    answer:
      "If you're having trouble with Untitled UI, we're here to try and help via <a href='mailto:hello@untitledui.com' class='text-blue-600 hover:underline'>hello@untitledui.com</a>. We're a small team, but will get back to soon.",
  },
  {
    icon: BookOpen,
    question: "Do you provide tutorials?",
    answer:
      "Not yet, but we're working on it! In the meantime, we've done our best to make it intuitive and we're building our <a href='#' class='text-blue-600 hover:underline'>documentation page</a>.",
  },
  {
    icon: Briefcase,
    question: "Can I use it for commercial projects?",
    answer:
      "Of course! We'd love to see it. You can use this UI kit to build any type of commercial business, website, app, or project.",
  },
  {
    icon: Layers3,
    question: "Can I use it for multiple projects?",
    answer:
      "Absolutely! You can use Untitled UI for as many projects as you like. Please read our <a href='#' class='text-blue-600 hover:underline'>License Agreement</a> before purchasing.",
  },
  {
    icon: Zap,
    question: "How do I create an account?",
    answer:
      "Click on the sign up button, choose your plan, and fill out the required information to get started instantly.",
  },
  {
    icon: Settings,
    question: "How can I reset my password?",
    answer:
      "Go to Settings, select Security, and you'll find the 'Change Password' option. Follow the prompts to set a new secure password.",
  },
  {
    icon: Users,
    question: "Can I add team members to my workspace?",
    answer:
      "Yes, depending on your plan, you can invite team members via email from your workspace settings.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // Background White
    <section className="bg-white text-black min-h-screen">
      <div className="max-w-[1200px] mx-auto p-8 md:p-12 lg:p-16">
        {/* Header Section */}
        <div className="mb-12 border-b border-gray-200 pb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Stuck on something? We're here to help with all your questions and
            answers in one place.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`bg-white border transition-all duration-300 rounded-3xl p-6 ${
                  isOpen
                    ? "border-black shadow-lg"
                    : "border-gray-200 hover:border-black"
                }`}
              >
                {/* FAQ Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start gap-4 text-left group"
                >
                  {/* Icon Container - Light Gray background for subtle look */}
                  <div
                    className={`flex-shrink-0 mt-1 size-11 rounded-xl flex items-center justify-center border transition-colors ${
                      isOpen
                        ? "bg-black border-black"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <Icon
                      className={`size-6 ${isOpen ? "text-white" : "text-black"}`}
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="text-lg font-bold text-black group-hover:opacity-70 transition-opacity">
                        {faq.question}
                      </h3>
                      <span
                        className={`text-2xl font-medium ${isOpen ? "text-black" : "text-gray-400"}`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>

                    {/* FAQ Answer */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "max-h-[500px] mt-4 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p
                        className="text-gray-600 leading-relaxed text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
