<?php
    if($_POST['nome'] == 'demo' && $_POST['senha'] == 'demo') { 
        session_start(); //inicia uma sessão php
        if(!isset($_SESSION['start'])) { 
            $_SESSION['start'] = date('H:i');
            echo 'Sessão inicializada <br>';
        }
        else {
            echo 'Você está conectado desde ' . $_SESSION['start'];
        }
        header('Location: contato.html');

    }
    else 
    echo 'Senha incorreta!'
?>
