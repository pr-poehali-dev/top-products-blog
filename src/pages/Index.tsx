import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const navItems = [
    { name: 'Главная', href: '#' },
    { name: 'Рейтинги', href: '#ratings' },
    { name: 'Категории', href: '#categories' },
    { name: 'Обзоры', href: '#reviews' },
    { name: 'Блог', href: '#blog' },
    { name: 'О проекте', href: '#about' },
    { name: 'Контакты', href: '#contact' },
  ];

  const categories = [
    { name: 'Смартфоны', icon: 'Smartphone', count: 45 },
    { name: 'Ноутбуки', icon: 'Laptop', count: 32 },
    { name: 'Наушники', icon: 'Headphones', count: 28 },
    { name: 'Умные часы', icon: 'Watch', count: 19 },
    { name: 'Камеры', icon: 'Camera', count: 15 },
    { name: 'Игровое', icon: 'Gamepad2', count: 24 },
  ];

  const topProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      category: 'Смартфоны',
      rating: 4.8,
      price: '₽119,990',
      image: '/placeholder.svg',
      description: 'Флагманский смартфон с титановым корпусом и A17 Pro',
      features: ['A17 Pro', '256GB', '5G'],
    },
    {
      id: 2,
      name: 'MacBook Pro 16"',
      category: 'Ноутбуки',
      rating: 4.9,
      price: '₽249,990',
      image: '/placeholder.svg',
      description: 'Мощный ноутбук для профессионалов с M3 Max',
      features: ['M3 Max', '36GB RAM', 'Retina XDR'],
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      category: 'Наушники',
      rating: 4.7,
      price: '₽34,990',
      image: '/placeholder.svg',
      description: 'Премиальные наушники с шумоподавлением',
      features: ['ANC', '30ч батарея', 'Hi-Res'],
    },
    {
      id: 4,
      name: 'Apple Watch Ultra 2',
      category: 'Умные часы',
      rating: 4.8,
      price: '₽84,990',
      image: '/placeholder.svg',
      description: 'Экстремальные смарт-часы для спорта',
      features: ['Titanium', 'GPS', '100м'],
    },
    {
      id: 5,
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Смартфоны',
      rating: 4.7,
      price: '₽109,990',
      image: '/placeholder.svg',
      description: 'Флагман с S Pen и AI-функциями',
      features: ['Snapdragon 8 Gen 3', '200MP', 'S Pen'],
    },
    {
      id: 6,
      name: 'Sony A7 IV',
      category: 'Камеры',
      rating: 4.9,
      price: '₽229,990',
      image: '/placeholder.svg',
      description: 'Полнокадровая камера для фото и видео',
      features: ['33MP', '4K 60fps', 'IBIS'],
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: 'Подписка оформлена!',
        description: `Новые обзоры будут приходить на ${email}`,
      });
      setEmail('');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < Math.floor(rating) ? 'Star' : 'StarHalf'}
        size={16}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background dark">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Icon name="Cpu" size={32} className="text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TechTop10
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container relative mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              ТОП-10 Гаджетов 2025
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Экспертные обзоры и рейтинги новейших технологий
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="hover-scale">
                <Icon name="TrendingUp" size={20} className="mr-2" />
                Топ рейтинги
              </Button>
              <Button size="lg" variant="outline" className="hover-scale">
                <Icon name="BookOpen" size={20} className="mr-2" />
                Читать обзоры
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-3">Категории</h2>
          <p className="text-muted-foreground">Выберите интересующую категорию</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="hover-scale cursor-pointer border-border/50 bg-card/50 backdrop-blur"
            >
              <CardContent className="p-6 text-center">
                <Icon name={category.icon as any} size={40} className="mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} товаров</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12" id="ratings">
          <h2 className="text-3xl font-bold mb-3">Топ гаджетов этого месяца</h2>
          <p className="text-muted-foreground">Лучшие устройства по версии наших экспертов</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {topProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group hover-scale cursor-pointer border-border/50 bg-card/50 backdrop-blur overflow-hidden"
            >
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-primary text-primary-foreground font-bold">
                    #{index + 1}
                  </Badge>
                </div>
                <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                  <Icon name="ImageIcon" size={64} className="text-muted-foreground/30" />
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {product.category}
                    </Badge>
                    <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm font-semibold">{product.rating}</span>
                </div>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button size="sm" variant="ghost">
                    Подробнее
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <Icon name="Mail" size={48} className="mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-3">Подпишитесь на новости</h2>
              <p className="text-muted-foreground mb-6">
                Получайте свежие обзоры и рейтинги топовых гаджетов прямо на почту
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background/50"
                  required
                />
                <Button type="submit" size="lg" className="hover-scale">
                  <Icon name="Send" size={20} className="mr-2" />
                  Подписаться
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border/40 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Cpu" size={28} className="text-primary" />
                <span className="text-xl font-bold">TechTop10</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Экспертные обзоры и рейтинги новейших технологий и гаджетов
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Разделы</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Рейтинги</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Категории</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Обзоры</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О проекте</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Реклама</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Социальные сети</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="hover-scale">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="hover-scale">
                  <Icon name="Youtube" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="hover-scale">
                  <Icon name="Instagram" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 TechTop10. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
