import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function Community() {
  return (
    <div className="max-w-6xl min-w-4/5 felx flex-col h-[40vh] p-10 text-center bg-primary text-secondary rounded-4xl">
      <div className="flex justify-center">
        {" "}
        <Globe className="h-10 w-10" />
      </div>

      <h2 className="text-4xl my-10 font-bold">Join Our Community</h2>
      <p>
        Be part of a growing community of creators, marketers, and businesses
        transforming how content is created.
      </p>
      <div className="flex mt-10 items-center mx-auto w-full justify-center">
        <Button variant="outline" className="mr-4 text-primary">
          Get Started Free
        </Button>
        <Button variant="outline" className="bg-primary text-white">
          Contact Sales
        </Button>
      </div>
    </div>
  );
}
