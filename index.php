<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//RU" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>Мемо - Весь Мир</title>
  <link href="css/main.css" rel="stylesheet">
  <script src="libs/jquery.js" type="text/javascript" ></script>
  <script src="libs/underscore.js" type="text/javascript" ></script>
  <script src="description.js" type="text/javascript" ></script>
  <script src="script.js" type="text/javascript" ></script>
</head>

<body>
  <header>
    <a href="<?php $_SERVER['PHP_SELF']; ?>" id="title">Мемо — Весь Мир</a>
  </header>

  <div class="modal" id="description">
    <div class="inner_modal">
      <img id="wonder_photo" alt="wonder"/>
      <h1></h1>
      <p></p>
      <div class="close">X</div>
    </div>
  </div>
  
  <div class="modal" id="end">
    <div class="inner_modal">
      <h1></h1>
      <h2></h2>
      <h2></h2>
      <h2></h2>
      <a href="<?php $_SERVER['PHP_SELF']; ?>" id="try_again"></a>
      <div class="close">X</div>
    </div>
  </div>
  
  <div id="container">
    <div id="stats_container">
      <h1>Статистика</h1>
      <div class="stat" id="attempts">Попыток: 0</div>
      <div class="stat" id="matches">Отгадано: 0</div>
    </div>
    <div id="card_container"></div>
  </div>

</body>
</html>