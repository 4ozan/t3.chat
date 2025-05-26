'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Copy } from "lucide-react"
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
    <div className="flex flex-col h-screen bg-gray-23e0 pl-10">
      <div className="border-b bg-white p-4">
        <h1 className="text-xl font-semibold text-gray-800">TAIBA</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-4xl">
          {isClient && response && (
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              {isStreaming ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="animate-pulse">Generating response</div>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              ) : (
                <>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={{
                      code({ node,  className, children, ...props }) {
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
            <div className="text-center text-gray-500 mt-20 pl-3">
              <p className="text-xl mb-2">Were Back, Fawuzan</p>
            </div>
          )}
        </div>
      </div>

      <div className="border-t bg-white p-4 mx-auto container px-4">
        <div className="mx-auto max-w-4xl w-full">
         <div className="relative w-full">
  <Textarea
    className="w-full min-h-[80px] max-h-[200px] resize-none border-gray-300 pr-20 focus:border-blue-500 focus:ring-blue-500"
    placeholder="Type your message here... (Ctrl+Enter to send)"
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    onKeyDown={handleKeyPress}
    disabled={loading}
  />
  <Button
    onClick={handleSubmit}
    disabled={loading || !prompt.trim()}
    className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 h-auto text-sm flex items-center gap-1"
  >
    {loading ? (
      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
    ) : (
      <Send size={16} />
    )}
  </Button>
</div>
</div>
</div>
    </div>
  )
}
