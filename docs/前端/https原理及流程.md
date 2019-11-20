# https 原理及流程

## 密码学基础

- **明文**：未被加密过的原始数据
- **密文**：明文被某种加密算法加密之后，会变成密文，从而确保原始数据的安全。密文也可以被解密，得到原始的明文。
- **密钥**：密钥是一种参数，它是在明文转换为密文或将密文转换为明文的算法中输入的参数。密钥分为对称密钥与非对称密钥，分别应用在对称加密和非对称加密上。

- **对称加密**：对称加密又叫做私钥加密，就是发送方和接收方使用同一个密钥去加密解密数据。对称加密的特点是算法公开，加密解密速度快，适合对大数据量进行加密，常见的对称加密算法有 DES、AES、IDEA、RC5 等

  加密过程：`encrypt(text,privatekey)=>privateText`
  解密过程：`decrypt(privateText,privateKey)=>text`

  对称加密中用到的密钥叫私钥，该密钥不能被泄露。由于对称加密的算法是公开的，所以私钥被泄露了，密文就面临被破解的风险。所以对称加密的缺点是密钥安全管理困难。

- **非对称加密** 非对称加密也叫做公钥加密，相比对称加密安全性更好。非对称加密使用一对公钥和私钥，用公钥和私钥中的任何一个加密，用另一个解密。

  被公钥加密过的密文只能被私钥解密
  `encrypt(text,publicKey)=>privateText`
  `decrypt(privateText,privateKey)=>text;`

  反之同理
  `encrypt(text,privateKey)=>privateText`
  `decrypt(privateText,publicKey)=>text;`

  它的缺点是加密解密花费时间长，只适合对少量数据进行加密，主要算法有 RSA、ECC 等。

## https 通信过程

`HTTPS = HTTP + SSL/TLS` SSL(Secure Sockets Layer) TLS(Transport Layer Security)

为了兼顾安全效率，https 同时使用了对称加密和非对称加密。数据是被对称加密传输的，对称加密需要客户端的密钥，为了能把该密钥安全传输到服务器端，采用非对称加密对该密钥进行加密传输。总结一下就是对称加密数据，对称加密要使用的密钥非对称加密

过程如下图
![https过程](https://upload-images.jianshu.io/upload_images/627325-dc83fef6ac2e6c88.png?imageMogr2/auto-orient/strip|imageView2/2/w/648/format/webp)

### 三个密钥

- 服务器端的的公钥和私钥，用来进行非对称加密
- 客户端生成的随机密钥，用来进行对称加密

一个 HTTPS 请求实际上包括了两次 HTTP 传输，可以细分为 8 步。

1. 客户端向服务器发起 HTTPS 请求，连接到 443 端口
2. 服务器端有一个密钥对（公钥和私钥），服务器端保存着私钥。
3. 服务器下发证书
4. 客户端验证证书合法性，如果合法，客户端生成一个随机数(client key)，用于对称加密。然后用证书里的加密方法加密 client key。
5. 把加密后的 client key 发送给服务器。
6. 服务器接收到后，用证书的解密方法获取 client key，然后用 client key 对数据进行对称加密
7. 加密后的密文发送给客户端
8. 客户端收到之后用 client key 解密
