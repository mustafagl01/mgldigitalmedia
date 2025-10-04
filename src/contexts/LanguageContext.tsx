import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  tr: {
    // Header
    'header.title': 'MGL Digital AI',
    'header.login': 'Giriş / Kayıt',
    'header.logout': 'Çıkış Yap',
    'header.opportunities': 'Fırsatları Keşfet',
    'header.welcome': 'Hoş geldiniz',

    // Hero Section
    'hero.title': 'Stratejiyle Dönüşüm Sağlıyoruz.',
    'hero.subtitle': 'Reklam ve İş Süreçlerinizi AI Agent ile Otomatikleştirerek. Sadece "tıklama" değil, gerçek "sonuç" getiriyoruz.',
    'hero.cta.opportunities': 'AI ile Fırsatları Keşfet',
    'hero.cta.demos': 'Canlı Demoları Gör',

    // Benefits Section
    'benefits.title': 'Sadece Çalışmak Değil, Akıllı Çalışmak',
    'benefits.subtitle': 'Her gün aynı işleri tekrar tekrar yapmaktan yoruldunuz mu? İşte size zaman, para ve müşteri kazandıracak çözümler:',
    'benefits.time.title': 'Zaman Tasarrufu',
    'benefits.time.desc': 'Günde 3-4 saat manuel işten kurtulun',
    'benefits.sales.title': 'Satış Artışı',
    'benefits.sales.desc': 'Otomatik takip ile %40 daha fazla satış yakalayın',
    'benefits.error.title': 'Hata Azaltma',
    'benefits.error.desc': 'İnsan hatası sıfıra iner, her şey kusursuz çalışır',
    'benefits.satisfaction.title': 'Müşteri Memnuniyeti',
    'benefits.satisfaction.desc': '7/24 anında yanıt ile mutlu müşteriler yaratın',

    // Services Section
    'services.title': 'Tek Bir Merkez, Sınırsız Yetenek',
    'services.subtitle': 'Stratejiden tasarıma, reklamdan otomasyona, tüm dijital ihtiyaçlarınız için buradayız.',
    'services.ads.title': 'AI Destekli Reklam Yönetimi',
    'services.ads.desc': 'Meta & Google reklam kampanyalarınızı, sürekli öğrenen yapay zeka algoritmalarıyla yöneterek bütçenizi en verimli şekilde kullanıyoruz.',
    'services.ads.integration': 'Reklamdan gelen her potansiyel müşteriyi AI Chatbot veya Sesli Asistan ile anında karşılıyoruz.',
    'services.automation.title': 'AI Agent & Otomasyon Kurulumu',
    'services.automation.desc': 'WhatsApp, E-posta, Telefon ve web siteniz için 7/24 çalışan, randevu alan, bilgi veren ve veri toplayan akıllı asistanlar tasarlıyoruz.',
    'services.automation.integration': 'Kurduğumuz otomasyonları beslemek için en doğru müşteri adaylarını getiren reklam kampanyaları planlıyoruz.',
    'services.web.title': 'Dönüşüm Odaklı Web Tasarımı',
    'services.web.desc': 'Sadece güzel değil, aynı zamanda bir müşteri kazanma makinesi olarak çalışan modern ve hızlı web siteleri inşa ediyoruz.',
    'services.web.integration': 'Tasarladığımız her siteye, ziyaretçilerinizi müşteriye dönüştürecek interaktif Canlı Demo modülleri ve Chatbot\'lar entegre ediyoruz.',

    // Strategy Section
    'strategy.title': 'Başarı Tesadüf Değildir.',
    'strategy.subtitle': 'Her adımı ölçülebilir veriye dayanan, kanıtlanmış bir stratejiyle hareket ediyoruz.',
    
    // Strategy Accordion Items
    'strategy.automation.title': 'İş Süreçlerinizi Otomatikleştirin',
    'strategy.automation.content': 'Manuel görevleri akıllı sistemlere devredin. Müşteri takibi, randevu alma, e-posta pazarlama ve raporlama işlemlerini 7/24 çalışan AI asistanlar üstlensin. Ekibiniz stratejik işlere odaklanırken, rutin işler otomatik olarak yürüsün.',
    
    'strategy.optimization.title': 'Reklam Performansınızı Optimize Edin',
    'strategy.optimization.content': 'AI destekli algoritmaların sürekli olarak Meta ve Google reklamlarınızı analiz etmesi ve optimize etmesini sağlayın. Veriye dayalı kararlarla bütçenizin her kuruşunu en verimli şekilde kullanın ve ROAS değerlerinizi katlayın.',
    
    'strategy.engagement.title': 'Müşteri Etkileşimini Artırın',
    'strategy.engagement.content': 'Potansiyel müşterilerinizi hiç kaçırmayın. WhatsApp, e-posta ve telefon üzerinden 7/24 anında yanıt veren, randevu alabilen ve bilgi toplayan akıllı asistanlarla müşteri memnuniyetini ve dönüşüm oranlarını yükseltin.',
    
    'strategy.innovation.title': 'Rekabet Avantajı Yaratın',
    'strategy.innovation.content': 'Yapay zeka teknolojilerini erken benimseyen işletmeler pazarda öne geçiyor. Modern otomasyon çözümleriyle rakiplerinizden bir adım önde olun, müşteri deneyimini kişiselleştirin ve operasyonel verimliliği maksimuma çıkarın.',

    // Demos Section - MISSING KEYS ADDED!
    'demos.title': 'Anlatmıyoruz, Gösteriyoruz.',
    'demos.subtitle': 'Aşağıdaki demoları deneyin ve "acaba benim şu işim de otomatik olabilir mi?" diye düşünün:',
    'demos.whatsapp.title': 'Birebir Strateji Görüşmesi',
    'demos.whatsapp.desc': 'Otomasyon fikirlerinizi doğrudan kurucumuz Mustafa Bey ile görüşmek için WhatsApp üzerinden anında iletişime geçin.',
    'demos.email.title': 'Otomatik E-posta Dizisi',
    'demos.email.desc': 'Web sitenizdeki formu dolduran herkese anında kişiselleştirilmiş bir e-posta gönderin.',
    'demos.phone.title': 'AI Sizi Arasın',
    'demos.phone.desc': 'Numaranızı bırakın, AI sesli asistanımız sizi arayarak yeteneklerini sergilesin.',
    'demos.contact': 'İletişime Geç',
    'demos.live': 'Canlı Demo',
    'demos.data.title': 'Manuel Veri Aktarımı',
    'demos.data.desc': 'Excel\'den CRM\'e sürekli kopyala-yapıştır mı yapıyorsunuz? Bu süreci tamamen ortadan kaldırın.',
    'demos.reports.title': 'Haftalık Rapor Çilesi',
    'demos.reports.desc': 'Her hafta farklı platformlardan veri toplayıp rapor hazırlamak saatlerinizi mi alıyor?',
    'demos.onboarding.title': 'Yeni Çalışan Süreçleri',
    'demos.onboarding.desc': 'İşe yeni başlayanlara belgeleri tek tek mi veriyorsunuz? Tüm süreci tek tıkla otomatik başlatın.',

    // Choice Section - MISSING KEYS ADDED!
    'choice.title': 'İşletmenizi Bir Sonraki Seviyeye Nasıl Taşımak İstersiniz?',
    'choice.subtitle': 'Size en uygun çözümü bulmamız için lütfen mevcut önceliğinizi seçin.',
    'choice.automation.title': 'Manuel İşleri Otomatikleştirin',
    'choice.automation.desc': 'Tekrarlayan görevleri, raporlamayı ve veri girişini akıllı asistanlara devrederek ekibinizin gerçekten önemli işlere odaklanmasını sağlayın.',
    'choice.automation.cta': 'Verimliliği Seç',
    'choice.customers.title': 'Müşteri Akışını Hızlandırın',
    'choice.customers.desc': 'Mevcut reklam kampanyalarınızdan daha iyi sonuçlar alın. Yapay zeka destekli stratejilerle reklam harcamanızın geri dönüşünü (ROAS) katlayın.',
    'choice.customers.cta': 'Daha Fazla Müşteri',
    'choice.system.title': 'Uçtan Uca Büyüme Motoru Kurun',
    'choice.system.desc': 'Reklamlarla getirdiğimiz potansiyel müşterileri, AI asistanlarla 7/24 takip edip satışa hazır hale getiren kusursuz bir sistem inşa edelim.',
    'choice.system.cta': 'Tüm Hikayeyi Gör',

    // CTA Section
    'cta.title': 'Hazır mısınız? İşinizi Birlikte Dönüştürelim!',
    'cta.subtitle': 'Hangi manuel işlerinizin otomatikleştirilebileceğini ve reklam bütçenizi nasıl daha verimli kullanabileceğinizi öğrenmek için 2 dakikada size özel bir analiz sunalım.',
    'cta.analysis': 'Ücretsiz Otomasyon Analizi Al',
    'cta.products': 'Otomasyon Satın Al',

    // Auth
    'auth.login': 'Hesabınıza Giriş Yapın',
    'auth.signup': 'Hesap Oluşturun',
    'auth.email': 'E-posta Adresi',
    'auth.password': 'Şifre',
    'auth.confirmPassword': 'Şifre Tekrarı',
    'auth.loginButton': 'Giriş Yap',
    'auth.signupButton': 'Hesap Oluştur',
    'auth.switchToSignup': 'Kayıt Olun',
    'auth.switchToLogin': 'Giriş Yapın',
    'auth.forgotPassword': 'Şifremi Unuttum',

    // Chatbot
    'chatbot.title': 'AI Asistan',
    'chatbot.subtitle': 'Genellikle anında yanıt verir',
    'chatbot.placeholder': 'Mesajınızı yazın...',
    'chatbot.greeting': 'Merhaba! Size nasıl yardımcı olabilirim?',
    'chatbot.button': 'AI Chatbot\'u Deneyin',

    // Footer
    'footer.title': 'AI Otomasyon Ajansı - İşinizi Geleceğe Taşıyoruz',
    'footer.company': 'MGL DIGITAL MEDIA LTD',
    'footer.registered': 'Registered in England and Wales. Company Number: 16007414',
    'footer.office': 'Registered Office',
    'footer.address': '112 Bertram Road, Enfield, England, EN1 1LS',
    'footer.rights': '© 2024 MGL Digital Media LTD • Tüm Hakları Saklıdır',

    // Common
    'common.close': 'Kapat',
    'common.loading': 'Yükleniyor...',

    // Products
    'products.title': 'Ürünler',
    'products.subtitle': 'AI otomasyon çözümlerimizle işletmenizi dijital dönüşüme hazırlayın',
    'products.back': 'Ana Sayfaya Dön',
    'products.buy': 'Satın Al',
    'products.subscribe': 'Abone Ol',
    'products.feature.custom': 'Özel Tasarım ve Kurulum',
    'products.feature.setup': 'Profesyonel Kurulum ve Eğitim',
    'products.feature.support': '3 Ay Ücretsiz Teknik Destek',

    // Toast Messages
    'toast.checkout.error': 'Satın Alma Hatası',
    'toast.checkout.error.desc': 'Satın alma işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
    'toast.connection.error': 'Bağlantı Hatası',
    'toast.connection.error.desc': 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.',
    'toast.idea.success': 'Başarıyla Gönderildi!',
    'toast.idea.success.desc': 'Fikir analizi talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.',
    'toast.idea.error': 'Bir hata oluştu. Lütfen tekrar deneyin.',
    'toast.error': 'Hata',
  },
  en: {
    // Header
    'header.title': 'MGL Digital AI',
    'header.login': 'Login / Register',
    'header.logout': 'Logout',
    'header.opportunities': 'Discover Opportunities',
    'header.welcome': 'Welcome',

    // Hero Section
    'hero.title': 'We Drive Transformation Through Strategy.',
    'hero.subtitle': 'By automating your advertising and business processes with AI Agents. We bring real "results", not just "clicks".',
    'hero.cta.opportunities': 'Discover Opportunities with AI',
    'hero.cta.demos': 'See Live Demos',

    // Benefits Section
    'benefits.title': 'Not Just Working, But Working Smart',
    'benefits.subtitle': 'Tired of doing the same tasks over and over every day? Here are solutions that will save you time, money, and customers:',
    'benefits.time.title': 'Time Savings',
    'benefits.time.desc': 'Get rid of 3-4 hours of manual work per day',
    'benefits.sales.title': 'Sales Increase',
    'benefits.sales.desc': 'Capture 40% more sales with automatic follow-up',
    'benefits.error.title': 'Error Reduction',
    'benefits.error.desc': 'Human error drops to zero, everything works perfectly',
    'benefits.satisfaction.title': 'Customer Satisfaction',
    'benefits.satisfaction.desc': 'Create happy customers with 24/7 instant response',

    // Services Section
    'services.title': 'One Center, Unlimited Capability',
    'services.subtitle': 'From strategy to design, from advertising to automation, we are here for all your digital needs.',
    'services.ads.title': 'AI-Powered Advertising Management',
    'services.ads.desc': 'We manage your Meta & Google ad campaigns with continuously learning artificial intelligence algorithms, using your budget most efficiently.',
    'services.ads.integration': 'We instantly meet every potential customer from ads with AI Chatbot or Voice Assistant.',
    'services.automation.title': 'AI Agent & Automation Setup',
    'services.automation.desc': 'We design smart assistants that work 24/7 for WhatsApp, Email, Phone and your website, making appointments, providing information and collecting data.',
    'services.automation.integration': 'We plan ad campaigns that bring the right prospects to feed the automations we set up.',
    'services.web.title': 'Conversion-Focused Web Design',
    'services.web.desc': 'We build modern and fast websites that work not only beautifully, but also as a customer acquisition machine.',
    'services.web.integration': 'We integrate interactive Live Demo modules and Chatbots into every site we design to convert your visitors into customers.',

    // Strategy Section
    'strategy.title': 'Success Is Not Coincidence.',
    'strategy.subtitle': 'We act with a proven strategy based on measurable data at every step.',
    
    // Strategy Accordion Items
    'strategy.automation.title': 'Automate Your Business Processes',
    'strategy.automation.content': 'Delegate manual tasks to smart systems. Let AI assistants working 24/7 handle customer follow-up, appointment booking, email marketing and reporting. While your team focuses on strategic work, routine tasks run automatically.',
    
    'strategy.optimization.title': 'Optimize Your Ad Performance',
    'strategy.optimization.content': 'Enable AI-powered algorithms to continuously analyze and optimize your Meta and Google ads. Use every penny of your budget most efficiently with data-driven decisions and multiply your ROAS values.',
    
    'strategy.engagement.title': 'Increase Customer Engagement',
    'strategy.engagement.content': 'Never miss potential customers. Increase customer satisfaction and conversion rates with smart assistants that respond instantly 24/7, book appointments and collect information via WhatsApp, email and phone.',
    
    'strategy.innovation.title': 'Create Competitive Advantage',
    'strategy.innovation.content': 'Businesses that adopt artificial intelligence technologies early get ahead in the market. Stay one step ahead of your competitors with modern automation solutions, personalize customer experience and maximize operational efficiency.',

    // Demos Section - ENGLISH TRANSLATIONS
    'demos.title': 'We Don\'t Tell, We Show.',
    'demos.subtitle': 'Try the demos below and think "I wonder if my work can be automated too?":',
    'demos.whatsapp.title': 'One-on-One Strategy Meeting',
    'demos.whatsapp.desc': 'Contact our founder Mustafa directly via WhatsApp to discuss your automation ideas.',
    'demos.email.title': 'Automatic Email Series',
    'demos.email.desc': 'Send a personalized email instantly to everyone who fills out the form on your website.',
    'demos.phone.title': 'Let AI Call You',
    'demos.phone.desc': 'Leave your number, let our AI voice assistant call you and showcase its capabilities.',
    'demos.contact': 'Get in Touch',
    'demos.live': 'Live Demo',
    'demos.data.title': 'Manual Data Transfer',
    'demos.data.desc': 'Are you constantly copying and pasting from Excel to CRM? Completely eliminate this process.',
    'demos.reports.title': 'Weekly Report Struggle',
    'demos.reports.desc': 'Does collecting data from different platforms and preparing reports every week take hours?',
    'demos.onboarding.title': 'New Employee Processes',
    'demos.onboarding.desc': 'Are you giving documents to new hires one by one? Start the entire process automatically with one click.',

    // Choice Section - ENGLISH TRANSLATIONS
    'choice.title': 'How Would You Like to Take Your Business to the Next Level?',
    'choice.subtitle': 'Please select your current priority so we can find the most suitable solution for you.',
    'choice.automation.title': 'Automate Manual Tasks',
    'choice.automation.desc': 'Enable your team to focus on truly important tasks by delegating repetitive tasks, reporting and data entry to smart assistants.',
    'choice.automation.cta': 'Choose Efficiency',
    'choice.customers.title': 'Accelerate Customer Flow',
    'choice.customers.desc': 'Get better results from your existing advertising campaigns. Multiply your return on ad spend (ROAS) with AI-powered strategies.',
    'choice.customers.cta': 'More Customers',
    'choice.system.title': 'Build End-to-End Growth Engine',
    'choice.system.desc': 'Let\'s build a perfect system that follows up potential customers brought by ads with AI assistants 24/7 and makes them ready for sales.',
    'choice.system.cta': 'See the Full Story',

    // CTA Section
    'cta.title': 'Ready? Let\'s Transform Your Business Together!',
    'cta.subtitle': 'Let us provide you with a 2-minute personalized analysis to learn which of your manual processes can be automated and how you can use your advertising budget more efficiently.',
    'cta.analysis': 'Get Free Automation Analysis',
    'cta.products': 'Buy Automation',

    // Auth
    'auth.login': 'Login to Your Account',
    'auth.signup': 'Create Account',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.loginButton': 'Login',
    'auth.signupButton': 'Create Account',
    'auth.switchToSignup': 'Sign Up',
    'auth.switchToLogin': 'Login',
    'auth.forgotPassword': 'Forgot Password',

    // Chatbot
    'chatbot.title': 'AI Assistant',
    'chatbot.subtitle': 'Usually responds instantly',
    'chatbot.placeholder': 'Type your message...',
    'chatbot.greeting': 'Hello! How can I help you?',
    'chatbot.button': 'Try AI Chatbot',

    // Footer
    'footer.title': 'AI Automation Agency - Taking Your Business to the Future',
    'footer.company': 'MGL DIGITAL MEDIA LTD',
    'footer.registered': 'Registered in England and Wales. Company Number: 16007414',
    'footer.office': 'Registered Office',
    'footer.address': '112 Bertram Road, Enfield, England, EN1 1LS',
    'footer.rights': '© 2024 MGL Digital Media LTD • All Rights Reserved',

    // Common
    'common.close': 'Close',
    'common.loading': 'Loading...',

    // Products
    'products.title': 'Products',
    'products.subtitle': 'Prepare your business for digital transformation with our AI automation solutions',
    'products.back': 'Back to Home',
    'products.buy': 'Buy Now',
    'products.subscribe': 'Subscribe',
    'products.feature.custom': 'Custom Design and Setup',
    'products.feature.setup': 'Professional Installation and Training',
    'products.feature.support': '3 Months Free Technical Support',

    // Toast Messages
    'toast.checkout.error': 'Checkout Error',
    'toast.checkout.error.desc': 'An error occurred during the purchase process. Please try again.',
    'toast.connection.error': 'Connection Error',
    'toast.connection.error.desc': 'Could not connect to server. Please check your internet connection.',
    'toast.idea.success': 'Successfully Sent!',
    'toast.idea.success.desc': 'Your idea analysis request has been received. We will contact you shortly.',
    'toast.idea.error': 'An error occurred. Please try again.',
    'toast.error': 'Error',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'tr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};