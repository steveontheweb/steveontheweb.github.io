---
layout: post
title: AnimToTexture in Unreal
date: 2023-04-10 18:32 -0600
---

![Animated Crowd as Foliage](/assets/img/animtotexture/Foliage.gif)

Anyone working in game development knows that placing a large number of animated characters on the screen can be nearly impossible when you're trying to keep framerates high.  Unfortunately, skeletal meshes are slow for a number of reasons.  

Vertex animation is a technique to optimize when rendering large groups of skeletal meshes, and it involves baking down animation data into textures for extremely efficient animation and rendering.  

**AnimToTexture** is a plugin in Unreal that can generate vertex or bone-animated meshes and their corresponding textures.  This was used to handle the crowds for the Matrix Awakening demo, and was made available originally in the City Sample Demo.  The plugin is now avaliable in Unreal 5.1 and can be easily enabled in the Edit > Plugins menu. There are some great references for working with AnimToTexture here:

- [Stephen Phillips' Post on Epic Dev Community](https://dev.epicgames.com/community/learning/tutorials/daE9/unreal-engine-baking-out-vertex-animation-in-editor-with-animtotexture)
- [Kevin Romand's video walkthrough](https://www.youtube.com/watch?v=vrlFozqB0jA&ab_channel=TrashPraxis)
- [Kevin Romand's Editor Utility Widget and Blueprint Spawner](https://github.com/kromond/AnimToTextureHelpers)
  + Make sure you download the individual .uasset files from Github, since they won't work after being extracted from a Github ZIP archive

If you're interested in learning how to use AnimToTexture, I highly recommend starting with the resources above, but there are a few key notes to remember:

- Use **Enforce Power of Two** if you want your animation to be smooth.  The code checks for this flag and the 16-bit precision option before using high-quality animation.

![Enforce Power of Two](/assets/img/animtotexture/enforce_power_of_two.png)

- If you're using PerInstanceRandom as mentioned by Stephen Phillips to randomize the animation starting time, I recommend using a multiply node to multiply this by some larger negative number to give a bit more variety than just 1 second.   This will also ensure that you have randomized animation during Movie Render Queue renders (if you're using a positive number here, renders will potentially come out with frozen animation for a few frames).

![Multiply Node](/assets/img/animtotexture/multiply_node.png)