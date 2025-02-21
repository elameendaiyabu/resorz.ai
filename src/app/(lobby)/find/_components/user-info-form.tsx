"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Heart } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  course: z
    .string()
    .min(3, {
      message: "Course name should be atleast 3 characters",
    })
    .max(50),
  level: z.string({ required_error: "Please select your level" }),
  style: z.string({
    required_error: "Please select your preferred learning style",
  }),
  type: z.string({
    required_error: "Please select your preferred resource type",
  }),
  difficulty: z.string({
    required_error: "Please select your preferred difficulty level",
  }),
  cost: z.string({
    required_error: "Please select your preferred cost",
  }),
});

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

interface Recomendations {
  title: string;
  type: string;
  source: string;
  link: string;
  difficulty: string;
  description: string;
}

export default function UserForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [generatedResources, setGeneratedResources] = useState<
    Recomendations[]
  >([]);
  const [showForm, setShowForm] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitted(true);
    const maxRetries = 3;
    let attempts = 0;

    while (attempts < maxRetries) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
        });

        const generationConfig = {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        };
        const chatSession = model.startChat({
          generationConfig,
          history: [],
        });

        const prompt = `
      I'm seeking recommendations for learning materials based on my preferences.
      Please provide at least 20 learning materials in JSON format with the following attributes: title, type, source, link, difficulty, and description.
      Ensure that the property names are double-quoted. Omit the JSON specifier, backticks, asterisks, or ellipses to facilitate parsing and rendering the data on screen.

      Course: ${values.course}
      University Level: ${values.level}
      Preferred Learning Style: ${values.style}
      Preferred Resource Type: ${values.type}
      Preferred Difficulty Level: ${values.level}
      Resource Cost: ${values.cost}

      Here's an example JSON structure:
      [
        {
          "title": "...",
          "type": "...",
          "source": "...",
          "link": "...",
          "difficulty": "...", 
          "description": "..."
        }
      ]
      Replace the ellipses with actual data when providing the recommendations.
      `;

        const output = await chatSession.sendMessage(prompt);
        const response = output.response;
        const result = JSON.parse(response.text());

        setGeneratedResources(result);
        console.log(generatedResources);
        setShowForm(false);
        setSubmitted(false);
        return;
      } catch (error) {
        console.log(`Attempt ${attempts + 1} failed:`, error);

        if (attempts === maxRetries - 1) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setShowForm(true);
        }
      }
      attempts++;
    }

    setSubmitted(false);
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div
        className={`transition-all duration-500 ease-in-out ${showForm ? "opacity-100 flex w-full justify-center p-6 md:p-10 max-h-[1000px]" : "opacity-0 max-h-0 overflow-hidden"}`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full max-w-sm"
          >
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Course" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter course associated with resources.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1OO">100</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="300">300</SelectItem>
                      <SelectItem value="400">400</SelectItem>
                      <SelectItem value="500">500</SelectItem>
                      <SelectItem value="600">600</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select current level</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Learning Style</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select learning style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="visual">Visual</SelectItem>
                      <SelectItem value="auditory">Auditory</SelectItem>
                      <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select your preferred learning style
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Resource Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="video tutorials">
                        Video Tutorials
                      </SelectItem>
                      <SelectItem value="written materials">
                        Written Materials
                      </SelectItem>
                      <SelectItem value="interactive exercises">
                        Interactive Exercise
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select your preferred resource type
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select your preferred difficulty level
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Cost</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cost" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select your preferred cost</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={submitted}
              className={` ${submitted && "spin-in"}`}
            >
              {submitted ? "fetching resources" : "Get Resources"}
            </Button>
          </form>
        </Form>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${!showForm ? "opacity-100" : "opacity-0 hidden"}`}
      >
        <Button onClick={() => setShowForm(true)} className="">
          Edit Info
        </Button>
        <div>
          {generatedResources.map((item, idx) => (
            <div key={idx} className="relative group  block p-2 h-full w-full">
              <Card>
                <div className="grid grid-flow-col justify-end">
                  <form>
                    <button type="submit">
                      <Heart className="hover:cursor-pointer hover:fill-red-400" />
                    </button>
                  </form>
                </div>

                <Link href={item.link} target="_blank">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <CardDescription className=" text-primary">
                    <div>Source: {item.source}</div>
                    <div>Type: {item.type}</div>
                    <div>Difficulty: {item.difficulty}</div>
                  </CardDescription>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl  h-full w-full p-4 overflow-hidden bg-muted border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 ",
        className,
      )}
    >
      <div className="">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-primary font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-secondary-foreground tracking-wide leading-relaxed text-sm",
        className,
      )}
    >
      {children}
    </p>
  );
};
