import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function ResetPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      toast({
        title: 'Ошибка',
        description: 'Неверная ссылка для сброса пароля',
        variant: 'destructive',
      });
    }
  }, [token, toast]);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return 'Пароль должен содержать минимум 8 символов';
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Пароль должен содержать заглавную букву';
    }
    if (!/[0-9]/.test(pwd)) {
      return 'Пароль должен содержать цифру';
    }
    return null;
  };

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { strength: 0, text: '', color: '' };
    if (pwd.length < 6) return { strength: 25, text: 'Слабый', color: 'bg-red-500' };
    if (pwd.length < 8) return { strength: 50, text: 'Средний', color: 'bg-yellow-500' };
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { strength: 75, text: 'Хороший', color: 'bg-blue-500' };
    return { strength: 100, text: 'Отличный', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validatePassword(password);
    if (validationError) {
      toast({
        title: 'Ошибка',
        description: validationError,
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: 'Пароль изменен',
        description: 'Теперь вы можете войти с новым паролем',
      });
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
        <div className="w-full max-w-md">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertCircle" size={24} className="text-destructive" />
              </div>
              <CardTitle className="text-center">Недействительная ссылка</CardTitle>
              <CardDescription className="text-center">
                Ссылка для сброса пароля недействительна или истекла
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                onClick={() => navigate('/forgot-password')}
              >
                <Icon name="RotateCw" size={18} className="mr-2" />
                Запросить новую ссылку
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/login')}
              >
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Вернуться ко входу
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Icon name="Zap" size={24} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TechReview
            </h1>
          </Link>
          <p className="text-muted-foreground">Создайте новый пароль</p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Lock" size={24} className="text-primary" />
              Новый пароль
            </CardTitle>
            <CardDescription>
              Придумайте надежный пароль для вашего аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Новый пароль</Label>
                <div className="relative">
                  <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} className="text-muted-foreground" />
                  </Button>
                </div>
                
                {password && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Надежность пароля:</span>
                      <span className={`font-medium ${
                        passwordStrength.strength === 100 ? 'text-green-500' :
                        passwordStrength.strength === 75 ? 'text-blue-500' :
                        passwordStrength.strength === 50 ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                  </div>
                )}

                <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                  <li className="flex items-center gap-2">
                    <Icon 
                      name={password.length >= 8 ? 'CheckCircle2' : 'Circle'} 
                      size={12} 
                      className={password.length >= 8 ? 'text-green-500' : ''} 
                    />
                    Минимум 8 символов
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon 
                      name={/[A-Z]/.test(password) ? 'CheckCircle2' : 'Circle'} 
                      size={12} 
                      className={/[A-Z]/.test(password) ? 'text-green-500' : ''} 
                    />
                    Заглавная буква
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon 
                      name={/[0-9]/.test(password) ? 'CheckCircle2' : 'Circle'} 
                      size={12} 
                      className={/[0-9]/.test(password) ? 'text-green-500' : ''} 
                    />
                    Цифра
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <div className="relative">
                  <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 z-10"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} className="text-muted-foreground" />
                  </Button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <Icon name="AlertCircle" size={12} />
                    Пароли не совпадают
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    Сохранить пароль
                    <Icon name="Check" size={18} className="ml-2" />
                  </>
                )}
              </Button>

              <div className="text-center pt-4 border-t border-border/50">
                <Link to="/login" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  <Icon name="ArrowLeft" size={14} />
                  Вернуться ко входу
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
