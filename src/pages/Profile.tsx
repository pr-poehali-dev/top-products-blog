import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const availableDevices = [
  { id: 1, name: 'iPhone 15 Pro', category: 'Смартфоны', icon: 'Smartphone' },
  { id: 2, name: 'MacBook Pro M3', category: 'Ноутбуки', icon: 'Laptop' },
  { id: 3, name: 'AirPods Pro 2', category: 'Наушники', icon: 'Headphones' },
  { id: 4, name: 'Apple Watch Ultra 2', category: 'Умные часы', icon: 'Watch' },
  { id: 5, name: 'iPad Pro 12.9', category: 'Планшеты', icon: 'Tablet' },
  { id: 6, name: 'Samsung Galaxy S24', category: 'Смартфоны', icon: 'Smartphone' },
  { id: 7, name: 'Sony WH-1000XM5', category: 'Наушники', icon: 'Headphones' },
  { id: 8, name: 'Dell XPS 15', category: 'Ноутбуки', icon: 'Laptop' },
  { id: 9, name: 'Canon EOS R5', category: 'Камеры', icon: 'Camera' },
  { id: 10, name: 'PlayStation 5', category: 'Игровые консоли', icon: 'Gamepad2' },
  { id: 11, name: 'Meta Quest 3', category: 'VR/AR', icon: 'Glasses' },
  { id: 12, name: 'DJI Mavic 3', category: 'Дроны', icon: 'Plane' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'devices' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Александр Иванов',
    email: 'alex@example.com',
    bio: 'Технологический энтузиаст, люблю тестировать новые гаджеты и делиться впечатлениями',
    avatar: '',
  });

  const [myDevices, setMyDevices] = useState<number[]>([1, 2, 3]);
  const [searchDevice, setSearchDevice] = useState('');

  const filteredDevices = availableDevices.filter(device =>
    device.name.toLowerCase().includes(searchDevice.toLowerCase()) ||
    device.category.toLowerCase().includes(searchDevice.toLowerCase())
  );

  const handleToggleDevice = (deviceId: number) => {
    setMyDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
    
    const device = availableDevices.find(d => d.id === deviceId);
    toast({
      title: myDevices.includes(deviceId) ? 'Устройство удалено' : 'Устройство добавлено',
      description: `${device?.name} ${myDevices.includes(deviceId) ? 'убрано из' : 'добавлено в'} вашу коллекцию`,
    });
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast({
        title: 'Профиль обновлен',
        description: 'Ваши данные успешно сохранены',
      });
    }, 1000);
  };

  const handleLogout = () => {
    toast({
      title: 'Выход выполнен',
      description: 'До скорой встречи!',
    });
    setTimeout(() => navigate('/'), 500);
  };

  const userDevices = availableDevices.filter(d => myDevices.includes(d.id));

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
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <Icon name="LogOut" size={18} className="mr-2" />
            Выход
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="mb-8">
            <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                    <p className="text-muted-foreground mb-3">{profile.email}</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge variant="secondary">
                        <Icon name="Package" size={14} className="mr-1" />
                        {myDevices.length} устройств
                      </Badge>
                      <Badge variant="secondary">
                        <Icon name="Star" size={14} className="mr-1" />
                        Эксперт
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button
              variant={activeTab === 'profile' ? 'default' : 'outline'}
              onClick={() => setActiveTab('profile')}
              className="whitespace-nowrap"
            >
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
            <Button
              variant={activeTab === 'devices' ? 'default' : 'outline'}
              onClick={() => setActiveTab('devices')}
              className="whitespace-nowrap"
            >
              <Icon name="Smartphone" size={18} className="mr-2" />
              Мои устройства
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'default' : 'outline'}
              onClick={() => setActiveTab('settings')}
              className="whitespace-nowrap"
            >
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </Button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Информация о профиле</CardTitle>
                    <CardDescription>Управляйте вашими личными данными</CardDescription>
                  </div>
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Icon name="Edit" size={16} className="mr-2" />
                      Редактировать
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">О себе</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      placeholder="Расскажите о себе и ваших интересах"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4 border-t border-border/50">
                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                          Сохранение...
                        </>
                      ) : (
                        <>
                          <Icon name="Check" size={18} className="mr-2" />
                          Сохранить
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      <Icon name="X" size={18} className="mr-2" />
                      Отмена
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Devices Tab */}
          {activeTab === 'devices' && (
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Мои устройства</CardTitle>
                  <CardDescription>
                    Добавьте свои гаджеты, чтобы получать персональные рекомендации
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userDevices.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Package" size={32} className="text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Вы еще не добавили ни одного устройства
                      </p>
                      <Button variant="outline" onClick={() => setActiveTab('devices')}>
                        Добавить устройство
                      </Button>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userDevices.map((device) => (
                        <div
                          key={device.id}
                          className="group relative bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50 rounded-lg p-4 hover:shadow-lg hover:shadow-primary/10 transition-all"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleToggleDevice(device.id)}
                          >
                            <Icon name="Trash2" size={14} className="text-destructive" />
                          </Button>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon name={device.icon as any} size={20} className="text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium mb-1 truncate">{device.name}</h4>
                              <p className="text-xs text-muted-foreground">{device.category}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Добавить устройство</CardTitle>
                  <CardDescription>Выберите гаджеты из нашего каталога</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Поиск устройств..."
                        value={searchDevice}
                        onChange={(e) => setSearchDevice(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <Separator />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
                      {filteredDevices.map((device) => {
                        const isAdded = myDevices.includes(device.id);
                        return (
                          <button
                            key={device.id}
                            onClick={() => handleToggleDevice(device.id)}
                            className={`text-left p-3 rounded-lg border transition-all ${
                              isAdded
                                ? 'bg-primary/10 border-primary/50 hover:bg-primary/15'
                                : 'bg-muted/30 border-border/50 hover:bg-muted/50'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                isAdded ? 'bg-primary/20' : 'bg-muted'
                              }`}>
                                <Icon name={device.icon as any} size={16} className={isAdded ? 'text-primary' : 'text-muted-foreground'} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-medium text-sm truncate">{device.name}</h4>
                                  {isAdded && (
                                    <Icon name="Check" size={16} className="text-primary flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">{device.category}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Настройки аккаунта</CardTitle>
                <CardDescription>Управление безопасностью и предпочтениями</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium mb-1">Изменить пароль</h4>
                      <p className="text-sm text-muted-foreground">
                        Обновите пароль для вашего аккаунта
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/reset-password')}>
                      <Icon name="Lock" size={16} className="mr-2" />
                      Изменить
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-medium mb-1">Email уведомления</h4>
                      <p className="text-sm text-muted-foreground">
                        Получайте новости о гаджетах на почту
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Включено
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div>
                      <h4 className="font-medium text-destructive mb-1">Удалить аккаунт</h4>
                      <p className="text-sm text-muted-foreground">
                        Безвозвратное удаление всех данных
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Удалить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
