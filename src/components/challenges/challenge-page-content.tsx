"use client";

import type { ReactNode } from "react";
import type { Challenge } from "@/lib/types";
import { ChallengeCard } from "./challenge-card";
import { CallFlowViz } from "./call-flow-viz";
import { TwilioRoutingViz } from "./twilio-routing-viz";
import { AutomationReliabilityViz } from "./automation-reliability-viz";

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "challenge-1": <CallFlowViz />,
    "challenge-2": <TwilioRoutingViz />,
    "challenge-3": <AutomationReliabilityViz />,
  };

  return (
    <div className="flex flex-col gap-5">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          index={index}
          title={challenge.title}
          description={challenge.description}
          outcome={challenge.outcome}
        >
          {visualizations[challenge.id]}
        </ChallengeCard>
      ))}
    </div>
  );
}
