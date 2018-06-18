<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $username
 * @property string $auth_key
 * @property string $password_hash
 * @property string $password_reset_token
 * @property string $email
 * @property int $id_curso
 * @property int $status
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Jogada[] $jogadas
 * @property Curso $curso
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['username', 'auth_key', 'password_hash', 'email', 'id_curso'], 'required','message' => 'Este campo é obrigatório.'],
            [['id_curso', 'status'], 'integer', 'message' => 'Este campo só aceita valores inteiros.'],
            [['username', 'password_hash', 'password_reset_token', 'email'], 'string', 'max' => 255],
            [['auth_key'], 'string', 'max' => 32],
            [['username'], 'unique' ,'message' => 'O nome escolhido já está em uso.'],
            [['email'], 'email', 'message'=> 'O email informado não é válido.'],
            [['email'], 'unique', 'message'=> 'O email informado já está em uso.'],
            [['password_reset_token'], 'unique'],
            [['id_curso'], 'exist', 'skipOnError' => true, 'targetClass' => Curso::className(), 'targetAttribute' => ['id_curso' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Nome de usuário',
            'auth_key' => 'Senha',
            'password_hash' => 'Password Hash',
            'password_reset_token' => 'Password Reset Token',
            'email' => 'Email',
            'id_curso' => 'Curso',
            'status' => 'Status',
            'created_at' => 'Adicionado em',
            'updated_at' => 'Atualizado em',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getJogadas()
    {
        return $this->hasMany(Jogada::className(), ['id_user' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCurso()
    {
        return $this->hasOne(Curso::className(), ['id' => 'id_curso']);
    }

    public function beforeSave($insert) {
        if(!$this->getIsNewRecord())
            $this->updated_at = date('Y-m-d H:i:s'); 
        return parent::beforeSave($insert);

    }

    


}
