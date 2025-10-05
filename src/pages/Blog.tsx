import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('Все');

  const tags = ['Все', 'Новости', 'Обзоры', 'Гайды', 'Технологии', 'AI', 'Игры'];

  const blogPosts = [
    {
      id: 1,
      title: 'Революция в AI: GPT-5 и будущее искусственного интеллекта',
      excerpt: 'OpenAI анонсировала новую модель GPT-5 с невероятными возможностями. Разбираем все ключевые улучшения и что это значит для индустрии.',
      author: 'Алексей Иванов',
      date: '5 октября 2025',
      readTime: '8 мин',
      image: '/placeholder.svg',
      tags: ['AI', 'Новости', 'Технологии'],
      views: 1247,
    },
    {
      id: 2,
      title: 'Топ-5 ноутбуков для программистов в 2025 году',
      excerpt: 'Выбрали лучшие ноутбуки для разработки: от бюджетных решений до флагманов. Сравнение производительности, автономности и цены.',
      author: 'Мария Петрова',
      date: '3 октября 2025',
      readTime: '12 мин',
      image: '/placeholder.svg',
      tags: ['Обзоры', 'Гайды'],
      views: 2341,
    },
    {
      id: 3,
      title: 'Как выбрать игровой смартфон: полный гайд 2025',
      excerpt: 'Все о выборе смартфона для мобильного гейминга: частота обновления экрана, процессор, охлаждение и другие важные параметры.',
      author: 'Дмитрий Соколов',
      date: '1 октября 2025',
      readTime: '10 мин',
      image: '/placeholder.svg',
      tags: ['Гайды', 'Игры'],
      views: 1856,
    },
    {
      id: 4,
      title: 'Apple Vision Pro 2: что нового в VR-шлеме от Apple',
      excerpt: 'Второе поколение Vision Pro получило улучшенные экраны, новый чип M4 и сниженную цену. Детальный обзор всех изменений.',
      author: 'Елена Кузнецова',
      date: '28 сентября 2025',
      readTime: '15 мин',
      image: '/placeholder.svg',
      tags: ['Новости', 'Обзоры', 'Технологии'],
      views: 3102,
    },
    {
      id: 5,
      title: 'Квантовые компьютеры: прорыв Google в 2025',
      excerpt: 'Google достигла квантового превосходства нового уровня. Объясняем простыми словами, что это значит и когда технология станет массовой.',
      author: 'Алексей Иванов',
      date: '25 сентября 2025',
      readTime: '20 мин',
      image: '/placeholder.svg',
      tags: ['Технологии', 'Новости'],
      views: 4521,
    },
    {
      id: 6,
      title: '5G vs WiFi 7: что быстрее и надежнее в реальных условиях',
      excerpt: 'Провели масштабное тестирование скорости и стабильности 5G и WiFi 7 в разных сценариях использования. Результаты вас удивят.',
      author: 'Мария Петрова',
      date: '22 сентября 2025',
      readTime: '14 мин',
      image: '/placeholder.svg',
      tags: ['Технологии', 'Обзоры'],
      views: 2876,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag = selectedTag === 'Все' || post.tags.includes(selectedTag);
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background dark">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
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
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container relative mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Tech Блог
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Последние новости технологий, обзоры гаджетов и экспертные гайды
            </p>
            <div className="relative max-w-xl mx-auto">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Найти статью..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 h-12 bg-background/50 text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              onClick={() => setSelectedTag(tag)}
              className="hover-scale"
            >
              {tag}
            </Button>
          ))}
        </div>

        {searchQuery && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <p className="text-sm text-center">
              Найдено статей: <span className="font-bold text-primary">{filteredPosts.length}</span>
              {searchQuery && ` по запросу "${searchQuery}"`}
            </p>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-12 text-center">
              <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">Статьи не найдены</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `По запросу "${searchQuery}" ничего не найдено`
                  : 'Статьи в данной категории отсутствуют'}
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('Все');
                }}
                variant="outline"
              >
                Сбросить фильтры
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="group hover-scale cursor-pointer border-border/50 bg-card/50 backdrop-blur overflow-hidden animate-fade-in"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                  <Icon name="FileText" size={64} className="text-muted-foreground/30" />
                </div>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl leading-tight mb-2 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Eye" size={16} />
                        <span>{post.views}</span>
                      </div>
                      <span>{post.date}</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      Читать
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

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
                <li><a href="/" className="hover:text-primary transition-colors">Главная</a></li>
                <li><a href="/#ratings" className="hover:text-primary transition-colors">Рейтинги</a></li>
                <li><a href="/blog" className="hover:text-primary transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О проекте</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
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

export default Blog;
