const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else luck = '吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/response", (req, res) => {
  const icon = req.query.icon;
  let message = '';
  
  if (icon === "1") {
    message = "おはよう🌞";
  } else if (icon === "2") {
    message = "こんばんは🌛";
  } else if (icon === "3") {
    message = "zzz......";
  } else {
    message = "......😴";
  }

  res.render('response', { message: message });
});

app.get("/rare", (req, res) => {
  const num = Math.floor( Math.random() * 100 + 1 );
  let rare = '';
  if (num==1) rare = '＊picked up SSR＊';
  else if(num<=5) rare = 'SSR';
  else if(num<=20) rare = 'SR';
  else rare = 'R';
  console.log( '獲得したカードは' + rare + 'です' );
  res.render( 'rare', {number:num, rare:rare} );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
