"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Link from 'next/link'


import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
} from "@/components/ui/form";

import * as z from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";


export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const formSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/courses", values);
      setShowSuccess(true);
      setShowError(false);
      form.reset();
    } catch (err) {
      console.error("error", err);
      setShowSuccess(false);
      setShowError(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Form Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white/10 p-8 rounded-xl shadow-xl backdrop-blur-sm border border-white/20">
          {showSuccess && (
            <Alert className="mb-4" variant="default">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
            Login successfull.
              </AlertDescription>
            </Alert>
          )}
          {showError && (
            <Alert className="mb-4" variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Login failed. Try again.</AlertDescription>
            </Alert>
          )}
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="email"
                        className="bg-white/20 text-white placeholder-white/60"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="password"
                        className="bg-white/20 text-white placeholder-white/60"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="p-2 w-full bg-black text-white hover:bg-neutral-700 rounded shadow-md"
              >
               Login
              </button>
            </form>
            </Form>
            <h1 className='pt-4 space-x-1 text-gray-400'>
               Already Have an Account?  
               <Link className='text-black' href="/auth/signup">
             Signup
            </Link>
            </h1> 
        </div>
      </div>
    </div>
  );
}
