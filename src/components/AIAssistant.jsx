import { useState, useRef, useEffect } from 'react';
import { useAIChat } from '../hooks/useAIChat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { messages, loading, error, sendMessage, clearChat } = useAIChat();
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !loading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(232,255,0,0.3)',
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          color: 'var(--bg-primary)',
          fontSize: '24px',
          transform: isOpen ? 'scale(1.1)' : 'scale(1)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.transform = 'scale(1.15)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(232,255,0,0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,255,0,0.3)';
          }
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatBubbleOutlineIcon />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '120px',
            right: '2rem',
            zIndex: 9998,
            width: 'min(420px, 90vw)',
            maxHeight: '600px',
            borderRadius: '12px',
            background: 'var(--bg-surface)',
            border: '1px solid rgba(232,255,0,0.15)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(232,255,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(232,255,0,0.08), rgba(0,201,167,0.04))',
              borderBottom: '1px solid rgba(232,255,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '18px' }}>🤖</span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}
              >
                Shalom's AI
              </span>
            </div>
            <button
              onClick={clearChat}
              aria-label="Clear chat"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.25rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <DeleteOutlineIcon fontSize="small" />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'fadeIn 0.3s ease-out',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '0.75rem 1rem',
                    borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background:
                      msg.role === 'user'
                        ? 'rgba(232,255,0,0.15)'
                        : 'rgba(0,201,167,0.08)',
                    border:
                      msg.role === 'user'
                        ? '0.5px solid rgba(232,255,0,0.3)'
                        : '0.5px solid rgba(0,201,167,0.2)',
                    color:
                      msg.role === 'user'
                        ? 'var(--text-primary)'
                        : 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {error && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255,100,100,0.1)',
                  border: '0.5px solid rgba(255,100,100,0.3)',
                  color: '#ff6464',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-code)',
                }}
              >
                ⚠️ {error}
              </div>
            )}
            {loading && (
              <div
                style={{
                  display: 'flex',
                  gap: '0.3rem',
                  padding: '0.75rem 1rem',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    animation: 'typingBounce 1.4s infinite',
                  }}
                />
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    animation: 'typingBounce 1.4s infinite 0.2s',
                  }}
                />
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    animation: 'typingBounce 1.4s infinite 0.4s',
                  }}
                />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '1rem',
              borderTop: '1px solid rgba(232,255,0,0.1)',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.6rem 0.85rem',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(232,255,0,0.15)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'all 0.2s ease',
                cursor: loading ? 'not-allowed' : 'text',
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(232,255,0,0.3)';
                e.currentTarget.style.background = 'rgba(232,255,0,0.05)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(232,255,0,0.15)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !inputValue.trim()}
              aria-label="Send message"
              style={{
                padding: '0.6rem',
                background: 'rgba(232,255,0,0.1)',
                border: '0.5px solid rgba(232,255,0,0.2)',
                borderRadius: '6px',
                color: 'var(--accent-primary)',
                cursor: loading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                opacity: loading || !inputValue.trim() ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!loading && inputValue.trim()) {
                  e.currentTarget.style.background = 'rgba(232,255,0,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(232,255,0,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(232,255,0,0.1)';
                e.currentTarget.style.borderColor = 'rgba(232,255,0,0.2)';
              }}
            >
              <SendIcon fontSize="small" />
            </button>
          </div>

          {/* Animations */}
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes typingBounce {
              0%, 60%, 100% { transform: translateY(0); }
              30% { transform: translateY(-8px); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
