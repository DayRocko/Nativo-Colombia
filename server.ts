import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini AI Stylist & Concierge Endpoint
  app.post("/api/concierge", async (req, res) => {
    try {
      const { userPrompt, eventType, trouserColor, shoeLeather, waistSize, lang = 'es' } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      const systemInstruction = `
You are the Chief Personal Stylist & Concierge for "Aeterna Milano | Maison Correas", an elite Italian luxury house in Milan specializing in handcrafted woven elastic belts.
Your tone is sophisticated, sartorial, courteous, and inspiring — like a senior style director at Loro Piana or Brunello Cucinelli.

Analyze the user's input:
- Event: ${eventType || 'General Lifestyle'}
- Trouser/Suit Color: ${trouserColor || 'Not specified'}
- Shoe Leather Color: ${shoeLeather || 'Not specified'}
- Waist Size: ${waistSize || 'Not specified'}
- Question/Note: ${userPrompt || 'Seeking style recommendation'}
- Language requested: ${lang}

Provide a tailored luxury style recommendation covering:
1. Recommended Belt Model (e.g. "The Bianconero Monaco Edition", "Il Classico Intrecciato Cognac", "The Riviera Yachting Belt", or "Il Dirigente Executive").
2. Ideal Size Guidance (converting waist size to Italian belt cm, e.g. 34" waist -> 90 cm belt).
3. Complete Outfit Pairing Advice (shirt, blazer, trousers, shoes, watch strap/accessories).
4. Occasion/Vibe Notes (e.g. Monaco harbor sunset, Milanese business lounge, Taormina summer villa).

Respond in the language requested: ${lang}.
Keep it concise, elegant, and beautifully structured with bullet points.
`;

      if (apiKey) {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: userPrompt || `Inquire about belt recommendation for ${eventType || 'Italian elegance'}.`,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const recommendationText = response.text || "Disculpe, nuestro servicio de estilista no pudo generar una respuesta en este momento.";
        return res.json({ success: true, recommendation: recommendationText, source: 'gemini' });
      } else {
        // High quality fallback if API key is not configured
        const fallbackRecommendation = lang === 'en' 
          ? `### Maison Correas Personal Style Guidance\n\n**1. Recommended Model:** *The Bianconero Monaco Edition*\n- **Why:** Its navy, forest green & ivory weave pairs effortlessly with both casual linen and structured blazers.\n\n**2. Sizing Recommendation:**\n- For a ${waistSize || '34"'} waist, we recommend **90 cm / 34"** for a sleek, tailored tail fit.\n\n**3. Complete Outfit Pairing:**\n- **Trousers:** ${trouserColor || 'Navy blue'} tailored trousers or off-white linen pants.\n- **Shoes:** ${shoeLeather || 'Brown calfskin'} loafers or clean white calfskin sneakers.\n- **Blazer:** Unstructured beige or navy hopsack jacket with a open-collar white shirt.\n\n**4. Setting:** Perfect for an afternoon at Monaco Yacht Club or a rooftop aperitivo in Milan.`
          : `### Asesoría de Estilo Personal Aeterna Milano\n\n**1. Modelo Recomendado:** *The Bianconero Monaco Edition*\n- **Por qué:** Su tejido entrelazado tricolor (azul marino, verde bosque y crema) armoniza con pantalones sartoriales y bermudas de lino.\n\n**2. Recomendación de Talla:**\n- Para una cintura de ${waistSize || '34"'}, recomendamos la talla **90 cm / 34"** para una caída sobria e impecable.\n\n**3. Combinación de Atuendo:**\n- **Pantalón:** ${trouserColor || 'Azul marino'} o blanco marfil en lino o lana fría.\n- **Calzado:** Mocasines de gamuza en ${shoeLeather || 'tono coñac'} o calzado blanco de becerro.\n- **Saco:** Blazer desestructurado beige o beige tostado sobre camisa de lino abierta.\n\n**4. Ocasión:** Ideal para un atardecer en el puerto de Mónaco o un aperitivo en Milán.`;

        return res.json({ success: true, recommendation: fallbackRecommendation, source: 'stylist-engine' });
      }
    } catch (err: any) {
      console.error("Concierge API error:", err);
      res.status(500).json({ success: false, error: err?.message || 'Failed to generate styling advice' });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", brand: "Aeterna Milano | Maison Correas" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
