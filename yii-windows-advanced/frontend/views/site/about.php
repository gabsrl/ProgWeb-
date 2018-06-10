<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Esta é a página sobre do Jogo SkieFree que foi implementado em JavaScript no Trabalho Prático 1. Agora,
    nessa segunda parte do trabalho será implementada a parte que lida com os scores dos jogadores.</p>
    <p>Dia e hora atual: <?=$data ?></p>
    
    <code><?= __FILE__ ?></code>
</div>
