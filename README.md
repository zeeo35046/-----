# 梁鹏个人作品集

## 随时本地预览

双击项目根目录的 `启动本地预览.cmd`，会自动打开浏览器并访问 `http://127.0.0.1:4173/`。无需打开 Codex，也无需安装 Node.js 或 Python。关闭预览命令窗口即停止服务。

本地服务支持 MP4 Range 请求，可正常拖动视频进度。Codex 修改并重新构建后，刷新浏览器即可看到最新版本。

基于 React + Vite 的个人作品集基础版本，面向产品设计、工业设计与品牌视觉方向。

## 本地运行

```bash
pnpm install
pnpm dev
```

浏览器访问终端显示的本地地址即可预览。

## 正式构建

```bash
pnpm build
pnpm preview
```

## 替换项目素材

- Profile 照片：替换 `public/profile-studio.jpg` 与 `public/profile-portrait.jpg`。
- Hero 视频：将视频命名为 `hero-video.mp4` 并放入 `public/`。页面会自动全屏静音循环播放；文件缺失或加载失败时，会回退到实时生成的动态腕表影像。
- 项目媒体：在 `src/main.jsx` 中替换 `WatchVisual`，可接入图片、视频或 WebGL/3D 模型。
- 个人信息与项目文案：集中在 `src/main.jsx` 顶部数据及对应模块中。
