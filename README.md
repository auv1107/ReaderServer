# ReaderServer
在 LeanCloud 云引擎上使用 Express 的 Node.js 项目。
综合各大内容平台内容，输出统一的标准化接口。

## 项目实例
一款研发中的听书 app。

## 目前支持平台接口
- 知乎日报
  `/data/zhihu`
- 知乎专栏
  `/data/zhuanlan`
- 糗事百科热门
  `/data/qiubai`
  
  
## 接入流程
1. 路由
在 routes/data.js 中添加平台接口路由
```
router.get('/{{your platform code}}', require('../repo/{{your methods to obtain data}}'));
```

2. 获取平台数据接口
在 repo/ 添加你的实现

**需要处理的请求字段**：
- page: 页数，第一页为 1
- limit: 每页条数，默认为 20

**返回字段格式**：
- api_type: 数据格式
- source: 数据来源
- data: 数据列表
- id: 唯一id， 应为 source + '\_' + 此数据在该平台的唯一 id。
- display_content: 展示的内容
- read_content: 阅读的内容
- type: 数据类型。
  - word: 纯文本。则 display_content 为纯文本
  - url: 链接。则 display_content 为 web 页面链接
- create_at: 创建时间

**返回示例**:
```
{
    "api_type": "normal",
    "source": "qiubai",
    "data": [
        {
            "id": "qiubai_119762185",
            "title": "楼主睁眼一看天都蒙蒙亮了",
            "display_content": "周六晚上玩了一个通宵的游戏，早上才浑浑噩噩的回卧室睡觉！后来迷迷糊糊中哥哥叫我起床：丫头，你都睡了一天一夜了，快起来上班。\n楼主睁眼一看天都蒙蒙亮了，想起来今天要早点去报道，急急忙忙洗漱，穿上衣服就夺门而去！\n坐在公车上，楼主看着手机上的北京时间18:02分，瞬间有想打人的冲动。。。",
            "read_content": "周六晚上玩了一个通宵的游戏，早上才浑浑噩噩的回卧室睡觉！后来迷迷糊糊中哥哥叫我起床：丫头，你都睡了一天一夜了，快起来上班。\n楼主睁眼一看天都蒙蒙亮了，想起来今天要早点去报道，急急忙忙洗漱，穿上衣服就夺门而去！\n坐在公车上，楼主看着手机上的北京时间18:02分，瞬间有想打人的冲动。。。",
            "type": "word",
            "create_at": "2017-11-19 07:30:03"
        },
        ...
    ],
    "count": 20
}
```

3. 发布
在 repo/radio.js 中发布，在广播列表中展示

**示例**
```
{
    name: '知乎专栏', // 平台名称
    description: '有验证的投资', // 描述，slogon 等
    sub_title: '科学投资', // 子系列名称
    album_url: 'http://ou8u8dsau.bkt.clouddn.com/17-11-3/59320853.jpg',
    code: 'scientific_invest' // code, 应和 routes/data.js 中注册的 code 相同
}
```

