import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const userDevices = [
  { id: 1, name: 'iPhone 15 Pro', category: 'Смартфоны' },
  { id: 2, name: 'MacBook Pro M3', category: 'Ноутбуки' },
  { id: 3, name: 'AirPods Pro 2', category: 'Наушники' },
];

const recommendations = [
  {
    id: 101,
    name: 'Apple Watch Ultra 2',
    category: 'Умные часы',
    rating: 4.8,
    price: '₽84,990',
    description: 'Идеально сочетается с вашим iPhone для отслеживания активности',
    matchReason: 'Совместимо с iPhone 15 Pro',
    matchScore: 98,
    features: ['Titanium', 'GPS', '100м'],
    icon: 'Watch',
  },
  {
    id: 102,
    name: 'Magic Keyboard',
    category: 'Аксессуары',
    rating: 4.6,
    price: '₽12,990',
    description: 'Беспроводная клавиатура для продуктивной работы с MacBook',
    matchReason: 'Отлично работает с MacBook Pro M3',
    matchScore: 95,
    features: ['Bluetooth', 'Touch ID', 'Rechargeable'],
    icon: 'Keyboard',
  },
  {
    id: 103,
    name: 'LG UltraFine 5K',
    category: 'Мониторы',
    rating: 4.7,
    price: '₽149,990',
    description: '27" монитор с Thunderbolt для MacBook Pro',
    matchReason: 'Профессиональный дисплей для MacBook Pro M3',
    matchScore: 92,
    features: ['5K', 'Thunderbolt 3', '27"'],
    icon: 'Monitor',
  },
  {
    id: 104,
    name: 'AirTag 4-pack',
    category: 'Аксессуары',
    rating: 4.5,
    price: '₽11,990',
    description: 'Отслеживание вещей в экосистеме Apple',
    matchReason: 'Работает с вашим iPhone через Локатор',
    matchScore: 90,
    features: ['Find My', 'Водостойкий', 'CR2032'],
    icon: 'MapPin',
  },
  {
    id: 105,
    name: 'CalDigit TS4',
    category: 'Хабы',
    rating: 4.8,
    price: '₽39,990',
    description: 'Thunderbolt 4 док-станция для MacBook с 18 портами',
    matchReason: 'Расширьте возможности MacBook Pro M3',
    matchScore: 94,
    features: ['18 портов', 'Thunderbolt 4', '98W'],
    icon: 'Usb',
  },
  {
    id: 106,
    name: 'Anker PowerCore 20K',
    category: 'Зарядки',
    rating: 4.6,
    price: '₽5,990',
    description: 'Мощный повербанк для iPhone и AirPods',
    matchReason: 'Зарядит iPhone 15 Pro 4 раза',
    matchScore: 88,
    features: ['20000mAh', 'PD 3.0', 'USB-C'],
    icon: 'Battery',
  },
];

export default function Recommendations() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'high' | 'medium'>('all');

  const filteredRecommendations = recommendations.filter((rec) => {
    if (filter === 'all') return true;
    if (filter === 'high') return rec.matchScore >= 90;
    if (filter === 'medium') return rec.matchScore >= 85 && rec.matchScore < 90;
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}
      />
    ));
  };

  const getMatchColor = (score: number) => {
    if (score >= 95) return 'bg-green-500/10 text-green-600 border-green-500/20';
    if (score >= 90) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TechReview
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  <Icon name="Sparkles" size={32} className="text-primary" />
                  Персональные рекомендации
                </h1>
                <p className="text-muted-foreground">
                  На основе ваших устройств мы подобрали идеальные дополнения
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate('/profile')}>
                <Icon name="Settings" size={18} className="mr-2" />
                Мои устройства
              </Button>
            </div>

            {/* User Devices */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Package" size={18} className="text-primary" />
                  <h3 className="font-semibold">Ваши устройства:</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {userDevices.map((device) => (
                    <Badge key={device.id} variant="secondary" className="px-3 py-1">
                      {device.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Все рекомендации
              <Badge variant="secondary" className="ml-2">
                {recommendations.length}
              </Badge>
            </Button>
            <Button
              variant={filter === 'high' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('high')}
            >
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Лучшие совпадения
              <Badge variant="secondary" className="ml-2">
                {recommendations.filter((r) => r.matchScore >= 90).length}
              </Badge>
            </Button>
            <Button
              variant={filter === 'medium' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('medium')}
            >
              <Icon name="Check" size={16} className="mr-2" />
              Хорошие совпадения
            </Button>
          </div>

          {/* Recommendations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.map((product) => (
              <Card
                key={product.id}
                className="group relative cursor-pointer border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className={`${getMatchColor(product.matchScore)} border backdrop-blur font-bold`}>
                      <Icon name="Zap" size={12} className="mr-1" />
                      {product.matchScore}% совпадение
                    </Badge>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <Icon name={product.icon as any} size={64} className="text-muted-foreground/30 relative z-10" />
                  </div>
                </div>

                <CardHeader className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                      <Icon name={product.icon as any} size={12} className="mr-1" />
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

                  <CardDescription className="line-clamp-2 text-sm leading-relaxed mb-3">
                    {product.description}
                  </CardDescription>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-2 mb-3">
                    <p className="text-xs text-primary font-medium flex items-center gap-1">
                      <Icon name="Lightbulb" size={12} />
                      {product.matchReason}
                    </p>
                  </div>
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

          {/* Empty State */}
          {filteredRecommendations.length === 0 && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="SearchX" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Рекомендаций не найдено</h3>
                <p className="text-muted-foreground mb-4">
                  Попробуйте изменить фильтры или добавьте больше устройств
                </p>
                <Button onClick={() => navigate('/profile')}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить устройства
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <Card className="mt-8 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur">
            <CardContent className="p-8 text-center">
              <Icon name="Lightbulb" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Хотите больше рекомендаций?</h3>
              <p className="text-muted-foreground mb-6">
                Добавьте больше устройств в свой профиль для более точных предложений
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate('/profile')}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить устройства
                </Button>
                <Button variant="outline" onClick={() => navigate('/')}>
                  Смотреть все товары
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
