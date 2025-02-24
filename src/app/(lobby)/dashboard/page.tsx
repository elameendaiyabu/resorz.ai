import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <ContentLayout title="Dashboard">
      <div className="rounded-sm flex flex-col items-center justify-center p-4 ">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-2xl md:text-2xl lg:text-4xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Find amazing resources <br /> at <Cover>warp speed</Cover>
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
          <div className="p-6 rounded-lg backdrop-blur-md bg-neutral-200">
            <h2 className="text-2xl font-semibold mb-2">Personalized</h2>
            <p className="text-sm">
              Get reading recommendations tailored to your learning style and
              interests. Our intelligent system adapts to your needs, ensuring
              every resource is relevant and impactful.
            </p>
          </div>
          <div className="p-6 rounded-lg backdrop-blur-md bg-neutral-200">
            <h2 className="text-2xl font-semibold mb-2">Curated</h2>
            <p className="text-sm">
              No more information overload—our AI handpicks the best reading
              materials, so you only get high-quality, valuable resources that
              truly enhance your understanding.
            </p>
          </div>
          <div className="p-6 rounded-lg backdrop-blur-md bg-neutral-200">
            <h2 className="text-2xl font-semibold mb-2">Efficient</h2>
            <p className="text-sm">
              Save time and study smarter with streamlined reading
              recommendations. Focus on what matters most and accelerate your
              learning with the right resources at the right time.
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
