import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <ContentLayout title="Dashboard">
      <div className="bg-gradient-to-br rounded-sm from-red-600 to-rose-500 flex flex-col items-center justify-center p-4 text-white">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
            Welcome to Resorz.AI
          </h1>
          <p className="text-xl mb-8 animate-fade-in-up">
            Discover tailored resources that match your needs and boost your
            productivity.
          </p>
          <Link href="/find" passHref>
            <Button className="group bg-white text-purple-600 mt-5 hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-3 rounded-full shadow-lg">
              Find Resources
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in">
          {["Personalized", "Curated", "Efficient"].map((feature, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-md"
            >
              <h2 className="text-2xl font-semibold mb-2">{feature}</h2>
              <p className="text-sm">
                Experience {feature.toLowerCase()} resource recommendations.
              </p>
            </div>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}
