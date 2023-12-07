# ets2-obslive
 本人于bilibili平台直播《欧洲卡车模拟2》所用复古信息风直播间背景，可用于实时向观众显示车辆信息。

 My own liveroom design for streaming Euro Truck Simulator 2 on bilibili. Can be used to display truck status to visitors.

 ![](https://raw.githubusercontent.com/izwb003/ets2-obslive/dashboard.jpg)

 ## 使用说明
 这一背景是作为网页提供的，可用作[Funbit](https://github.com/Funbit)的[ets2-telemetry-server](https://github.com/Funbit/ets2-telemetry-server)的一个皮肤。故此，您需要安装此服务器工具。

 1. 请根据[ets2-telemetry-server](https://github.com/Funbit/ets2-telemetry-server)的readme来在您的计算机上正确安装此服务器。

 **注：服务器安装完毕后，欧卡2游戏可能会警示您正在使用高阶SDK。请忽略该警告。**

 2. 下载此项目。在网页上端点击绿色的“Code”按钮，然后选择“Download ZIP”。

 3. 解压所有文件，并将ets2-obslive文件夹拷贝到服务器的/Html/skins文件夹。

 4. 启动服务器，窗口中会向您显示HTML5 app的URL。点击打开即可来到仪表板选项。您将在列表中找到“Dashboard Skin for OBS Streaming”一项。进入并复制URL。

 5. 搭建一个空的OBS场景，添加一个浏览器源，设定其大小为1920x1080。粘贴复制的URL，该背景即可显示。

 6. 添加您的游戏视频源并调整其尺寸以覆盖住“播出内容调试中”区域。您也可以考虑使用[blivechat](https://github.com/xfgryujk/blivechat)来填充右侧的“MESSAGE”区域。

 7. 启动游戏，寻找一份工作。尽情享受直播吧！

## usage instructions
 This background comes as a webpage and works as a skin for [Funbit](https://github.com/Funbit)'s [ets2-telemetry-server](https://github.com/Funbit/ets2-telemetry-server). So this server is required to host the background.

 1. Please follow [ets2-telemetry-server](https://github.com/Funbit/ets2-telemetry-server)'s readme to install the server in your computer and links to ETS2 game itself properly.

 **NOTE: After the server was installed, ETS2 game may warn you that you are using an advanced level of SDK. Please ignore it.**

 2. Download this repository, click the green "Code" button on the top of the webpage and select "Download ZIP".

 3. Unzip the files and copy ets2-obslive folder to the server's /Html/skins folder.

 4. Start the server, the window will show you the HTML5 app URL and it will bring you to Dashboard Menu. You will find "Dashboard Skin for OBS Streaming" in the list. Enter it and copy the URL.

 5. Build an empty OBS scene, add a browser source, set its size to 1920x1080. Paste the URL into it and it will display as a background.

 6. Add your game video's source and adjust its size to cover the "Debugging broadcast content" area. You may use [blivechat](https://github.com/xfgryujk/blivechat) to fill the "MESSAGE" area at the right side.

 7. Turn on your game and find a job to do, then enjoy streaming!

## 修改底部轮播信息
 您可能需要修改底部信息条中显示的内容。若需要这么做，请打开```dashboard.js```。您将在文件的开头看到一个数组变量“messages”：

 ```js
 var messages = [
    "Message A",
    "Message B",
    "Message C",
    "..."
];
 ```
 您可以向数组中添加或删除字符串。这些字符串将自动轮流显示。

## Change messages at the bottom
 You may need to change the messages shown at the bottom bar. To do this, please open ```dashboard.js``` and you will find a variable called "messages" at the top:

 ```js
 var messages = [
    "Message A",
    "Message B",
    "Message C",
    "..."
];
 ```
 You may add or delete strings in this array. These strings will switch automatically.

## 小部件
 您可以选择向视频流中添加显示一些小部件。在OBS中添加一个浏览器源并勾选“本地文件”然后选择这些小部件，并调整它们的尺寸到建议的数值。目前有两个小部件可选：
 - ```messagebox-clock.html```

 建议尺寸：280x120

 一个带有透明效果的小时钟。

 - ```messagebox-leave.html```

 建议尺寸：860x390

 一条表明您不在屏幕前的提示消息。

 **提示：该消息的显示内容可以被修改。选择该浏览器源并点击“交互”，随即您即可以在弹出的窗口中修改显示的文字。**

## Widgets
 You may add some widgets to your streaming video. Add a browser source to OBS and set "Local File" then select them, and adjust the height and width to the suggested value. Currently there are two:

 - ```messagebox-clock.html```

 Suggest size: 280x120

 A clock with some transparent effects.

 - ```messagebox-leave.html```

 Suggest size: 860x390

 A message shows that you're not in front of the screen.

 **HINT: the message text displayed can be changed. Select the source and click "interactive" then you can edit the text in the pop-up window.**

## LICENSE
 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)

 **在该背景中使用的字体，包括“fenghuangdianzhenti.ttf”和“digital-7.ttf”是CC0 1.0授权的。**

 **Fonts used in this background, includes "fenghuangdianzhenti.ttf" and "digital-7.ttf" are CC0 1.0 licensed.**