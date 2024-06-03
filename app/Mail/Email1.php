<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
class Email1 extends Mailable
{
    use Queueable, SerializesModels;

    /**
* The demo object instance.
*
* @var Demo
*/
    public $demo;

    /**
* Create a new message instance.
*
* @return void
*/
    public function __construct($demo)
    {
        $this->demo = $demo;
    }

    /**
* Build the message.
*
* @return $this
*/
    public function build()
    {
        return $this->from('inscripciones@origamibogota.com')
                    ->subject('Te damos la bienvenida!')
                    ->view('mails.email1');
    }
}
