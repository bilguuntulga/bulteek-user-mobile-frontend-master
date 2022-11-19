// // const { createProxyMiddleware } = require("http-proxy-middleware");
// // console.log("http-proxy-middleware");
// // console.log("NODE_ENV ", process.env.NODE_ENV);
// // module.exports = function (app) {
// //   console.log("app ", app);
// //   app.use(
// //     "/api/auth",
// //     createProxyMiddleware({
// //       target: "http://165.22.62.199:5000",
// //       changeOrigin: true,
// //     })
// //   );
// //   app.use(
// //     "/api/accounts",
// //     createProxyMiddleware({
// //       target: "http://165.22.62.199:5000",
// //       changeOrigin: true,
// //     })
// //   );
// //   app.use(
// //     "/api/upload",
// //     createProxyMiddleware({
// //       target: "http://128.199.251.233:5002",
// //       changeOrigin: true,
// //     })
// //   );

// //   app.use(
// //     "/api/public_movie",
// //     createProxyMiddleware({
// //       target: "http://localhost:5003",
// //       changeOrigin: true,
// //     })
// //   );

// //   app.use(
// //     "/api/user_movie",
// //     createProxyMiddleware({
// //       target: "http://localhost:5003",
// //       changeOrigin: true,
// //     })
// //   );

// //   app.use("/api/user_backoffice",
// //     createProxyMiddleware({ target: "http://165.22.62.199:5001", changeOrigin: true, })
// //   );

// //   app.use("/api/public_user_backoffice",
// //     createProxyMiddleware({ target: "http://165.22.62.199:5001", changeOrigin: true, })
// //   )

// //   //user_movie

// //   app.use(
// //     "/uploads",
// //     createProxyMiddleware({
// //       target: "http://128.199.251.233:5002",
// //       changeOrigin: true,
// //     })
// //   );

// //   // /api/upload
// // };


// const { createProxyMiddleware } = require("http-proxy-middleware");
// console.log("http-proxy-middleware");
// console.log("NODE_ENV ", process.env.NODE_ENV);
// module.exports = function (app) {
//   console.log("app ", app);
//   app.use(
//     "/api/auth",
//     createProxyMiddleware({
//       target: "http://localhost:5000",
//       changeOrigin: true,
//     })
//   );
//   // app.use(
//   //   "/api/accounts",
//   //   createProxyMiddleware({
//   //     target: "http://165.22.62.199:5000",
//   //     changeOrigin: true,
//   //   })
//   // );
//   // app.use(
//   //   "/api/upload",
//   //   createProxyMiddleware({
//   //     target: "http://128.199.251.233:5002",
//   //     changeOrigin: true,
//   //   })
//   // );

//   app.use(
//     "/api/public_movie",
//     createProxyMiddleware({
//       target: "http://localhost:5003",
//       changeOrigin: true,
//     })
//   );

//   app.use(
//     "/api/user_movie",
//     createProxyMiddleware({
//       target: "http://localhost:5003",
//       changeOrigin: true,
//     })
//   );

//   app.use("/api/user_backoffice",  
//     createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true, })
//   );

//   app.use("/api/public_user_backoffice",
//     createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true, })
//   )

//   //user_movie

//   app.use(
//     "/uploads",
//     createProxyMiddleware({
//       target: "http://localhost:5002",
//       changeOrigin: true,
//     })
//   );

//   // /api/upload
// };


const { createProxyMiddleware } = require("http-proxy-middleware");
console.log("http-proxy-middleware");
console.log("NODE_ENV ", process.env.NODE_ENV);
module.exports = function (app) {
  console.log("app ", app);
  app.use(
    "/api/auth",
    createProxyMiddleware({
      target: "http://165.22.62.199:5000",
      changeOrigin: true,
    })
  );
  // app.use(
  //   "/api/accounts",
  //   createProxyMiddleware({
  //     target: "http://165.22.62.199:5000",
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   "/api/upload",
  //   createProxyMiddleware({
  //     target: "http://128.199.251.233:5002",
  //     changeOrigin: true,
  //   })
  // );

  app.use(
    "/api/public_movie",
    createProxyMiddleware({
      target: "http://165.22.62.199:5003",
      changeOrigin: true,
    })
  );

  app.use(
    "/api/user_movie",
    createProxyMiddleware({
      target: "http://165.22.62.199:5003",
      changeOrigin: true,
    })
  );

  app.use("/api/user_backoffice",  
    createProxyMiddleware({ target: "http://165.22.62.199:5001", changeOrigin: true, })
  );

  app.use("/api/public_user_backoffice",
    createProxyMiddleware({ target: "http://165.22.62.199:5001", changeOrigin: true, })
  )

  //user_movie

  app.use(
    "/uploads",
    createProxyMiddleware({
      target: "http://128.199.251.233:5002",
      changeOrigin: true,
    })
  );

  // /api/upload
};
