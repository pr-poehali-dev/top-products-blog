import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Главная', href: '/' },
    { name: 'Рейтинги', href: '#ratings' },
    { name: 'Категории', href: '#categories' },
    { name: 'Обзоры', href: '#reviews' },
    { name: 'Блог', href: '/blog' },
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

  const filteredProducts = topProducts
    .filter((product) => {
      const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
      if (sortBy === 'price-desc') return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
      return 0;
    });

  return (
    <div className="min-h-screen bg-background dark">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
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
            <div className="flex items-center gap-3">
              <div className="relative hidden lg:block">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск гаджетов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 bg-background/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/profile')}
                className="hidden sm:flex rounded-full"
              >
                <Icon name="User" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Icon name="Menu" size={24} />
              </Button>
            </div>
          </div>
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
              <Button size="lg" className="hover-scale" onClick={() => navigate('/recommendations')}>
                <Icon name="Sparkles" size={20} className="mr-2" />
                Персональные рекомендации
              </Button>
              <Button size="lg" variant="outline" className="hover-scale">
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
              className={`hover-scale cursor-pointer border-border/50 backdrop-blur transition-all ${
                selectedCategory === category.name
                  ? 'bg-primary/20 border-primary'
                  : 'bg-card/50'
              }`}
              onClick={() => {
                setSelectedCategory(category.name);
                document.getElementById('ratings')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <CardContent className="p-6 text-center">
                <Icon name={category.icon as any} size={40} className="mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} товаров</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8" id="ratings">
          <h2 className="text-3xl font-bold mb-3">Топ гаджетов этого месяца</h2>
          <p className="text-muted-foreground">Лучшие устройства по версии наших экспертов</p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="relative lg:hidden">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск гаджетов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-background/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'Все' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('Все')}
                  className="hover-scale"
                >
                  Все товары
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.name)}
                    className="hover-scale"
                  >
                    <Icon name={category.icon as any} size={16} className="mr-2" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Icon name="ArrowUpDown" size={20} className="text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="rating">По рейтингу</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
              </select>
            </div>
          </div>
        </div>

        {searchQuery && (
          <div className="mb-4 p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-sm">
              Найдено товаров: <span className="font-bold text-primary">{filteredProducts.length}</span>
              {searchQuery && ` по запросу "${searchQuery}"`}
            </p>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <Card className="mb-16 bg-card/50 backdrop-blur">
            <CardContent className="p-12 text-center">
              <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? `По запросу "${searchQuery}" не найдено товаров`
                  : 'В данной категории товары отсутствуют'}
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Все');
                }}
                variant="outline"
              >
                Сбросить фильтры
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group relative cursor-pointer border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold shadow-lg backdrop-blur">
                    <Icon name="Trophy" size={14} className="mr-1" />
                    #{index + 1}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 backdrop-blur hover:bg-background/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Icon name="Heart" size={18} className="text-muted-foreground" />
                  </Button>
                </div>
                <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <Icon name="ImageIcon" size={64} className="text-muted-foreground/30 relative z-10" />
                </div>
              </div>
              
              <CardHeader className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                    <Icon name={
                      product.category === 'Смартфоны' ? 'Smartphone' :
                      product.category === 'Ноутбуки' ? 'Laptop' :
                      product.category === 'Наушники' ? 'Headphones' :
                      product.category === 'Умные часы' ? 'Watch' :
                      product.category === 'Камеры' ? 'Camera' : 'Cpu'
                    } size={12} className="mr-1" />
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1 ml-auto">
                    {renderStars(product.rating)}
                    <span className="text-sm font-bold ml-1 text-yellow-400">{product.rating}</span>
                  </div>
                </div>
                
                <CardTitle className="text-xl mb-3 leading-tight group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                
                <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                  {product.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs px-2 py-0.5 bg-secondary/50">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Цена</p>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {product.price}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    Подробнее
                    <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

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