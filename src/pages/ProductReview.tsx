import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const ProductReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Алексей М.',
      rating: 5,
      date: '2 дня назад',
      text: 'Отличный смартфон! Камера действительно на высоте, особенно ночная съемка. Титановый корпус придает премиальности.',
      helpful: 24,
    },
    {
      id: 2,
      author: 'Мария К.',
      rating: 4,
      date: '5 дней назад',
      text: 'Хорошее устройство, но цена кусается. Батарея держит весь день при активном использовании. Экран яркий и четкий.',
      helpful: 18,
    },
    {
      id: 3,
      author: 'Дмитрий П.',
      rating: 5,
      date: '1 неделю назад',
      text: 'Перешел с Android — не пожалел ни разу. Экосистема Apple работает безупречно. Производительность на максимуме.',
      helpful: 31,
    },
  ]);

  const products = {
    '1': {
      id: 1,
      name: 'iPhone 15 Pro Max',
      category: 'Смартфоны',
      rating: 4.8,
      price: '₽119,990',
      image: '/placeholder.svg',
      description: 'Флагманский смартфон с титановым корпусом и A17 Pro',
      features: ['A17 Pro', '256GB', '5G'],
      fullDescription: 'iPhone 15 Pro Max — это вершина инноваций Apple. Титановый корпус делает смартфон легче и прочнее, а процессор A17 Pro обеспечивает невероятную производительность для игр и профессиональных задач. Камера с 5-кратным оптическим зумом позволяет снимать на уровне профессиональной техники.',
      pros: [
        'Титановый корпус премиум-класса',
        'Мощнейший процессор A17 Pro',
        'Камера с 5x оптическим зумом',
        'Экран ProMotion 120 Гц',
        'USB-C разъем',
      ],
      cons: [
        'Высокая цена',
        'Нагрев при играх',
        'Маркий корпус',
      ],
      specs: {
        'Процессор': 'Apple A17 Pro',
        'Дисплей': '6.7" Super Retina XDR OLED',
        'Память': '256GB / 8GB RAM',
        'Камера': '48MP + 12MP + 12MP',
        'Батарея': '4422 mAh',
        'ОС': 'iOS 17',
      },
      ratings: {
        'Производительность': 98,
        'Камера': 95,
        'Дисплей': 97,
        'Батарея': 85,
        'Дизайн': 96,
      },
    },
    '2': {
      id: 2,
      name: 'MacBook Pro 16"',
      category: 'Ноутбуки',
      rating: 4.9,
      price: '₽249,990',
      image: '/placeholder.svg',
      description: 'Мощный ноутбук для профессионалов с M3 Max',
      features: ['M3 Max', '36GB RAM', 'Retina XDR'],
      fullDescription: 'MacBook Pro 16" с чипом M3 Max — абсолютная мощь для креативных профессионалов. Экран Liquid Retina XDR обеспечивает невероятную точность цветопередачи, а производительность позволяет работать с 8K видео в реальном времени.',
      pros: [
        'Невероятная производительность M3 Max',
        'Лучший дисплей на рынке',
        'До 22 часов автономности',
        'Тихая работа без вентиляторов',
        'Отличная клавиатура и трекпад',
      ],
      cons: [
        'Очень высокая цена',
        'Большой вес (2.1 кг)',
        'Ограниченные порты',
      ],
      specs: {
        'Процессор': 'Apple M3 Max',
        'Дисплей': '16.2" Liquid Retina XDR',
        'Память': '512GB SSD / 36GB RAM',
        'Графика': '40-core GPU',
        'Батарея': 'До 22 часов',
        'ОС': 'macOS Sonoma',
      },
      ratings: {
        'Производительность': 99,
        'Дисплей': 100,
        'Батарея': 92,
        'Портативность': 75,
        'Дизайн': 95,
      },
    },
    '3': {
      id: 3,
      name: 'Sony WH-1000XM5',
      category: 'Наушники',
      rating: 4.7,
      price: '₽34,990',
      image: '/placeholder.svg',
      description: 'Премиальные наушники с шумоподавлением',
      features: ['ANC', '30ч батарея', 'Hi-Res'],
      fullDescription: 'Sony WH-1000XM5 — эталон в мире беспроводных наушников. Лучшее в классе шумоподавление, превосходное качество звука Hi-Res Audio и невероятный комфорт для длительного прослушивания.',
      pros: [
        'Лучшее шумоподавление на рынке',
        'Отличное качество звука',
        'До 30 часов автономности',
        'Удобная посадка',
        'Multipoint подключение',
      ],
      cons: [
        'Не складываются компактно',
        'Нет защиты от воды',
        'Высокая цена',
      ],
      specs: {
        'Драйверы': '30мм динамические',
        'Шумоподавление': 'Активное ANC',
        'Батарея': 'До 30 часов',
        'Bluetooth': '5.2 с LDAC',
        'Вес': '250 грамм',
        'Поддержка': 'Hi-Res Audio, 360 Reality Audio',
      },
      ratings: {
        'Качество звука': 94,
        'Шумоподавление': 98,
        'Комфорт': 92,
        'Батарея': 95,
        'Дизайн': 88,
      },
    },
  };

  const product = id ? products[id as keyof typeof products] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Товар не найден</h1>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < Math.floor(rating) ? 'Star' : 'StarHalf'}
        size={20}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Cpu" size={32} className="text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TechTop10
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4 sticky top-24 shadow-md">
              <Icon name="ImageIcon" size={120} className="text-gray-300" />
            </div>
          </div>

          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-3 border-blue-500 text-blue-700 bg-blue-50">
              {product.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
              <span className="text-gray-600">на основе 247 отзывов</span>
            </div>

            <p className="text-xl text-gray-700 mb-6">{product.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {product.features.map((feature) => (
                <Badge key={feature} variant="secondary" className="text-sm px-3 py-1">
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-5xl font-bold text-primary">{product.price}</span>
            </div>

            <div className="flex gap-3 mb-8">
              <Button size="lg" className="flex-1 hover-scale">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Купить
              </Button>
              <Button size="lg" variant="outline" className="hover-scale" onClick={() => navigate('/compare')}>
                <Icon name="GitCompare" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="hover-scale">
                <Icon name="Heart" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="hover-scale">
                <Icon name="Share2" size={20} />
              </Button>
            </div>

            <Card className="bg-blue-50 border-blue-200 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Truck" size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">Бесплатная доставка</p>
                    <p className="text-sm text-gray-600">При заказе от ₽50,000</p>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center gap-3">
                  <Icon name="Shield" size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">Гарантия 2 года</p>
                    <p className="text-sm text-gray-600">Официальная гарантия производителя</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Детальный обзор</h2>
            
            <Card className="mb-8 bg-white border-gray-200 shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">О товаре</h3>
                <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-300 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="ThumbsUp" size={24} className="text-green-500" />
                    <h3 className="text-xl font-semibold text-gray-900">Преимущества</h3>
                  </div>
                  <ul className="space-y-2">
                    {product.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2">
                        <Icon name="Plus" size={16} className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-800">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="ThumbsDown" size={24} className="text-orange-500" />
                    <h3 className="text-xl font-semibold text-gray-900">Недостатки</h3>
                  </div>
                  <ul className="space-y-2">
                    {product.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2">
                        <Icon name="Minus" size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-800">{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border-gray-200 shadow-md mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Наша оценка</h3>
                <div className="space-y-4">
                  {Object.entries(product.ratings).map(([category, score]) => (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{category}</span>
                        <span className="text-primary font-semibold">{score}/100</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white border-gray-200 shadow-md sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Характеристики</h3>
                <div className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-sm text-gray-600">{key}</span>
                        <span className="text-sm font-medium text-right text-gray-900">{value}</span>
                      </div>
                      <Separator className="mt-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-3 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Отзывы пользователей</h2>
          
          <Card className="bg-white border-gray-200 shadow-md mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Оставьте свой отзыв</h3>
              
              <div className="mb-4">
                <p className="text-sm font-medium mb-2 text-gray-900">Ваша оценка</p>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setUserRating(i + 1)}
                      className="transition-transform hover:scale-110"
                    >
                      <Icon
                        name="Star"
                        size={28}
                        className={
                          i < userRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-600 hover:text-yellow-400'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                placeholder="Поделитесь своим опытом использования этого товара..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-4 min-h-[120px] bg-gray-50"
              />

              <Button
                onClick={() => {
                  if (comment && userRating > 0) {
                    const newComment = {
                      id: comments.length + 1,
                      author: 'Вы',
                      rating: userRating,
                      date: 'только что',
                      text: comment,
                      helpful: 0,
                    };
                    setComments([newComment, ...comments]);
                    setComment('');
                    setUserRating(0);
                    toast({
                      title: 'Отзыв опубликован!',
                      description: 'Спасибо за ваше мнение',
                    });
                  }
                }}
                disabled={!comment || userRating === 0}
                className="hover-scale"
              >
                <Icon name="Send" size={18} className="mr-2" />
                Опубликовать отзыв
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {comments.map((commentItem) => (
              <Card key={commentItem.id} className="bg-white border-gray-200 shadow-md animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {commentItem.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{commentItem.author}</p>
                          <p className="text-sm text-gray-600">{commentItem.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={16}
                              className={
                                i < commentItem.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-600'
                              }
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {commentItem.text}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                          <Icon name="ThumbsUp" size={16} className="mr-2" />
                          Полезно ({commentItem.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                          <Icon name="MessageCircle" size={16} className="mr-2" />
                          Ответить
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;