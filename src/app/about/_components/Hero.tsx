import { Button } from "@/components/ui/button";
import React from "react";

function Hero() {
  return (
    <div className="flex flex-col items-center text-center w-full justify-center min-h-[60vh] gap-6 bg-primary p-5 text-secondary">
      <Button variant="ghost" className="bg-transparent rounded-full" size="lg">
        About Us
      </Button>
      <h1 className="text-3xl font-bold">
        Transforming Content Creation with AI
      </h1>
      <p className="max-w-3xl w-7/10">
        We're on a mission to empower creators, marketers, and businesses with
        the most advanced AI-powered content generation platform.
      </p>
      <div className="flex items-center">
        <Button variant="outline" className="mr-4 text-primary">
          Join our team
        </Button>
        <Button variant="outline" className="bg-primary text-white">
          Learn More
        </Button>
      </div>
    </div>
  );
}

export default Hero;
