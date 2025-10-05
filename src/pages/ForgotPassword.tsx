import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export default function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setEmailSent(true);
      toast({
        title: 'Письмо отправлено',
        description: 'Проверьте почту для восстановления пароля',
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleResend = () => {
    toast({
      title: 'Письмо отправлено повторно',
      description: 'Проверьте папку "Спам" если письма нет',
    });
  };

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
          <p className="text-muted-foreground">Восстановление пароля</p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="KeyRound" size={24} className="text-primary" />
              Забыли пароль?
            </CardTitle>
            <CardDescription>
              {emailSent 
                ? 'Мы отправили инструкции на вашу почту'
                : 'Введите email для восстановления доступа'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Мы отправим ссылку для сброса пароля на этот адрес
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      Отправить ссылку
                      <Icon name="Send" size={18} className="ml-2" />
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
            ) : (
              <div className="space-y-6">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Mail" size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Проверьте почту</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Мы отправили письмо на <span className="font-medium text-foreground">{email}</span> с инструкциями по восстановлению пароля
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Письмо действительно в течение 1 часа
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">Не получили письмо?</p>
                      <ul className="space-y-1 list-disc list-inside ml-1">
                        <li>Проверьте папку "Спам"</li>
                        <li>Убедитесь в правильности email</li>
                        <li>Подождите несколько минут</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleResend}
                  >
                    <Icon name="RotateCw" size={18} className="mr-2" />
                    Отправить повторно
                  </Button>

                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setEmailSent(false)}
                  >
                    <Icon name="Edit" size={18} className="mr-2" />
                    Изменить email
                  </Button>
                </div>

                <div className="text-center pt-4 border-t border-border/50">
                  <Link to="/login" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    <Icon name="ArrowLeft" size={14} />
                    Вернуться ко входу
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {!emailSent && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Вспомнили пароль?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Войти
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
