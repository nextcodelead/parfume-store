import React from 'react';
import Link from 'next/link';

interface SiteConfig {
  brandName: string;
  logo: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
}

const SITE_CONFIG: SiteConfig = {
  brandName: "Essence Luxe",
  logo: "🌸",
  tagline: "Откройте свой неповторимый аромат",
  contactEmail: "Rabota@mail.ru",
  contactPhone: "+79031535260"
};

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white pt-12 pb-6">
    <div className="max-w-7xl mx-auto px-6">
      {/* Верхняя часть футера */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        {/* Бренд */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">{SITE_CONFIG.logo}</span>
            <h3 className="text-xl font-bold">{SITE_CONFIG.brandName}</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{SITE_CONFIG.tagline}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-lg">Быстрые ссылки</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link href="/about-us" className="hover:text-white transition">О нас</Link></li>
            <li><Link href="/catalog" className="hover:text-white transition">Магазин</Link></li>
            <li><Link href="/new" className="hover:text-white transition">Новинки</Link></li>
            <li><Link href="/sale" className="hover:text-white transition">Скидки</Link></li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Свяжитесь с нами</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>{SITE_CONFIG.contactEmail}</li>
            <li>{SITE_CONFIG.contactPhone}</li>
            <li>Пн–Пт: 9:00 – 18:00</li>
          </ul>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
        <p className="text-center md:text-left">
          &copy; 2025 {SITE_CONFIG.brandName}. Все права защищены.
        </p>
        {/* <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Политика конфиденциальности</a>
          <a href="#" className="hover:text-white transition">Условия использования</a>
        </div> */}
      </div>
    </div>
  </footer>
);

export default Footer;
