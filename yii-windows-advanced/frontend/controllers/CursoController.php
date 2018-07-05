<?php

namespace frontend\controllers;

use Yii;
use common\models\Curso;
use common\models\User;
use common\models\CursoSearch;
use yii\helpers\ArrayHelper; 
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * CursoController implements the CRUD actions for Curso model.
 */
class CursoController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all Curso models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new CursoSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Curso model.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    
    public function actionUsers($id) { 
        try {
            $curso = $this->findModel($id);
            $alunos = User::find()->select(['username', 'email', 'status'])->where(['id_curso' =>  $id])->all(); 
            $alunosDataProvider = new \yii\data\ArrayDataProvider([
                'allModels' => $alunos, //retorna um vetor de objetos
                'sort' => [
                    'attributes' => ['username'],
                ],
                'pagination' => ['pageSize' => 10]
            ]); 

    //        var_dump($alunos);
    //        die();
            return $this->render('users_curso', [
                'alunosDataProvider' => $alunosDataProvider,
                'curso' => $curso

            ]);
        }
        catch(NotFoundHttpException $e) {
            echo "Página não encontrada =/"; 

        }
    }
    
     public function actionView($id)
    {
        try {
            
            $model = $this->findModel($id);
            $cont = "Informação disponível apenas para alunos do curso";
            //converte o objeto de Curso para um array associativo, já que o widget DetailView aceita um obj ou um array
            $displayCursoDataView = ArrayHelper::toArray($model, [
                'common\models\Curso' => [
                    'id',
                    'nome',
                    'sigla',
                    'descricao',
                ],
            ]);


            if(!Yii::$app->user->isGuest) {
                $user = User::findOne(Yii::$app->user->id); //acha o registro do usuário logado
                if($user->id_curso == $id)
                    $cont = User::find()->where('id_curso='. $id)->count();  
            }
            $qtdAlunos = ['alunos' => $cont];
            $displayCursoDataView = array_merge($displayCursoDataView, $qtdAlunos);

            return $this->render('view', [
                'displayCursoDataView' => $displayCursoDataView,
                'model' => $model,
            ]);
        }
        catch(NotFoundHttpException $e) {
            //quando não acha o curso de $id, o usuário é redirecionado para a página do curso de Ciência da computação
            return $this->render('view', [
                'displayCursoDataView' => Curso::findOne(['sigla' => 'IE08']),
                'model' => Curso::findOne(['sigla' => 'IE08']),
            ]); 
        }        
    }

    /**
     * Creates a new Curso model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Curso();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Curso model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->id]);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Curso model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Curso model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Curso the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Curso::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
