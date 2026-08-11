import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { JournalArticle } from '../types';

interface JournalSectionProps {
  articles: JournalArticle[];
}

export const JournalSection: React.FC<JournalSectionProps> = ({ articles }) => {
  return (
    <section id="journal" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#8C6D3F] font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Nativo Colombia Editorial Journal</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury text-[#1C1917] uppercase tracking-wide font-normal">
            Historias de Estilo &amp; Cultura Elegante
          </h2>
        </div>

        {/* Articles — 1 col mobile, 3 col md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="group bg-[#F4EFEA] border border-[#E0D8CD] rounded-xs overflow-hidden hover:border-[#C5A880] transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="aspect-[16/10] overflow-hidden bg-[#1C1917]">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#8C7B6B] mb-2">
                    <span>{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif-luxury text-[#1C1917] group-hover:text-[#8C6D3F] transition-colors mb-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#6E645A] leading-relaxed font-light">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-4">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1917] group-hover:text-[#8C6D3F] inline-flex items-center gap-2 transition-colors">
                    <span>Leer Artículo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
