if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}

// 환경변수가 production 상태(배포 후)라면 prod 모듈을 가져오고,
// 배포 후가 아닌 개발 중이라면(development) dev 모듈을 가져옴
