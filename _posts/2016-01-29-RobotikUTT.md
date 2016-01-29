---
layout: post
title: RobotikUTT
categories: [utt, robotics]
---

For the last few months, I helped the [RobotikUTT](http://robotikutt.github.io/) organization to create its future robot that it will present to the next [Robotics French Cup](http://www.planete-sciences.org/robot/?section=pages&pageid=79).

There's a few people in the organisation, but I mainly worked with Axel Mousset (project's leader) on three topics : pathfinding, IA & intracommunication.

The robot uses mainly C++ and JavaScript.

## Pathfinding

My first job was to create a Node module that would make a simple pathfinding over a bitmap. There are a lot of plugins already doing it well.
The nuance here is that the plugin had to be performant (that means in C++), and supports everything we can expect from an advanced pathfinding library :

* Use a heap to optimize the lowest-cost finding operation
* Avoid reinspecting the same node
* Path simplification (8-directions)

I did not used the [Jump Point Search](https://en.wikipedia.org/wiki/Jump_point_search) as it does not support avoiding corner crossing.

### Heap

When I first looked into [PathFinding.js](https://github.com/qiao/PathFinding.js) (which I've heavily inspired my library of); I looked for an equivalent to the [heap](https://github.com/qiao/heap.js) node module.
Actually there is two ways of making a heap queue in C++ :

1. Use a classic vector and call `make_heap`, `push_heap` etc.
2. Use a `priority_queue` that will do all the job for you

To compare one node to another and sort it, the priority queue needs a class with `()` operator overloaded :

{% highlight cpp linenos %}
bool HeapCompare_f::operator() (Node* x, Node* y) {
    return x->f > y->f;
}
{% endhighlight %}

Create your priority_queue like that :

{% highlight cpp linenos %}
// Node* is the item type, vector<Node*> the list type, and HeapCompare_f our comparison
priority_queue<Node*, vector<Node*>, HeapCompare_f> openList;
{% endhighlight %}

### Reinspecting

To avoid any reinspection, two properties have been added to the Node : `closed` and `opened`.
When a neighbour is about to be added to the node list, stop if he has already been in the node list.
If it's not, put `opened` to true. When getting the next node on the list, if any of its neighbours has `closed` to true, pass it.
This way, you can avoid getting at least avoid the parent one, and every one that has already been seed.
This is a major optimization to A*.

### Path simplification

I did have problems with the simplification algorithm already in PathFinding.js. I decided to create my own.

Basically, compare every node to the next one, and if there is a path change, save the node, and change the actual direction.
As the path is starting from the target node (retrieve every parent from the target node until the first node), the list
should be reversed (in the backtrace function : `reverse(path.begin(), path.end());`).
Here is what it looks like :

{% highlight cpp linenos %}
vector<vector<int>> smoothenPath(vector<vector<int>>* path) {
    vector<vector<int>> newPath(path->size(), vector<int>(2, 0));

    newPath[0] = path->at(0);
    int l = 1;

    change change = CHANGE_UNKNOWN;

    for (unsigned int i = 1; i < path->size(); ++i) {
        int cmpX = (*path)[i - 1][0];
        int cmpY = (*path)[i - 1][1];
        int pX   = (*path)[i][0];
        int pY   = (*path)[i][1];

        if (change == CHANGE_UNKNOWN) {
            if (cmpX == pX) {
                change = CHANGE_Y;
            } else {
                if (cmpY != pY) {
                    // Both change => diagonal
                    if (pY > cmpY && pX > cmpX) {  change = CHANGE_SE; }
                    if (pY > cmpY && pX < cmpX) { change = CHANGE_SW; }
                    if (pY < cmpY && pX > cmpX) { change = CHANGE_NE; }
                    if (pY < cmpY && pX < cmpX) { change = CHANGE_NW; }
                } else {
                    change = CHANGE_X;
                }
            }
        }

        bool hasChange = false;
        if (change == CHANGE_Y && !(cmpX == pX && cmpY != pY)) {
            hasChange = true;
        } else if (change == CHANGE_X && !(cmpY == pY && cmpX != pX)) {
            hasChange = true;
        } else if (change == CHANGE_SE && !(pY > cmpY && pX > cmpX)) {
            hasChange = true;
        } else if (change == CHANGE_SW && !(pY > cmpY && pX < cmpX)) {
            hasChange = true;
        } else if (change == CHANGE_NE && !(pY < cmpY && pX > cmpX)) {
            hasChange = true;
        } else if (change == CHANGE_NW && !(pY < cmpY && pX < cmpX)) {
            hasChange = true;
        }

        if (hasChange) {
            change = CHANGE_UNKNOWN;
            newPath[l] = (*path)[i - 1];
            ++l;
        }
    }

    newPath[l] = path->at(path->size() - 1);

    newPath.resize(l + 1);

    return newPath;
}
{% endhighlight %}

## IA

My second job was to create sequences of promises, that should execute in sequence.

Here is what the API looks like for Sequences :

{% highlight js linenos %}
let seq = new Sequence();

seq
    .next(() => {
        return promise;
    })
    .delay(500)
    .next(() => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    })
    .start();

// Events in seq : started, next, error, stoped, finished
{% endhighlight %}

This is used by the IA. By default the robot has some tasks to do, and it will follow them in order to complete its goals.
But if something is wrong, then the robot has to evaulate where he is, where he can go and how many points that can make him win.
Then a ratio `pointsEarned / distance` is calculated for every task, and then execute the task with the best score.

## Intracommunication

The last thing I've been working on these days was the communication between the main computer (a [Beaglebone](http://beagleboard.org/bone)), and the multiple cards ([Arduino Nano](https://www.arduino.cc/en/Main/ArduinoBoardNano), for example).
The communication is done by two ways : either by [CANbus](https://fr.wikipedia.org/wiki/Controller_Area_Network) or with [UART](https://fr.wikipedia.org/wiki/UART). CANbus already has its protocol but UART does not.

The solution was making a modulable communication library with predefined « packets » that would be encoded in the less space possible. Here is was the final result looks like :

{% highlight js linenos %}
import communication from './communication';
let com    = new communication.transports.UART(null);
let buffer = com.serializer(new communication.protocol.TestPacket(60)).raw;

console.log(com.parse(buffer));

let com2    = new communication.transports.CANBus(null);
let buffer2 = com2.serializer(new communication.protocol.TestPacket(60)).raw;

console.log(com2.parse(communication.protocol.TestPacket, buffer2));
{% endhighlight %}

Of course, the API provides methods to send packets, but most of the job was to serialize and parse buffers.
In fact I based my work on something similar to CANBus in the UART serializer :

1. Data size encoded in one or two byte (depending on the first bit — so encoded on 7 or 15 bits)
2. A « command id » is put (that identifies the packet type) (one byte)
3. The data buffer
4. A XOR checksum

The serializer just writes values on the buffer. Packets are defined by JSON files, parsed from the `index.js` file.
The parser create classes for every JSON files. This is made by JavaScript reflexion :

{% highlight js linenos %}
fs
    .readdirSync(__dirname)
    .filter(file => file.slice(-5) === '.on')
    .map(file => require(path.join(__dirname, file)))
    .forEach(protocol => {
        packets[protocol.name] = class {
            ...
        };
    });
{% endhighlight %}

And a packets looks like this :

{% highlight js linenos %}
{
    "name": "TestPacket",
    "id"  : 0,
    "data": {
        "foo": {
            "type": "int8",
            "default": -1
        },
        ...
}
{% endhighlight %}

## Links

Robot repository : [2016 branch](https://github.com/RobotikUTT/eurobot-core/tree/2016) or [2016-com branch](https://github.com/RobotikUTT/eurobot-core/tree/2016-com) with the communication module.

pathfindingjs repository : [github](https://github.com/gjuchault/pathfindingjs)

Scheduler/Sequence repository : [github](https://github.com/gjuchault/schedulerjs)
