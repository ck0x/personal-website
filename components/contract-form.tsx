"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "./ui-elements";

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState({
    status: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      recipient: "chriskwon0@gmail.com",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormStatus({
        status: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });

      // Reset the form
      e.currentTarget.reset();
    } catch (error) {
      setFormStatus({
        status: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassCard hover="glow" className="h-full">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-sm focus:border-primary/50 focus:ring focus:ring-primary/20 transition-all"
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-sm focus:border-primary/50 focus:ring focus:ring-primary/20 transition-all"
              placeholder="Your email"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-sm focus:border-primary/50 focus:ring focus:ring-primary/20 transition-all"
            placeholder="Subject"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-sm resize-none focus:border-primary/50 focus:ring focus:ring-primary/20 transition-all"
            placeholder="Your message"
            required
          />
        </div>

        {formStatus.status && (
          <div
            className={`p-3 rounded-md ${
              formStatus.status === "success"
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {formStatus.message}
          </div>
        )}

        <Button type="submit" className="w-full group" disabled={isSubmitting}>
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              Send Message
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </GlassCard>
  );
}
