import { useState, useRef } from 'react';
import { Sparkles, Send, Loader2, Bot, User, FileText, Image as ImageIcon, Upload, CheckCircle2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiTest() {
  // Chat Libre States
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);

  // Vision States
  const [image, setImage] = useState<string | null>(null);
  const [visionResponse, setVisionResponse] = useState<string>('');
  const [loadingVision, setLoadingVision] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loadingChat) return;

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Error: No API Key.' }]);
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoadingChat(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: input }],
          temperature: 0.7
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Error al conectar.' }]);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!image || loadingVision) return;

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    setLoadingVision(true);
    setVisionResponse('');

    try {
      // Remove data:image/...;base64, prefix for OpenAI
      const base64Image = image.split(',')[1];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: 'Analiza esta imagen (factura, recibo o documento). Extrae el nombre del emisor, la fecha, el monto total y los items principales en un formato claro.' },
                { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
              ]
            }
          ],
          max_tokens: 500
        })
      });

      const data = await response.json();
      setVisionResponse(data.choices[0].message.content);
    } catch (error) {
      setVisionResponse('❌ Error al procesar imagen.');
    } finally {
      setLoadingVision(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ fontSize: '2.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Sparkles size={40} color="var(--accent-neon)" /> ASISTENTE IA
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Herramientas de inteligencia artificial para tu agencia.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* COLUMNA 1: CHAT LIBRE */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Bot size={20} color="var(--accent-neon)" />
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Chat de Ideas</h3>
          </div>
          <div className="card" style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
                <p>¿Qué propuesta armamos hoy?</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ 
                display: 'flex', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px',
                backgroundColor: m.role === 'assistant' ? 'var(--bg-dark)' : 'rgba(227, 255, 0, 0.05)',
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%', fontSize: '0.875rem'
              }}>
                {m.content}
              </div>
            ))}
            {loadingChat && <Loader2 className="animate-spin" size={20} />}
          </div>
          <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '0.5rem' }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Consultar a GPT..." style={{ flex: 1, padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }} />
            <button type="submit" disabled={loadingChat} className="btn-primary" style={{ padding: '0 1rem' }}>
              <Send size={18} />
            </button>
          </form>
        </div>

        {/* COLUMNA 2: PROCESAR DOCUMENTOS */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <FileText size={20} color="var(--accent-neon)" />
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Procesar Facturas</h3>
          </div>
          
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1.5rem', overflowY: 'auto' }}>
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{ 
                  flex: 1, border: '2px dashed var(--border-color)', borderRadius: '8px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.3s', gap: '1rem', color: 'var(--text-muted)'
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent-neon)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <Upload size={40} />
                <p>Haz clic para subir imagen o PDF</p>
                <span className="mono" style={{ fontSize: '0.75rem' }}>JPG, PNG suportados</span>
              </div>
            ) : (
              <div style={{ position: 'relative', width: '100%', maxHeight: '200px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'var(--bg-dark)' }} />
                <button 
                  onClick={() => setImage(null)} 
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.25rem', borderRadius: '50%' }}
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />

            <button 
              onClick={processImage} 
              disabled={!image || loadingVision} 
              className="btn-primary" 
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {loadingVision ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
              {loadingVision ? 'PROCESANDO...' : 'PROCESAR DOCUMENTO'}
            </button>

            {visionResponse && (
              <div style={{ 
                padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-color)',
                fontSize: '0.875rem', lineHeight: 1.6, whiteSpace: 'pre-wrap'
              }}>
                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-neon)', marginBottom: '0.5rem' }}>RESULTADO:</div>
                {visionResponse}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
