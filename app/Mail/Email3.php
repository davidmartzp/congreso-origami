<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
class Email3 extends Mailable
{
    use Queueable, SerializesModels;

    /**
* The demo object instance.
*
* @var Demo
*/
public $obj;

    /**
* Create a new message instance.
*
* @return void
*/
    public function __construct($obj)
    {
        $this->obj = $obj;
    }

    /**
* Build the message.
*
* @return $this
*/
    public function build()
    {
        return $this->from('inscripciones@origamibogota.com')
                    ->subject('Este es tú número de participante')
                    ->view('mails.email3')
                    ->with([
                        "obj" => $this->obj
                    ]);
    }
}
