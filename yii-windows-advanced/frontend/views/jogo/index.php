<?php 
use yii\helpers\Html;

$this->title = "Play Skiefree";
$this->registerCssFile("/yii-windows-advanced/frontend/assets/Skiefree/css/estilos.css");
$this->registerJsFile("/yii-windows-advanced/frontend/assets/Skiefree/js/skifree.js", ['position' => $this::POS_END]);
$this->registerJsFile("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js");

?>

	<div id="container">

   		<div id="montanha">
      	<div id="skier"></div>
        <div id="abominavel-monstro-das-neves"></div> 
   		</div>

  		<div id="painel">
  			<p class="fonte">Metros percorridos: <span id="metros"></span></p>
  			<p class="fonte">Vidas: <span id="vidas"></span></p>
  		</div>

  	</div>

