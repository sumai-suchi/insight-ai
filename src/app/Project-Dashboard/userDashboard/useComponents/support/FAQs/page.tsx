"use client";
import { useState } from "react";
const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Click on the sign up button and fill out the required information.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Go to Settings and select Security. There, you will find the Change Password option. Click on it to open the password change form. Enter your new password and submit the form to update your password.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use industry-standard encryption technologies to ensure your data remains safe and secure at all times. All sensitive information is protected during transmission and storage, following best security practices to prevent unauthorized access, data breaches, or misuse. Your privacy and data protection are our top priorities, and we continuously update our security measures to maintain a high level of safety.",
  },
  {
    question: "Can I change my email address?",
    answer:
      "No, you cannot change your email address once it has been registered. This is to ensure account security and prevent unauthorized changes. Your email is used as a unique identifier for your account, so allowing changes could lead to security risks or account misuse.If you need to use a different email address, you may need to create a new account using that email. If you believe there is a special case or issue, please contact support for further assistance.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "If you forget your password, you can easily reset it by clicking on the 'Forgot Password' option on the login page. After that, enter your registered email address and follow the instructions sent to your email. You will receive a secure link that allows you to create a new password. For security reasons, make sure to choose a strong password and do not share it with anyone.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes, we take your privacy and security very seriously. All your personal information is protected using industry-standard security measures, including encryption and secure data storage practices. We do not share your information with unauthorized third parties, and we continuously update our systems to ensure your data remains safe from potential threats.",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes, you can request to delete your account at any time. Once your account is deleted, all your associated data may be permanently removed from our system. Please note that this action is irreversible. If you are sure about deleting your account, you can proceed from your account settings or contact our support team for assistance.",
  },
  {
    question: "Why am I not receiving emails from the system?",
    answer:
      "If you are not receiving emails, please first check your spam or junk folder, as sometimes emails may be filtered there. Also, make sure that you entered the correct email address during registration. If the issue still persists, it might be due to temporary server issues or email provider restrictions. In that case, we recommend contacting our support team for further assistance.",
  },
  {
    question: "Can I update my profile information?",
    answer:
      "Yes, you can update most of your profile information from your account settings. This includes your name, profile picture, and other basic details. Simply go to your profile settings, make the necessary changes, and save them. However, some sensitive information, such as your registered email address, may not be editable for security reasons.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-xl p-4 shadow-sm bg-white">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left font-semibold text-lg"
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>

            {openIndex === index && (
              <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
