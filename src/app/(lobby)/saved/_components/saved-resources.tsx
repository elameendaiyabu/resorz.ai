import {
  ResourceCard,
  ResourceCardDescription,
  ResourceCardTitle,
} from "@/components/resource-card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Heart } from "lucide-react";
import Link from "next/link";

export default async function SavedResources() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { data: saved } = await supabase
    .from("saved")
    .select("*")
    .eq("userEmail", data.user?.email);

  if (!data.user) {
    return (
      <div className="flex items-center justify-center ">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Login Required
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You need to be logged in to access saved resources.
            </p>
          </div>
          <Link href="/auth/login" className="mt-8 space-y-6">
            <Button className="w-full">Log in to your account</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {saved?.map((item, idx) => (
        <div key={idx} className="relative group  block p-2 h-full w-full">
          <ResourceCard>
            <div className="grid grid-flow-col justify-end">
              <form>
                <button
                  type="submit"
                  disabled={data.user?.email ? false : true}
                >
                  <Heart className="hover:cursor-pointer fill-red-400" />
                </button>
              </form>
            </div>

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
