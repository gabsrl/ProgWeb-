<?php
    $usuario = "dante-as-root";
    $senha = "root123";

    $nome = $_POST['id_nome'];
    $email = $_POST['id_email'];
    $website = $_POST['id_website'];
    $mensagem = $_POST['id_mensagem'];

    try {     
        $conn = new PDO("mysql:host=localhost;dbname=Teste", $usuario, $senha); 
        $conn->exec("set names utf8");

        $queryInserirDados = $conn->prepare('INSERT INTO contato (id, nome, email, website, mensagem) VALUES (:id, :nome, :email, :website, :mensagem)');
        $queryInserirDados->bindValue(':id', 0);
        $queryInserirDados->bindValue(':nome', $nome);
        $queryInserirDados->bindValue(':email', $email);
        $queryInserirDados->bindValue(':website', $website);
        $queryInserirDados->bindValue(':mensagem', $mensagem);
        $queryInserirDados->execute();

        if($queryInserirDados->rowCount() == 1) { 
            echo '<h2>Parabéns você se cadastrou com sucesso!</h2>';
            echo '<h3>Seus Dados:</h3>';
            echo '<p>Nome: '.$nome.'</p>';
            echo '<p>Email: '.$email.'</p>';
            echo '<p>Website: '.$website.'</p>';
            echo '<p>Mensagem: '.$mensagem.'</p>';
            
        }
    }

    catch(PDOException $e) { 
        echo $e->getMessage();
    
    }


?>