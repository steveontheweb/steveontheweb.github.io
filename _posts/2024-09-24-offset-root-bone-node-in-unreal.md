---
layout: post
title: Offset Root Bone Node in Unreal
date: 2024-09-24 08:30 -0600
---

![Offset Root Bone Animation](/assets/img/offsetrootbone/OffsetRootBone_converted.gif)

## What is the Offset Root Bone Node?

The Offset Root Bone node was submitted to the engine back in 2022, but only really used in example content recently with the new [Game Animation Sample Project](https://www.unrealengine.com/marketplace/en-US/product/game-animation-sample) from Epic, and it's designed to handle root motion animation in a controlled fashion during gameplay.

![Game Animation Sample](/assets/img/offsetrootbone/Game%20Animation%20Sample.png)

You can see an earlier implementation of a similar concept using the Rotate Root Bone node in the [Lyra Starter Game](https://www.unrealengine.com/marketplace/en-US/product/lyra) project from Epic (more on this later).

If you're not familiar with what root motion is, there's an [excellent explanation here](https://dev.epicgames.com/documentation/de-de/unreal-engine/root-motion-in-unreal-engine) from Epic.  The TLDR is: in most games, we use capsule-based motion, where the controller and the character capsule solely determine the location and orientation of the character at any given time, and it's up to animation to try to make this look good.  However, this isn't easy to make good-looking animation when the game arbitrarily decides when to rotate or move your character during animations. Turn animations, starts, and many other types of clips are usually authored with very specific movement.  

Unreal does allow us to use full root motion for everything, but there are a number of reasons why this isn't the best approach to designing locomotion for your game.

![Full Root Motion](/assets/img/offsetrootbone/full_root_motion.png)

First of all, it means that the animation clips are making all of the decisions on how fast a character will accelerate, how fast they will turn, etc.  It's important to be able to iterate on these things quickly without having to re-author all of your animations.  In addition, we may want to use the same animation for several different scenarios -- for example, we may author a turn 180 degrees animation but we would like to use the same animation for turning 170 degrees, so we can't just allow the animation to dictate the rotation entirely.  Also, network replication becomes much more complicated if we need to follow complex trajectory paths that come from the root motion animation.

This is where the idea of the Offset Root Bone comes in.

## Translation and Rotation Modes

You'll notice that the Offset Root Bone node has two "mode" inputs of type `EOffsetRootBoneMode`.  The idea here is that we can dynamically manage when we are pulling data from the root motion in our animations, when we are fully capsule-driven, and when we are somewhere in-between.

The `EOffsetRootBoneMode` has several different modes:
 - Accumulate
 - Hold
 - Release
 - Interpolate

In the Game Animation Sample Project, the mode is generally kept to accumulate for full root-motion, but if you're intending to use a more traditional state machine with capsule-based locomotion system, I'd highly recommend managing this mode in your state machine.  Here's an explanation of the different modes:

### Accumulate

In this mode, we are still capsule-driven, but we rotate the skeleton's root bone to compensate, and create the illusion of full root-motion.  It's called "accumulate" because we are accumulating the capsule motion transforms, multiplying by the inverse, and then re-applying the root-motion transforms.

### Hold

In this mode, we keep the offset between the root bone and the capsule transform that has been accumulated, and we maintain it.  This is useful if you've used accumulate to deviate from the capsule transform (maybe during a turn), and then you need to keep the offset to avoid foot sliding.

### Release

During the release mode, we allow a spring to slowly return the root bone back to the capsule transform.  This would be useful maybe after a start turn animation that used "accumulate" -- maybe during a cycle where it's less noticeable to have sliding (or maybe we're using a foot plant system to correct the sliding procedurally).

### Interpolate

This mode is basically equivalent to being in both Accumulate and Release at the same time.  We are still consuming root motion transforms, but we are using a spring to slowly try to follow the capsule rotation.  This is really useful for smoothing out turning during a cycle animation.