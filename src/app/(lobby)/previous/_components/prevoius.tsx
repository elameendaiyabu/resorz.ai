"use client";
import {
    ResourceCard,
    ResourceCardDescription,
    ResourceCardTitle,
} from "@/components/resource-card";
import Link from "next/link";

interface Saved {
    title: string;
    type: string;
    source: string;
    link: string;
    difficulty: string;
    description: string;
}

export default function PreviousResources() {
    const saved = localStorage.getItem("resources")!;

    const previous: Saved[] = JSON.parse(saved);

    return (
        <div>
            {previous?.map((item, idx: number) => (
                <div key={idx} className="relative group  block p-2 h-full w-full">
                    <ResourceCard>
                        <Link href={item?.link} target="_blank">
                            <ResourceCardTitle>{item.title}</ResourceCardTitle>
                            <ResourceCardDescription>
                                {item.description}
                            </ResourceCardDescription>
                            <ResourceCardDescription className=" text-primary">
                                <div>Source: {item.source}</div>
                                <div>Type: {item.type}</div>
                                <div>Difficulty: {item.difficulty}</div>
                            </ResourceCardDescription>
                        </Link>
                    </ResourceCard>
                </div>
            ))}
        </div>
    );
}
