# [Event Loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)

## 定义

> To coordinate events, user interaction, scripts, rendering, networking, and so forth, user agents must use event loops as described in this section. Each agent has an associated event loop.

为了协调事件、用户行为、脚本、页面渲染、网络请求等，浏览器必须使用这段描述的事件循环。每一个浏览器都有一个相关的事件循环。

> An event loop has one or more task queues.A task queue is a set of tasks.

事件循环有一个或多个任务队列。任务队列是一个包含多个任务的 set(不重复)。

> The microstask queue is not a task queue.

微任务队列不是任务队列。

---

## 任务压缩算法(Tasks encapsulate algorithms)负责任的对象

- Events 事件

  > Dispatching an **Event** object at a particluar **EventTarget** object is often done by a dedicated task.

  分发 Event 到特定的 EventTarget 通常被一个专用任务完成

- Parsing 解析

  > The HTML parser tokenizing one or more bytes,and then processing any result tokens,is typically a task.

  HTML 解析器解析一个或多个字节，然后处理结果标记是一个典型的任务

- Callbacks 回调

  > Calling a callback is often done by a dedicated task.

- Using a resource 使用资源

  > When an algortithm fetches a resource,if the fetching occurs in a non-blocking fashion then the processing of the resource once some or all of the resource is available is performed by a task.

- Reacting to DOM manipulation DOM 操作

## Task 任务

通常，任务的结构如下

- Steps 步骤

  > A series of steps specifying the work to be done by the task.

描述工作怎么完成的一系列步骤。

- A source 事件源

  > One of the task sources,used to group and serialize related tasks.

- A document

  > A Document associated with the task,or null for tasks that are not in a window event loop.

和任务有关的 document，或者是 null(不在 window 里的 event loop)

- A script evaluation environment settings object set 执行环境对象 set

---

> Per its source field, each task is defined as coming from a specific task source. For each event loop, every task source must be associated with a specific task queue.

每一个任务都来自于特定的任务源，对于每一个事件循环，每一个任务源必须和特定的任务队列相关。

- 每个事件循环都有一个**currently running task(正在运行的任务)**。初始化时为空。

- 每一个事件循环都有一个 **microtask queue（微任务队列）**,初始化时为空。微任务就是通过微任务队列算法创建的任务。

- 每一个事件循环都有执行微任务检查点标记，初始化为 false。

- 每一个事件循环都有相关的开始值和结束值，初始化为 unset

## Queuing tasks 排列任务

To queue a task on a task source source, which performs a series of steps steps, optionally given an event loop event loop:

    1. If event loop was not given, set event loop to the implied event loop.
    2. Let task be a new task.
    3. Set task's steps to steps.
    4. Set task's source to source.
    5. Set task's document to the implied document.
    6. Set task's script evaluation environment settings object set to an empty set.
    7. Let queue be the task queue to which source is associated on event loop.
    8. Append task to queue.

To queue a microtask which performs a series of steps steps, optionally given an event loop event loop:

    If event loop was not given, set event loop to the implied event loop.

    Let microtask be a new task.

    Set microtask's steps to steps.

    Set microtask's source to the microtask task source.

    Set microtask's document to the implied document.

    Set task's script evaluation environment settings object set to an empty set.

    Enqueue task on event loop's microtask queue.

## Processing model 运行模型

1. 让任务队列成为事件循环的任务队列中的一个，该队列必须包含一个可以执行的任务，如果没有这样的队列，跳到下面微任务步骤。

2. 让 oldestTask 成为第一个可以执行的任务，然后从队列中删除。

3. 当浏览器不执行循环时，报告任务的持续时间步骤如下：

   1. 设置 event loop begin 为当前时间
   2. If event loop end is set, then let top-level browsing contexts be the set of all top-level browsing contexts of all Document objects associated with the event loop. Report long tasks, passing in event loop end, event loop begin, and top-level browsing contexts.

4. 把 oldestTask 设置为事件循环正在运行的任务
5. 执行 oldestTask 的步骤
6. 设置正在运行的任务为 null
7. 微任务：执行微任务 checkpoint

   1. 如果 checkpoint 为 true，返回
   2. set checkpoint=true
   3. 如果 microtask queue 不为空
      1.oldestMicroTask 出队列
      2.set currently running task=oldestMicroTask
      3.run it
      4.set currently running task = null
   4. For each environment settings object whose responsible event loop is this event loop, notify about rejected promises on that environment settings object. 通知事件源 Promise 等
   5. Cleanup Indexed Database transactions. 清除 IndexDB 事务
   6. 设置 checkpoint=false

8. Let now be the current high resolution time. [HRT]
9. 报告任务持续时间步骤如下：

   1. Let top-level browsing contexts be an empty set.

   2. For each environment settings object settings of oldestTask's script evaluation environment settings object set, append setting's top-level browsing context to top-level browsing contexts.

   3. Report long tasks, passing in event loop begin (repurposed as meaning the beginning of the task), now (the end time of the task), top-level browsing contexts, and oldestTask.

10. Update the rendering 重新渲染

![Event Loop示意图](https://mmbiz.qpic.cn/mmbiz_png/Ln9Ehepfls2VCgexqyyfibk2lbSVK5bL9SicAz8cGAJ1WsiaNd30pibBRPEoLtCYRk9PbyIlNC0xB348xX4Mu4Cl9g/640?wx_fmt=png)
