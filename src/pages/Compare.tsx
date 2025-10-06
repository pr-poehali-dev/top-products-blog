import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const allProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Смартфоны',
    rating: 4.8,
    price: '119,990',
    specs: {
      processor: 'A17 Pro',
      ram: '8 GB',
      storage: '256 GB',
      display: '6.7" OLED 120Hz',
      camera: '48 MP + 12 MP + 12 MP',
      battery: '4422 mAh',
      weight: '221 г',
      os: 'iOS 17',
    },
    pros: ['Мощный процессор', 'Отличные камеры', 'Премиум дизайн'],
    cons: ['Высокая цена', 'Нет зарядки в комплекте'],
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Смартфоны',
    rating: 4.7,
    price: '109,990',
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12 GB',
      storage: '256 GB',
      display: '6.8" AMOLED 120Hz',
      camera: '200 MP + 50 MP + 12 MP + 10 MP',
      battery: '5000 mAh',
      weight: '232 г',
      os: 'Android 14',
    },
    pros: ['S Pen в комплекте', 'Большой экран', 'Мощная батарея'],
    cons: ['Тяжелый', 'Дорогие аксессуары'],
  },
  {
    id: 2,
    name: 'MacBook Pro 16" M3',
    category: 'Ноутбуки',
    rating: 4.9,
    price: '249,990',
    specs: {
      processor: 'Apple M3 Max',
      ram: '36 GB',
      storage: '1 TB SSD',
      display: '16.2" Retina XDR',
      graphics: 'M3 Max 40-core GPU',
      battery: 'До 22 часов',
      weight: '2.1 кг',
      os: 'macOS Sonoma',
    },
    pros: ['Невероятная производительность', 'Долгая автономность', 'Яркий дисплей'],
    cons: ['Очень дорогой', 'Тяжелый'],
  },
  {
    id: 8,
    name: 'Dell XPS 15',
    category: 'Ноутбуки',
    rating: 4.6,
    price: '189,990',
    specs: {
      processor: 'Intel Core i7-13700H',
      ram: '32 GB',
      storage: '1 TB SSD',
      display: '15.6" OLED 3.5K',
      graphics: 'NVIDIA RTX 4060',
      battery: 'До 13 часов',
      weight: '1.86 кг',
      os: 'Windows 11',
    },
    pros: ['OLED дисплей', 'Мощная видеокарта', 'Легче конкурентов'],
    cons: ['Нагревается', 'Средняя батарея'],
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    category: 'Наушники',
    rating: 4.7,
    price: '34,990',
    specs: {
      type: 'Накладные беспроводные',
      driver: '30 мм',
      frequency: '4 Hz - 40 kHz',
      battery: 'До 30 часов',
      anc: 'Активное',
      codec: 'LDAC, AAC, SBC',
      weight: '250 г',
      connectivity: 'Bluetooth 5.2',
    },
    pros: ['Лучшее шумоподавление', 'Комфортная посадка', 'Отличный звук'],
    cons: ['Пластиковый корпус', 'Дорогие'],
  },
  {
    id: 7,
    name: 'AirPods Max',
    category: 'Наушники',
    rating: 4.5,
    price: '64,990',
    specs: {
      type: 'Накладные беспроводные',
      driver: '40 мм',
      frequency: '10 Hz - 20 kHz',
      battery: 'До 20 часов',
      anc: 'Активное',
      codec: 'AAC',
      weight: '384 г',
      connectivity: 'Bluetooth 5.0',
    },
    pros: ['Премиум материалы', 'Пространственный звук', 'Интеграция с Apple'],
    cons: ['Очень дорогие', 'Тяжелые', 'Нет разъема 3.5мм'],
  },
];

export default function Compare() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [compareList, setCompareList] = useState<number[]>([1, 5]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const compareProducts = allProducts.filter((p) => compareList.includes(p.id));
  const availableProducts = allProducts.filter((p) => !compareList.includes(p.id));
  const filteredAvailable = availableProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (id: number) => {
    if (compareList.length >= 4) {
      toast({
        title: 'Максимум 4 товара',
        description: 'Для сравнения можно добавить не более 4 товаров',
        variant: 'destructive',
      });
      return;
    }
    setCompareList([...compareList, id]);
    setShowAddModal(false);
    setSearchQuery('');
    toast({
      title: 'Товар добавлен',
      description: 'Товар добавлен в сравнение',
    });
  };

  const handleRemoveProduct = (id: number) => {
    if (compareList.length <= 2) {
      toast({
        title: 'Минимум 2 товара',
        description: 'Для сравнения нужно минимум 2 товара',
        variant: 'destructive',
      });
      return;
    }
    setCompareList(compareList.filter((p) => p !== id));
    toast({
      title: 'Товар удален',
      description: 'Товар удален из сравнения',
    });
  };

  const allSpecs = Array.from(
    new Set(compareProducts.flatMap((p) => Object.keys(p.specs)))
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              TechReview
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 text-gray-900">
                  <Icon name="GitCompare" size={32} className="text-blue-500" />
                  Сравнение гаджетов
                </h1>
                <p className="text-gray-600">
                  Сравните характеристики и выберите лучший вариант
                </p>
              </div>
              <Button onClick={() => setShowAddModal(!showAddModal)}>
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить товар
              </Button>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
              <Card className="border-blue-200 bg-white shadow-lg mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900">Добавить товар для сравнения</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setShowAddModal(false)}>
                      <Icon name="X" size={18} />
                    </Button>
                  </div>
                  <CardDescription className="text-gray-600">
                    Выберите товар из каталога (максимум 4 товара)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Поиск товаров..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-2">
                      {filteredAvailable.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleAddProduct(product.id)}
                          className="text-left p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-medium text-sm text-gray-900">{product.name}</h4>
                            <Icon name="Plus" size={16} className="text-blue-500 flex-shrink-0" />
                          </div>
                          <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                            {product.category}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comparison Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name="GitCompare" size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{compareList.length}</p>
                      <p className="text-xs text-gray-600">Товаров</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon name="ListChecks" size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{allSpecs.length}</p>
                      <p className="text-xs text-gray-600">Параметров</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Icon name="TrendingUp" size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.max(...compareProducts.map((p) => p.rating))}
                      </p>
                      <p className="text-xs text-gray-600">Лучший рейтинг</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Icon name="DollarSign" size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.min(...compareProducts.map((p) => parseInt(p.price.replace(/\s/g, ''))))}₽
                      </p>
                      <p className="text-xs text-gray-600">Минимальная цена</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Product Headers */}
              <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
                <div className="h-full" />
                {compareProducts.map((product) => (
                  <Card key={product.id} className="border-gray-200 bg-white shadow-md relative overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7 z-10"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <Icon name="X" size={14} />
                    </Button>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-3">
                        <Icon name="ImageIcon" size={48} className="text-gray-300" />
                      </div>
                      <h3 className="font-bold mb-1 pr-6 text-gray-900">{product.name}</h3>
                      <Badge variant="outline" className="mb-2 text-xs border-gray-300 text-gray-700">
                        {product.category}
                      </Badge>
                      <div className="flex items-center gap-1 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-sm font-bold ml-1 text-gray-900">{product.rating}</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">₽{product.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Specifications */}
              <Card className="border-gray-200 bg-white shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-gray-900">Характеристики</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {allSpecs.map((spec, index) => (
                    <div key={spec}>
                      {index > 0 && <Separator />}
                      <div className="grid gap-4 p-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
                        <div className="font-medium capitalize text-sm text-gray-600">
                          {spec}
                        </div>
                        {compareProducts.map((product) => (
                          <div key={product.id} className="text-sm font-medium text-gray-900">
                            {product.specs[spec as keyof typeof product.specs] || '—'}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pros & Cons */}
              <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
                <div className="font-bold text-lg flex items-center text-gray-900">
                  Преимущества
                </div>
                {compareProducts.map((product) => (
                  <Card key={product.id} className="border-green-300 bg-green-50 shadow-md">
                    <CardContent className="p-4">
                      <ul className="space-y-2">
                        {product.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Icon name="CheckCircle2" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-800">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
                <div className="font-bold text-lg flex items-center text-gray-900">
                  Недостатки
                </div>
                {compareProducts.map((product) => (
                  <Card key={product.id} className="border-red-300 bg-red-50 shadow-md">
                    <CardContent className="p-4">
                      <ul className="space-y-2">
                        {product.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Icon name="XCircle" size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-800">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}>
            <div />
            {compareProducts.map((product) => (
              <Button
                key={product.id}
                className="w-full"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                Подробнее
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}