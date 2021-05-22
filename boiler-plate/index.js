const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

//application/x-www-form-urlencoded의 형태로 된걸 가져올 수 있게 해줌
app.use(
  bodyParser.urlencoded({
    extended: true,
    // bodyParser가 클라이언트에서 오는 정보를, 서버에서 분석해서 가져올 수 있게 하는 거라고 했는데,
  })
);

//application/json 형태의 파일을 가져올 수 있게 해줌
app.use(bodyParser.json());

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(
    config.mongoURI,
    // 현재 ID와 비밀번호가 공개된 상태.
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello world!"));

app.post("/register", (req, res) => {
  // 클라이언트에서 보내주는 이름과 이메일, PW 등 정보들을 client에서 가져오면,
  // 그것들을 DB에 넣어준다.

  const user = new User(req.body);
  // request의 id, 비번등이 들어가 있는 곳이 req.body임
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    // 에러가 있으면 success를 false로 바꾸고 에러를 같이 json 형태로 출력함
    return res.status(200).json({
      // 에러가 없으면 문제없다는 200 상태코드, 그리고 success: true를 json으로 출력
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Mongoose: MongoDB를 편하게 사용하게 해줌

// body-parser dependency; body 데이터를 분석해서(parse) req.body로 출력해주는 것

// nodemon: 서버 껐다키지않아도 바뀌게. --save-dev. -dev를 붙이면, 로컬에서 할 때만 사용하겠다는 뜻이다.
// 시작할 때 nodemon으로 시작하기 위해 script를 하나 더 만듦
// package.json에서 "backend": "nodemon index.js"를 설정해준 뒤
// npm run backend로 하게 되면, 서버를 껐다켜지 않아도 새로고침만하면 반영됨
