'use client'

import React from "react"
import remarkBreaks from "remark-breaks"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
// @ts-ignore - Type issues with react-syntax-highlighter styles
import remarkGfm from "remark-gfm"
import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from "react-markdown"
import { LucideIcon, Send } from "lucide-react"

interface BtnProps{
  icon: LucideIcon
}

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // This useEffect ensures that rendering only happens on the client
  // which helps prevent hydration mismatches
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true)
    setIsStreaming(true)
    setResponse("Generating...")

    const currentPrompt = prompt
    setPrompt("")

    try {
      const result = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentPrompt }),
      })

      if (!result.ok) throw new Error("Response Error")

      const data = await result.json()
      setIsStreaming(false)
      setResponse(data.response || "No response text found")
      saveChatToLocalStorage(currentPrompt, data.response)
    } catch (error) {
      console.error("error generating", error)
      setResponse("Application error")
      setIsStreaming(false)
    } finally {
      setLoading(false)
    }
  }

  const saveChatToLocalStorage = (prompt: string, response: string) => {
    try {
      const existingChat = localStorage.getItem('currentChat')
      let chatHistory = existingChat ? JSON.parse(existingChat) : []

      chatHistory.push({
        prompt,
        response,
        timestamp: new Date().toISOString()
      })

      localStorage.setItem('currentChat', JSON.stringify(chatHistory))
    } catch (error) {
      console.error('Failed to save chat to localStorage', error)
    }
  }

  return (
    <div className="flex flex-col h-screen items-center justify-between">
      <div className="w-full max-w-4xl flex-1 overflow-y-auto p-4">
        {isClient && response && (
          <div className="prose prose-sm">
            {isStreaming ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="animate-pulse">Generating</div>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            ) : (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  // @ts-ignore - Type issues with ReactMarkdown components
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-([\w-]+)/.exec(className || "")
                    return !inline && match ? (
                      <div className="relative mt-4">
                        <div className="absolute top-0 right-0 bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-bl rounded-tr z-10">
                          {match[1]}
                        </div>
                        <SyntaxHighlighter
                          // @ts-ignore - Type issues with react-syntax-highlighter styles
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            borderRadius: '0.5rem',
                            marginTop: '0',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {response}
              </ReactMarkdown>
            )}
          </div>
        )}
      </div>

      <div className="w-full border-t bg-gradient-to-b from-background/10 to-background/80 p-4">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4">
          <Textarea 
            className="min-h-[80px] max-h-[300px] w-full resize-none overflow-y-auto p-4 focus-visible:ring-1" 
            placeholder="Type your message here..." 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex w-full justify-end">
            <button onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded">
              {loading ? 'Sending...' : "Send "}
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
