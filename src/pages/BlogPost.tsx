import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const posts = {
    '1': {
      id: 1,
      title: 'Революция в AI: GPT-5 и будущее искусственного интеллекта',
      author: 'Алексей Иванов',
      date: '5 октября 2025',
      readTime: '8 мин',
      tags: ['AI', 'Новости', 'Технологии'],
      views: 1247,
      content: `
        <h2>Введение</h2>
        <p>OpenAI анонсировала новую революционную модель GPT-5, которая обещает стать настоящим прорывом в области искусственного интеллекта. Новая модель демонстрирует невероятные улучшения во всех аспектах работы.</p>
        
        <h2>Ключевые улучшения GPT-5</h2>
        <p>Новая версия получила значительные апгрейды:</p>
        <ul>
          <li><strong>Увеличенный контекст:</strong> Модель теперь может обрабатывать до 2 миллионов токенов в одном запросе</li>
          <li><strong>Мультимодальность:</strong> Нативная поддержка текста, изображений, видео и аудио</li>
          <li><strong>Точность:</strong> Снижение количества галлюцинаций на 95%</li>
          <li><strong>Скорость:</strong> Время отклика сокращено в 3 раза</li>
        </ul>

        <h2>Что это значит для индустрии</h2>
        <p>GPT-5 открывает новые горизонты для применения AI в различных сферах. От медицины до образования, от разработки ПО до креативных индустрий — возможности практически безграничны.</p>

        <h2>Заключение</h2>
        <p>Мы находимся на пороге новой эры искусственного интеллекта. GPT-5 — это не просто улучшенная версия, это качественный скачок в развитии технологии.</p>
      `,
    },
    '2': {
      id: 2,
      title: 'Топ-5 ноутбуков для программистов в 2025 году',
      author: 'Мария Петрова',
      date: '3 октября 2025',
      readTime: '12 мин',
      tags: ['Обзоры', 'Гайды'],
      views: 2341,
      content: `
        <h2>Критерии выбора ноутбука для разработки</h2>
        <p>Выбор ноутбука для программирования — задача ответственная. Нужно учитывать множество факторов: процессор, RAM, дисплей, клавиатуру и автономность.</p>

        <h2>5. Dell XPS 15 (2025)</h2>
        <p>Отличный баланс производительности и цены. Intel Core i9 13-го поколения, 32GB RAM и великолепный 4K OLED дисплей.</p>

        <h2>4. Lenovo ThinkPad X1 Carbon Gen 12</h2>
        <p>Легендарная серия ThinkPad продолжает радовать. Лучшая клавиатура на рынке, военный стандарт прочности и до 18 часов автономности.</p>

        <h2>3. ASUS ROG Zephyrus G16</h2>
        <p>Идеальный выбор для разработчиков игр и работы с графикой. RTX 5090, 64GB RAM и экран с частотой 240Hz.</p>

        <h2>2. Framework Laptop 16</h2>
        <p>Модульный и полностью ремонтопригодный ноутбук. Можете менять процессор, GPU и любые компоненты самостоятельно.</p>

        <h2>1. MacBook Pro 16" M4 Max</h2>
        <p>Абсолютный лидер. Невероятная производительность, 22 часа автономности, лучший дисплей и бесшумная работа.</p>
      `,
    },
  };

  const post = id ? posts[id as keyof typeof posts] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
          <Button onClick={() => navigate('/blog')}>Вернуться к блогу</Button>
        </div>
      </div>
    );
  }

  const relatedPosts = [
    { id: 3, title: 'Как выбрать игровой смартфон: полный гайд 2025', readTime: '10 мин' },
    { id: 4, title: 'Apple Vision Pro 2: что нового в VR-шлеме от Apple', readTime: '15 мин' },
    { id: 5, title: 'Квантовые компьютеры: прорыв Google в 2025', readTime: '20 мин' },
  ];

  return (
    <div className="min-h-screen bg-background dark">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/blog')}>
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="animate-fade-in">
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Icon name="User" size={18} />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={18} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={18} />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Eye" size={18} />
                <span>{post.views} просмотров</span>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <Button variant="outline" size="sm" className="hover-scale">
                <Icon name="Bookmark" size={16} className="mr-2" />
                Сохранить
              </Button>
              <Button variant="outline" size="sm" className="hover-scale">
                <Icon name="Share2" size={16} className="mr-2" />
                Поделиться
              </Button>
            </div>

            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-8">
              <Icon name="FileText" size={120} className="text-muted-foreground/30" />
            </div>
          </div>

          <Card className="bg-card/50 backdrop-blur mb-8">
            <CardContent className="p-8 prose prose-invert max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-foreground leading-relaxed"
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75',
                }}
              />
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mb-8 p-6 bg-card/50 backdrop-blur rounded-lg border border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="User" size={32} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg">{post.author}</p>
                <p className="text-sm text-muted-foreground">Tech-журналист и эксперт</p>
              </div>
            </div>
            <Button variant="outline" className="hover-scale">
              <Icon name="UserPlus" size={16} className="mr-2" />
              Подписаться
            </Button>
          </div>

          <Separator className="my-12" />

          <div>
            <h2 className="text-2xl font-bold mb-6">Читайте также</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Card
                  key={related.id}
                  className="hover-scale cursor-pointer border-border/50 bg-card/50 backdrop-blur"
                  onClick={() => navigate(`/blog/${related.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                      <Icon name="FileText" size={40} className="text-muted-foreground/30" />
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2 text-sm">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Clock" size={12} />
                      <span>{related.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
