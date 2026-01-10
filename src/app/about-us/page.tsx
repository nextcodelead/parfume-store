'use client';

import React, { useState, FormEvent } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Mail, Phone, Clock, Send, MessageSquare, User, CheckCircle, MessageCircle } from 'lucide-react';
import Button from '../components/Button';

const ContactsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Телефон',
      content: '+79031535260',
      link: 'tel:+79031535260',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'Rabota68@mail.ru',
      link: 'mailto:Rabota68@mail.ru',
      color: 'bg-rose-50 text-rose-600'
    },
    {
      icon: <Clock size={24} />,
      title: 'Часы работы',
      content: 'Пн–Пт: 9:00 – 18:00',
      link: '#',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  // Функция для перехода в Telegram
  const handleTelegramClick = () => {
    // Замените 'your_telegram_username' на реальный username или используйте bot ссылку
    // Пример: https://t.me/your_telegram_username или https://t.me/your_bot_name?start=chat
    const telegramUrl = 'https://t.me/your_telegram_username'; // TODO: Замените на реальную ссылку
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Свяжитесь с нами
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            У вас есть вопросы? Мы всегда рады помочь! Свяжитесь с нами любым удобным способом.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Контактная информация */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Контактная информация
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className={`${info.color} p-4 rounded-xl hover:shadow-md transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{info.title}</h3>
                        <p className="text-xs whitespace-pre-line leading-relaxed">
                          {info.content}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Telegram консультант виджет */}
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
              {/* Декоративные элементы */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl flex-shrink-0">
                    <MessageCircle size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      Чат с консультантом
                    </h2>
                    <p className="text-blue-100 text-sm sm:text-base">
                      Получите мгновенную помощь от нашего специалиста в Telegram
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-blue-50">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Быстрые ответы на ваши вопросы</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-50">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Консультация по выбору парфюмерии</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-50">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Помощь с оформлением заказа</span>
                  </div>
                </div>

                <button
                  onClick={handleTelegramClick}
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 group"
                >
                  <svg 
                    className="w-6 h-6 group-hover:scale-110 transition-transform" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span className="text-lg">Открыть Telegram</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <p className="text-blue-100 text-xs text-center mt-4 opacity-75">
                  Наш консультант обычно отвечает в течение 1-2 минут
                </p>
              </div>
            </div>
          </div>

          {/* Форма обратной связи */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-rose-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">
                Отправить сообщение
              </h2>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <CheckCircle className="text-green-600 mx-auto mb-3" size={48} />
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Спасибо за ваше сообщение!
                </h3>
                <p className="text-green-700">
                  Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                      placeholder="Иван Иванов"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Тема <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="О чем ваше сообщение?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
                    placeholder="Расскажите нам подробнее..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  leftIcon={<Send size={20} />}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Карта (заглушка) */}
        {/* <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gray-200 h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-semibold">Карта местоположения</p>
              <p className="text-sm mt-2">123 Luxury Street, New York, NY 10001</p>
            </div>
          </div>
        </div> */}
      </main>

      <Footer />
    </div>
  );
};

export default ContactsPage;

