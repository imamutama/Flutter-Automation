// import config from "./wdio.shared.local.appium.conf";
// const fs = require("fs");
// const file = [
//   fs.readFileSync("./file/caps-local.json"),
//   fs.readFileSync("./file/caps-local-2.json"),
// ];
// const android = [JSON.parse(file[0]), JSON.parse(file[1])];
// // ============
// // Specs
// // ============

// console.log("Lenght capabilities" + String(config.capabilities.length));

// if (android[0]) {
//   //   if (config.cucumberOpts?.tagExpression == "@regression-onboarding") {
//   config.specs = ["./features/scenarios/**/**/reg-login.feature"];
//   //   } else if (config.cucumberOpts?.tagExpression == "@regression-engagement") {
//   //     config.specs = ["./features/scenarios/**/**/*.feature"];
//   //   } else if (config.cucumberOpts?.tagExpression == "@regression-shopping") {
//   //     config.specs = ["./features/scenarios/**/**/*.feature"];
//   //   }
// } else {
//   //   if (config.cucumberOpts?.tagExpression == "@regression-onboarding") {
//   config.specs = ["./features/scenarios/**/**/reg-register.feature"];
//   //   } else if (config.cucumberOpts?.tagExpression == "@regression-engagement") {
//   //     config.specs = ["./features/scenarios/**/**/*.feature"];
//   //   } else if (config.cucumberOpts?.tagExpression == "@regression-shopping") {
//   //     config.specs = ["./features/scenarios/**/**/*.feature"];
//   //   }
// }

// // ============
// // Capabilities
// // ============
// config.capabilities = [android[0], android[1]];

// exports.config = config;
