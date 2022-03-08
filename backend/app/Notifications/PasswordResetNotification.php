<?php

declare(strict_types=1);

namespace App\Notifications;

use function call_user_func;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;

class PasswordResetNotification extends ResetPassword
{
    use Queueable;

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        if (static::$toMailCallback) {
            return call_user_func(static::$toMailCallback, $notifiable, $this->token);
        }

        return (new MailMessage)
            ->subject('パスワードリセット通知')
            ->view('emails.resetPassword')
            ->action(
                'パスワードの変更',
                url(
                    '/user/password/reset',
                    [
                    'token' => $this->token,
                    ]
                )
            );
    }
}
