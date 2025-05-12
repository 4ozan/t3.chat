"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation"

export default function Landing() {
   const router =  useRouter()
    const nextStep = () => {
     router.push('/auth/signup')
    }
  return (
    <>
     <div className="relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="bg-primary/10 absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-primary/5 absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl" />

      <div className="relative container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-5 md:gap-12 md:py-20 lg:py-24 xl:gap-16 2xl:max-w-[1400px]">
        {/* Text column - takes 3/5 on desktop, full on mobile */}
        <div className="flex flex-col justify-center md:col-span-3 md:pr-6 xl:pr-12">
          <div className="space-y-6 md:space-y-8">
            {/* Main heading with multi-line approach */}
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="block">Learn just the seo you need</span>
              <span className="text-primary mt-1 block">For your saas</span>
            </h1>

            {/* Description text */}
            <p className="text-muted-foreground max-w-xl text-lg">
              Build great experiences
            </p>


            {/* Call to action buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button onClick={nextStep} size="lg" className="group">
                Start free (No cc required)
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Image column - takes 2/5 on desktop, full on mobile */}
        <div className="relative flex aspect-[4/5] w-full items-center md:col-span-2 md:aspect-auto md:h-[600px]">
          {/* Decorative element */}
          <div className="border-primary/20 bg-background/50 absolute -top-6 -right-6 h-20 w-20 rounded-md border backdrop-blur-sm"></div>

          {/* Main image with frame */}
          <div className="border-muted/30 bg-muted/10 relative z-10 h-full w-full overflow-hidden rounded-2xl border shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Designer's workspace with contemporary design elements"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Decorative element */}
          <div className="border-primary/10 bg-background/50 absolute -bottom-6 -left-6 h-24 w-24 rounded-full border backdrop-blur-sm"></div>
        </div>
      </div>
    </div>
    </>
    
  );
}
