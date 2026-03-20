import { useState } from 'react';
import { Sparkles, Send, Loader2, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiTest() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Error: No se ha configurado la API Key de OpenAI.' }]);
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: input }],
          temperature: 0.7
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
        throw new Error('Respuesta inválida de la API');
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Error al conectar con GPT. Revisa la consola para más detalles.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', height: 'calc(100vh - 12rem)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Sparkles size={40} color="var(--accent-neon)" /> ASISTENTE IA
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Consulta o genera ideas para tus propuestas directamente con GPT.</p>
      </div>

      <div className="card" style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>
            <Bot size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>¡Hola! Soy tu asistente GPT. ¿En qué puedo ayudarte hoy?</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            gap: '1rem', 
            padding: '1rem', 
            borderRadius: '8px',
            backgroundColor: m.role === 'assistant' ? 'var(--bg-dark)' : 'rgba(227, 255, 0, 0.05)',
            border: m.role === 'assistant' ? '1px solid var(--border-color)' : '1px solid rgba(227, 255, 0, 0.2)',
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%'
          }}>
            <div style={{ color: m.role === 'assistant' ? 'var(--accent-neon)' : 'var(--text-main)' }}>
              {m.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div style={{ fontSize: '0.9375rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem', color: 'var(--text-muted)' }}>
            <Loader2 className="animate-spin" size={20} />
            <span className="mono">GPT está pensando...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu consulta aquí..."
          style={{ 
            flex: 1, 
            padding: '1rem', 
            backgroundColor: 'var(--bg-dark)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px', 
            color: 'var(--text-main)',
            outline: 'none'
          }}
        />
        <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
}
