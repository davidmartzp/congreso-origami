<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
class Email2 extends Mailable
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
                    ->subject('Nuevo registro en Origami Bogotá 2023')
                    ->view('mails.email2')
                    ->with([
                        "obj" => $this->obj
                    ]);
                   
    }
}
