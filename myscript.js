$(function() {
  var canvas = document.getElementById('mycanvas');
  if (!canvas || !canvas.getContext) return false;
  var ctx = canvas.getContext('2d');
  
  var borderWidth=10,
      isDrawing=false,
      objectWidth=30,
      objectHeight=30,
      places=[];
  
  $('#mycanvas').mousedown(function(e) {
    // クリック位置を取得
    var startX = e.pageX - $(this).offset().left - borderWidth;
    var startY = e.pageY - $(this).offset().top - borderWidth;
    
    // オブジェクト位置を設定
    var x = Math.floor(startX - (objectWidth / 2));
    var y = Math.floor(startY - (objectHeight / 2));
    
    // オブジェクト位置を保持
    places.push(x+','+y);
    
    // オブジェクトをキャンバスに配置
    ctx.fillStyle='#333';
    ctx.fillRect(x,y,objectWidth,objectHeight);
    
  })
  .mousemove(function(e) {
    /*
    if (!isDrawing) return;
    x = e.pageX - $(this).offset().left - borderWidth;
    y = e.pageY - $(this).offset().top - borderWidth;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(x,y);
    ctx.stroke();
    startX=x;
    startY=y;
    */
  })
  .mouseup(function() {
  })
  .mouseleave(function() {
  });
  
  $('#move').click(function(e) {
    if (places.length==0) return;
    
    // キャンバスの状態を保存
    ctx.save();
    
    // 移動用オブジェクトを設定
    //ctx.scale(0.8,0.8);
    ctx.fillStyle='rgba(255,0,0,0.5)';
    
    // ループを使ったオブジェクトの移動
    var x, y, nextX, nextY, prevX, prevY;
    
    // ループ関数の定義
    var loop = function() {
      setTimeout(function() {
        if (x == nextX && y == nextY) return;
        
        // 直前の移動用オブジェクトをクリア
        ctx.clearRect(prevX,prevY,objectWidth,objectHeight);
        
        // 移動用オブジェクトを配置
        ctx.fillRect(x,y,objectWidth,objectHeight);
        
        // 移動位置を保存
        prevX = x;
        prevY = y;
        
        // 移動位置を更新
        if (x < nextX) x++;
        if (y < nextY) y++;
      }, 100);
    };
    
    for (var i = 0; i < places.length; i++) {
      // 出発位置を取得
      x = getPlaceX(i);
      y = getPlaceY(i);
      if (x == false || y == false) return;
      
      // 移動先の位置を取得
      nextX = getPlaceX(i+1);
      nextY = getPlaceY(i+1);
      if (nextX == false || nextY == false) return;
      
      loop();
    }
    
    function getPlaceX(index) {
      if (places.length == index) return false;
      var place = places[index].split(',');
      if (place.length==2) {
        return place[0];
      } else {
        return false;
      }
    }
    
    function getPlaceY(index) {
      if (places.length == index) return false;
      var place = places[index].split(',');
      if (place.length==2) {
        return place[1];
      } else {
        return false;
      }
    }
  });
  
  $('#show').click(function(e) {
    for (var i = 0; i < places.length; i++) {
      console.log(i+':'+places[i]);
    }
  });
  
  $('#clear').click(function(e) {
    places=[];
  });
});

function draw() {
  var canvas = document.getElementById('mycanvas');
  if (!canvas || !canvas.getContext) return false;
  var ctx = canvas.getContext('2d');
  
  //ctx.strokeStyle='red';
  //ctx.strokeStyle='#ff0000';
  //ctx.strokeStyle='rgb(255,0,0)';
  ctx.strokeStyle='rgba(255,0,0,0.5)';
  ctx.lineWidth=15;
  //ctx.lineJoin='round';
  //ctx.lineJoin='bevel';
  //ctx.lineJoin='miter';
  
  ctx.fillStyle='rgba(255,0,0,0.5)';
  
  ctx.strokeRect(10,10,50,50);
  ctx.fillRect(100,10,50,50);
  
  //console.log(ctx);
}
