<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model common\models\Curso */
//arquivo css  que sobre escreve o estilo da tag th. Para tal utiliza a flag !important
$this->registerCssFile('/yii-windows-advanced/frontend/assets/css/th_txt-align.css'); 
$this->title = $model->nome;
$this->params['breadcrumbs'][] = ['label' => 'Cursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="curso-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>
    <?= DetailView::widget([
        'model' => $displayCursoDataView,
        'attributes' => [
//            'id',
            'nome',
            'sigla',
            'descricao:ntext',
            'alunos',
        ],

    ]); ?>

</div>
