'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PromptSuggestion } from "@/components/ui/prompt-suggestion"
import { ResponseStream } from "@/components/ui/response-stream"
import { Send, Copy, Search, ChevronDown, Paperclip } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import ReactMarkdown from "react-markdown"

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [isClient, setIsClient] = useState(false)  
  const [copySuccess, setCopySuccess] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([
    "How does AI work?",
    "What is the meaning of life?",
    "Tell me about quantum computing",
    "Explain blockchain technology"
  ])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setIsStreaming(true)
    setResponse("Generating...")

    const currentPrompt = prompt
    setPrompt("")

    try {
      const result = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ prompt: currentPrompt }),
      })

      if (!result.ok) {
        const errorText = await result.text()
        throw new Error(`HTTP ${result.status}: ${errorText}`)
      }

      const data = await result.json()
      setIsStreaming(false)

      if (data.response) {
        setResponse(data.response)
        saveChatToMemory(currentPrompt, data.response)
      } else if (data.error) {
        setResponse(`Error: ${data.error}`)
      } else {
        setResponse("No response received from API")
      }
    } catch (error) {
      console.error("Error generating response:", error)
      setResponse(`Error: ${error instanceof Error ? error.message : String(error) || "Failed to generate response"}`)
      setIsStreaming(false)
    } finally {
      setLoading(false)
    }
  }

  const saveChatToMemory = (prompt: string, response: string) => {
    console.log("Chat saved:", { prompt, response, timestamp: new Date().toISOString() })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error: unknown) {
      console.error("Failed to copy:", error instanceof Error ? error.message : String(error))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit()
    }
  }
  return (
    <div className="flex flex-col h-screen bg-[#FAF4FA]">
      <div className="flex-1 overflow-auto p-6 rounded-2xl border-[#F9F2F9]">
        <div className="mx-auto max-w-4xl">
          {isClient && response && (
            <div className="rounded-lg border p-6 shadow-sm bg-white">              {isStreaming ? (
                <ResponseStream textStream={response} />
              ) : (
                <>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={{
                      code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            customStyle={{ borderRadius: '0.5rem', padding: '1rem' }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
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
                  {!isStreaming && response && response !== "Generating..." && (
                    <div className="mt-4 flex justify-end border-t pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        className="flex items-center gap-2"
                      >
                        <Copy size={14} />
                        {copySuccess ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {!response && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[#93268F] mb-2">How can I help you today?</h2>
                <p className="text-gray-500">Choose a suggestion or type your own question</p>
              </div>
              <div className="grid grid-cols-2 gap-4">                {suggestions.map((suggestion, index) => (
                  <PromptSuggestion
                    key={index}
                    onClick={() => {
                      setPrompt(suggestion)
                      handleSubmit()
                    }}
                  >
                    {suggestion}
                  </PromptSuggestion>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Chat Input Area */}
      <div className="p-4 bg-[#FAF4FA]">
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-3 flex items-center gap-3">            <div className="flex-1">
              <textarea
                value={prompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={loading}
                placeholder="Type your message here..."
                className="w-full p-2 outline-none resize-none h-12 bg-transparent"
                rows={1}
              />
            </div>
            <button 
              onClick={handleSubmit}
              disabled={loading || !prompt.trim()}
              className="bg-[#AB4573] hover:bg-pink-500 text-white rounded-full p-3 transition-colors disabled:bg-pink-200 disabled:cursor-not-allowed flex items-center justify-center h-12 w-12"
            >
              {loading ? (
                <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Send className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="flex items-center mt-2 px-2">
            <button className="flex items-center text-pink-600 font-semibold text-sm bg-pink-100 rounded-full px-4 py-1.5 hover:bg-pink-200 transition-colors">
              <span>Gemini 2.5 Flash</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="ml-4 flex items-center text-gray-600 font-semibold text-sm bg-gray-100 rounded-full px-4 py-1.5 hover:bg-gray-200 transition-colors">
              <Search className="h-4 w-4" />
              <span className="ml-2">Search</span>
            </button>
            <button className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Paperclip className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
