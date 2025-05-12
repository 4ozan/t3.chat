"use client";

import  Link  from 'next/link'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

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
    fullname: z.string().min(1, { message: "Full name is required" }),
    Email: z.string().email({ message: "Valid email is required" }),
    Password: z.string().min(1, { message: "Password is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      Email: "",
      Password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/courses", {
        fullname: values.fullname,
        Email: values.Email,
        Password: values.Password
      });
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
                Course submitted successfully.
              </AlertDescription>
            </Alert>
          )}
          {showError && (
            <Alert className="mb-4" variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Submission failed. Try again.</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Fullname</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Full name"
                        className="bg-white text-black placeholder-gray-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email"
                        className="bg-white text-black placeholder-gray-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
                        className="bg-white text-black placeholder-gray-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="p-2 w-full bg-black text-white hover:bg-neutral-700 rounded shadow-md"
              >
                Sign up
              </button>
            </form>
            <h1 className='pt-4 space-x-1 text-gray-400'>
               Already Have an Account?  
               <Link className='text-black' href="/dashboard">
             Login
            </Link>
            </h1> 
          </Form>
        </div>
      </div>
    </div>
  );
}
