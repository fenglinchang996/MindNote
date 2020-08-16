# MindNote

[https://mindnote-f39e9.firebaseapp.com/](https://mindnote-f39e9.firebaseapp.com/)

A web tool for organizing your ideas, concepts and knowledge with mind mapping and note taking.

![Home Page](https://i.imgur.com/z3e7ENM.png)

## Technologies

- React
  - React Hooks
  - React Context
  - React Router
- Webpack
- Firebase
  - Cloud Firestore
  - Firebase Authentication
  - Firebase Hosting
- SVG

## Test User

Account: test@test.com
Password: test123456

## Features

### Mind Mapping

After you add a new mindnote in Docs page, the Mindnote page will be directed to immediately. You can see an **empty canvas** (except there is a **center node**) is provided for you to mapping out your ideas.

#### Edit Mindnote Title

You can edit the mindnote title on the upside toolbar. You can click the input area (which shows _Untitled_ if you do not type any text yet) and then edit it. The word number of a title is not limited, but a short and brief title is highly recommended.

![Edit Mindnote Title](https://i.imgur.com/0IfaVe7.gif)

#### Add Title Content for A Node

When a new mindnote is created, a center node will be placed on the canvas and its title content will be empty (which also shows _Untitled_). **Click the node** and then a **note tool** is showing up on the right side of the canvas. In the note tool, you can see two inputs: one is for **editing node tile**, which represents as the node content on mind map; the other one is for taking note, which can be used to record more infomation for the node. **Click the title input area and edit it**. The title text in node content will also modified immediately. The node will **automatically resize** itself if the title text is too much.

![Add Title Content for A Node](https://i.imgur.com/cJnC6WV.gif "Add Title Content for A Node")

#### Add A New Node

The most important thing in mind mapping is to organize the information by their relationship. This can be done on the mindnote by branching out a new node from the existing node. Click the the node that you want the new node from (we call it **start node**). **Arrow marker** that used to add new node will appear on the four side of the start node. Press down on the arrow marker of the side you want, a **virtual curve** and **virtual node** will be created to indicate you where the new node will be placed. **Drag** the virtual node to the proper position, then **drop** it, a new node and curve will be created.

![Add A New Node](https://i.imgur.com/cN3kpIb.gif "Add A New Node")

#### Modify Curve Path

You may want modify your curve path with more good looking style. Click the curve you want to modify, **two white circles extended (with gray dashed line) from both end points of the curve** will show up. They are **control points** of the curve. You can **presss them**, **then drag and drop them** to modify the curve path. The principle of how the control point to change the curve path is based on the theory of **Bezier curve**.

![Modify Curve Path](https://i.imgur.com/pmzFro0.gif "Modify Curve Path")

#### Move Curve

You can change the curve end points to other sides of the node that connect to the curve. Just click the curve, **two white circles on the end points** will appear, enabling you to move curves. **Press one of pints**, **drag it to other side of the connected node** (note that **you have to drag the point to the inside part of the node side**) and **release it**. The curve will then connect to the new side of the node.

You can also change the relation between the nodes by moving their connected curves. **Only the curve point that connect to start node can re-connecte to another node**, and then the relationship of the nodes will be modified.

![Move Curve](https://i.imgur.com/qoQCquo.gif "Move Curve")

> The curves' direction of each side can only be **in** or **out**, i.e., if curves' direction of one side is **out** (meaning they connect to **child nodes**), it can not connect to the curve that is originally attached to the **parent node**, vice versa.

#### Move Node

Moving a node is easy. Click the node you want to move. The cursor inside any part of the **selected node** will be **move** shape, indicating it can be moved. **Press down the selected node, dragging it to the proper prosition, and release it**. The node, as well as its **descendent nodes** (and their **connected curves**), will be moved to new position.

> The cneter node cannot be moved.

![Move Node](https://i.imgur.com/mWT0bep.gif "Move Node")

#### Resize Node

To resize the node, click the node you want to resize, then press the **corner point** (**white circles appeared from corners**) of one node corner, dragging it to the appropriate place, then release it. The node will be resized. Note that since the connection points' position to attached curves may changed, the decendant nodes and connected curves will be moved to the new proper position.

![Resize Node](https://i.imgur.com/7TxAJj2.gif "Resize Node")

#### Delete Node

Click the node you want to delete, then clicking the **Delete Node** button on the upper toolbar. Note that not only the node, but also its **descendent nodes** (and all **connected curves**) will be removed from mind map.

![Delete Node](https://i.imgur.com/MXugevi.gif "Delete Node")

> The center node cannot be deleted.

### Note Taking

Each node of mind map containing a title text to present an idea, an concept, a piece of data, etc. But this may not enough to capture every single detail. **Note tool** provides another place for you to record more information, without messing your mind map.

To use the function of note taking, **click the node you want to edit**. The note tool will show up on the right side. There are two inputs: one for editing title and the other for editing note.

> You can **collapse** the note tool and **expand** it later if you think it takes too much space and just want to focus on mind mapping work.

> You can also close it, but it will automatically appear when you click other node. If you close the note tool and then want to open it later, just click the **Note Editing** button on upper toolbar.

> You can **resize the width of note tool** to gain more space for editing note. Press the left edge of note tool, dragging it until the note tool's width is in proper size, then release it.

![Note Tool](https://i.imgur.com/Yzh8eCJ.gif "Note Tool")

#### Edit Title

**Click the title input area and edit it**. The title text in node content will also modified immediately.

#### Edit Note

The note taking function supports **Markdown**, a lightweight markup language for writing document with plain-text syntax. The things you can do with Markdown including writing **bold** or _italic_ words, creating table or list, inserting URL or image, and son on. You can switch to the **view mode** to preview the results.

![Edit Note](https://i.imgur.com/kD2Hm6S.gif "Edit Note")

### Styling

You can style nodes and curves on the mind map. Click the **Node Style** button or **Curve Style** button on the upper toolbar, The tool box for styling will show up. Note that the styling is for the nodes or cruves with same level, not just for particular node or curve.

#### Node Style

You can change the **border color**, **border width**, **border type**, **border radius** and **fill color** of the nodes.

![Style Node](https://i.imgur.com/KWVaC2C.gif "Style Node")

#### Curve Style

You can change the **color**, **width** and **type** of the curves.

![Style Curve](https://i.imgur.com/kDjxH39.gif "Style Curve")

### Zooming Mind Map

To zoom in/out the the working area of mind map, you can click the **Zoom In/Out** button on the zoom toolbar in the up-right side of the canvas. You can also **press `Ctrl` key** and **scroll your mouse wheel** to zoom in/out mind map.

![Zoom Mind Map](https://i.imgur.com/YDjtcSt.gif "Zoom Mind Map")

### Moving Mind Map

To move mind map, **press down on any point of the mind map except on node or curve**, **then drag it**, the mind map will move with the cursor's movement.

![Move Mind Map](https://i.imgur.com/Y43iVZz.gif "Move Mind Map")
