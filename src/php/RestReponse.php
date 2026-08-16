<?php 

class RestReponse
{
    public string $error ;
    public array $data ;

    public function __construct( array $data = [], $error = "" )
    {
        $this->error = $error ;
        $this->data = $data ;
    }

    public function send()
    {
        echo json_encode( $this ) ;
    }
}


?>