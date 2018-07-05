<?php

use yii\helpers\Html;
/* @var $this yii\web\View */

$this->title = 'SkieFree';
?>
<div class="site-index">

    <div class="jumbotron">
        <h1>Skifree</h1>
        <?= Html::img('@web/img/skifree-home.jpg', ['height' => '300']) ?>
        <p>SkiFree é um jogo de computador criado por Chris
        Pirih e lançado pela Microsoft em 1991. É um simples jogo em que o jogador controla um
        esquiador que deve evitar vários obstáculos de uma montanha e fugir do <strong>Abominável Monstro das Neves (Muhaha)</strong>.</p>
        <p>Jogo inicialmente implementado pelo Prof. David Braga (Icomp/UFAM)</p>
        <p>Continuação da implementação: Gabriel R. Lima<p>
        <p><a class="btn btn-lg btn-success" href="../web/index.php?r=jogo/index">Iniciar Jogo</a></p>
    </div>
</div>
