<?php

namespace frontend\controllers;

use Yii;
use common\models\Jogada;

class JogoController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionRanking()
    {
        try {
            $jogadasConsulta = Jogada::find()->joinWith('user')->all(); 
            $jogadas = new \yii\data\ArrayDataProvider([
                'allModels' => $jogadasConsulta, //retorna um vetor de objetos
                'sort' => [
                    'attributes' => ['username'],
                ],
                'pagination' => ['pageSize' => 10]
            ]); 

            return $this->render('ranking', [
                'jogadas' => $jogadas,
            ]);
        }
        catch(NotFoundHttpException $e) {
            echo "Página não encontrada =/"; 

        }


    }

    public function actionSave()
    {
        if(!Yii::$app->user->isGuest) {
            $jogada = new Jogada();
            $jogada->id_user = Yii::$app->user->id;
            $pontuacao = intval($_POST['pontuacao']);
            $jogada->pontuacao = $pontuacao;
            if($jogada->save()) {
            return $this->render('save', [
                "pontuacao" => $pontuacao,

            ]);
            }
            else { 
                return $this->render('save', [
                    "pontuacao" => $jogada,
    
                ]);
    
            }
        }
            
        
    }

}
