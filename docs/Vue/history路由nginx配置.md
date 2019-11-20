# history 路由 nginx 配置

## 根目录配置

```nginx
        location / {
            try_files $uri $uri/ /index.html;
        }
```

## 非根目录配置

```nginx
        location /txx/A{
           alias /aaa/aaa/txx/A/;
           index  index.html;
           try_files $uri $uri/ /txx/A/index.html;
        }

```
