"use client";

import { Input } from "../Input.tsx";
import { Button } from "../Button.tsx";
import React, { useState, useTransition } from "react";
import { subscribeToNewsletter } from "@/app/components/recipify-actions.ts";
import LoadingIndicator from "@/app/components/LoadingIndicator.tsx";
import RecipifyIcon from "@/app/components/RecipifyIcon.tsx";

//⚠️ Diese Komponente funktioniert nur, wenn
//   JavaScript eingeschaltet ist
export function NewsletterRegistration() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"Subscribed!" | null>(null);

  const [isRequestRunning, startTransition] = useTransition();

  const handleEmailChange = (e: string) => {
    setStatus(null);
    setEmail(e);
  };

  const handleSubmit = () => {
    startTransition(async () => {
      await subscribeToNewsletter(email);
      setStatus("Subscribed!");
    });
  };

  const saveDisabled = email.length < 1 || isRequestRunning;

  return (
    <div
      className={"max-w-1/4 flex items-center space-x-4 pe-2 ps-2 font-barlow"}
    >
      <div>Don't miss new recipes. Subscribe to newsletter</div>
      <div className={"max-w-64"}>
        <Input
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          disabled={isRequestRunning}
          placeholder={"E-Mail"}
        />
      </div>
      <div>
        <Button disabled={saveDisabled} checked={status === "Subscribed!"}>
          {isRequestRunning ? (
            <LoadingIndicator secondary placeholder={<RecipifyIcon />} />
          ) : (
            <button onClick={handleSubmit}>Subscribe</button>
          )}
        </Button>
      </div>
      <div>{status === "Subscribed!" && "Subscribed!"}</div>
    </div>
  );
}
