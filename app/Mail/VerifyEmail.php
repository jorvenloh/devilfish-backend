<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Log;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected $user, $action_url;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $action_url)
    {
        $this->user = $user;
        $this->action_url = $action_url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.verifyEmail')->with(['user' => $this->user, 'action_url' => $this->action_url]);
    }
}
