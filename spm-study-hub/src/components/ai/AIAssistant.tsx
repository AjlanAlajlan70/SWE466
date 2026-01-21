'use client';

import { useState, useRef, useEffect, FormEvent, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, User, Loader2, Sparkles, X, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { askAI } from '@/lib/groq';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantRef {
  sendMessage: (message: string) => void;
  openChat: () => void;
}

interface AIAssistantProps {
  chapterNumber?: number;
  chapterTitle?: string;
  currentSlideTitle?: string;
  initialMessage?: string | null;
  onRef?: (ref: AIAssistantRef) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

// Context for sending messages to AI from outside the component
interface AIContextType {
  sendMessage: (message: string) => void;
  openChat: () => void;
}

const AIContext = createContext<AIContextType | null>(null);

export const useAI = () => {
  const context = useContext(AIContext);
  return context;
};

// Markdown renderer component
function MarkdownRenderer({ content }: { content: string }) {
  const renderContent = () => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="my-2 ml-4 space-y-1">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-500" />
                <span>{renderInlineMarkdown(item)}</span>
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const flushCode = () => {
      if (codeContent.length > 0) {
        elements.push(
          <pre key={`code-${elements.length}`} className="my-2 rounded-lg bg-slate-800 p-3 text-sm overflow-x-auto">
            <code className="text-slate-200">{codeContent.join('\n')}</code>
          </pre>
        );
        codeContent = [];
      }
    };

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCode();
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h4 key={index} className="mt-3 mb-1 font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            {renderInlineMarkdown(line.slice(4))}
          </h4>
        );
        return;
      }
      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h3 key={index} className="mt-4 mb-2 text-lg font-semibold text-foreground">
            {renderInlineMarkdown(line.slice(3))}
          </h3>
        );
        return;
      }
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h2 key={index} className="mt-4 mb-2 text-xl font-bold text-foreground">
            {renderInlineMarkdown(line.slice(2))}
          </h2>
        );
        return;
      }

      if (line.match(/^[-*•]\s/)) {
        listItems.push(line.slice(2));
        return;
      }

      if (line.match(/^\d+\.\s/)) {
        const match = line.match(/^\d+\.\s(.*)$/);
        if (match) {
          listItems.push(match[1]);
        }
        return;
      }

      if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <div key={index} className="my-2 border-l-4 border-amber-400 bg-amber-50 pl-4 py-2 rounded-r-lg">
            <p className="text-amber-800 font-medium">{renderInlineMarkdown(line.slice(2))}</p>
          </div>
        );
        return;
      }

      if (line.trim() === '') {
        flushList();
        return;
      }

      flushList();
      elements.push(
        <p key={index} className="my-1.5 leading-relaxed">
          {renderInlineMarkdown(line)}
        </p>
      );
    });

    flushList();
    flushCode();

    return elements;
  };

  const renderInlineMarkdown = (text: string): (string | JSX.Element)[] => {
    const parts: (string | JSX.Element)[] = [];
    let remaining = text;
    let keyIndex = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*/);
      const boldMatch2 = remaining.match(/^(.*?)__(.+?)__/);
      const italicMatch = remaining.match(/^(.*?)\*([^*]+?)\*/);
      const italicMatch2 = remaining.match(/^(.*?)_([^_]+?)_/);
      const codeMatch = remaining.match(/^(.*?)`([^`]+?)`/);
      const highlightMatch = remaining.match(/^(.*?)==(.+?)==/);

      const matches = [
        { match: boldMatch, type: 'bold' },
        { match: boldMatch2, type: 'bold' },
        { match: highlightMatch, type: 'highlight' },
        { match: codeMatch, type: 'code' },
        { match: italicMatch, type: 'italic' },
        { match: italicMatch2, type: 'italic' },
      ].filter(m => m.match);

      if (matches.length === 0) {
        parts.push(remaining);
        break;
      }

      const earliest = matches.reduce((a, b) =>
        (a.match![1].length < b.match![1].length) ? a : b
      );

      const match = earliest.match!;
      const before = match[1];
      const content = match[2];

      if (before) {
        parts.push(before);
      }

      switch (earliest.type) {
        case 'bold':
          parts.push(
            <strong key={keyIndex++} className="font-semibold text-foreground">
              {content}
            </strong>
          );
          break;
        case 'italic':
          parts.push(
            <em key={keyIndex++} className="italic">
              {content}
            </em>
          );
          break;
        case 'code':
          parts.push(
            <code key={keyIndex++} className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-coral-600">
              {content}
            </code>
          );
          break;
        case 'highlight':
          parts.push(
            <mark key={keyIndex++} className="rounded bg-yellow-200 px-1 text-yellow-900 font-medium">
              {content}
            </mark>
          );
          break;
      }

      remaining = remaining.slice(match[0].length);
    }

    return parts;
  };

  return <div className="text-sm text-foreground/90">{renderContent()}</div>;
}

export function AIAssistant({
  chapterNumber,
  chapterTitle,
  currentSlideTitle,
  initialMessage,
  onRef,
  onOpenChange,
}: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Notify parent when open state changes
  const handleSetIsOpen = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pendingMessageRef = useRef<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle initial message from text selection
  useEffect(() => {
    if (initialMessage && !isLoading) {
      handleSetIsOpen(true);
      pendingMessageRef.current = initialMessage;
    }
  }, [initialMessage, isLoading]);

  // Process pending message after opening
  useEffect(() => {
    if (isOpen && pendingMessageRef.current && !isLoading) {
      const msg = pendingMessageRef.current;
      pendingMessageRef.current = null;
      // Small delay to ensure the sidebar is visible
      setTimeout(() => sendMessageToAI(msg), 150);
    }
  }, [isOpen, isLoading]);

  // Expose ref methods to parent
  useEffect(() => {
    if (onRef) {
      onRef({
        sendMessage: (msg: string) => {
          handleSetIsOpen(true);
          pendingMessageRef.current = msg;
        },
        openChat: () => handleSetIsOpen(true),
      });
    }
  }, [onRef]);

  const sendMessageToAI = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chapterContext =
        chapterNumber && chapterTitle
          ? { chapterNumber, chapterTitle, currentSlideTitle }
          : undefined;

      const messageHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const { response, error } = await askAI(
        userMessage.content,
        chapterContext,
        messageHistory
      );

      if (error) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: `Sorry, I encountered an error: ${error}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: response,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await sendMessageToAI(input);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const openChat = () => {
    handleSetIsOpen(true);
  };

  // Expose context for external components
  const contextValue: AIContextType = {
    sendMessage: (msg: string) => {
      handleSetIsOpen(true);
      setTimeout(() => sendMessageToAI(msg), 100);
    },
    openChat,
  };

  const suggestedQuestions = [
    "Explain the Triple Constraint",
    "What makes software projects unique?",
    "Give me a quiz question",
  ];

  return (
    <AIContext.Provider value={contextValue}>
      {/* Toggle Button - Only show when closed */}
      {!isOpen && (
        <motion.button
          onClick={() => handleSetIsOpen(true)}
          className={cn(
            'fixed z-50 transition-all duration-300',
            'bottom-24 right-6 md:bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-coral-500 to-teal-500 shadow-lg text-white hover:scale-105'
          )}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            data-ai-sidebar
            className={cn(
              'fixed right-0 top-0 z-[60] h-full w-full sm:w-[400px]',
              'flex flex-col border-l border-border bg-card shadow-2xl'
            )}
          >
            {/* Header */}
            <div className="flex-shrink-0 border-b border-border bg-gradient-to-r from-coral-500 to-teal-500 px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">SPM Study Assistant</h2>
                    <p className="text-xs text-white/80">Powered by AI</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Clear Chat Button */}
                  {messages.length > 0 && (
                    <button
                      onClick={clearChat}
                      className="flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/30"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear
                    </button>
                  )}
                  {/* Close Button */}
                  <button
                    onClick={() => handleSetIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white transition-colors hover:bg-white/30"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Context Badge */}
            {chapterTitle && (
              <div className="flex-shrink-0 border-b border-border bg-muted/50 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs text-muted-foreground">
                    Helping with:{' '}
                    <span className="font-medium text-foreground">
                      Ch. {chapterNumber}: {chapterTitle}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col">
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-coral-100 to-teal-100">
                      <Sparkles className="h-10 w-10 text-teal-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      Hi! I&apos;m your SPM Assistant
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Ask me anything about the slides. Select text on slides and click &quot;Ask AI&quot; to get instant explanations!
                    </p>

                    {/* Suggested Questions */}
                    <div className="w-full space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Try asking:
                      </p>
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setInput(question)}
                          className="w-full rounded-lg border border-border bg-background p-3 text-left text-sm text-foreground transition-colors hover:bg-muted hover:border-coral-300"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex gap-3',
                        message.role === 'user' && 'flex-row-reverse'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg',
                          message.role === 'user'
                            ? 'bg-coral-100 text-coral-600'
                            : 'bg-gradient-to-br from-teal-100 to-emerald-100 text-teal-600'
                        )}
                      >
                        {message.role === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>

                      <div
                        className={cn(
                          'max-w-[85%] rounded-2xl px-4 py-3',
                          message.role === 'user'
                            ? 'bg-coral-500 text-white'
                            : 'bg-muted border border-border'
                        )}
                      >
                        {message.role === 'user' ? (
                          <p className="text-sm">{message.content}</p>
                        ) : (
                          <MarkdownRenderer content={message.content} />
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-teal-100 to-emerald-100 text-teal-600">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="flex items-center gap-2 rounded-2xl bg-muted border border-border px-4 py-3">
                        <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                        <span className="text-sm text-muted-foreground">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex-shrink-0 border-t border-border bg-background p-4">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className={cn(
                    'flex-1 rounded-xl border border-border bg-muted px-4 py-3',
                    'text-sm text-foreground placeholder:text-muted-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500',
                    'disabled:opacity-50'
                  )}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-xl',
                    'bg-gradient-to-br from-coral-500 to-teal-500 text-white',
                    'transition-all hover:opacity-90 hover:shadow-lg',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                  )}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AIContext.Provider>
  );
}

// Export the context hook
export { AIContext };
