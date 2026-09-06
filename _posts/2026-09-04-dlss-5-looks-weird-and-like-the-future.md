---
title: "DLSS 5 Looks Weird. It Also Looks Like the Future."
date: 2026-09-04 11:30:00 -0600
description: "The faces can be uncanny, the backlash is understandable, and renderer-grounded generation still looks like the beginning of a major change in real-time graphics."
categories: [machine-learning]
tags: [dlss, neural-rendering, real-time-graphics, nvidia]
card_image:
  path: /assets/img/blog/dlss-5-face-thumbnail.jpg
  alt: "A close crop of a ramen chef rendered with NVIDIA DLSS 5 enabled"
  source: NVIDIA
  source_url: https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/
featured: false
content_type: article
sections: [blog]
---

<figure class="article-lead-image">
  <img src="{{ '/assets/img/blog/dlss-5-ramen-chef-on-full.jpg' | relative_url }}" alt="NVIDIA's ramen chef example rendered with DLSS 5 enabled" width="3840" height="2160" decoding="async">
  <figcaption>DLSS 5 enabled on NVIDIA’s ramen-chef example. Image: <a href="https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/">NVIDIA</a>.</figcaption>
</figure>

DLSS 5 has been online for about five minutes, which naturally means the internet has already reached a calm, measured consensus.

It is either the death of art or the invention of seeing.

The recent clips are not difficult to make fun of. Faces suddenly acquire pores, makeup, years, or an entirely new relationship with reality. Older games can look as though a very expensive camera has been pointed at actors who are still trapped inside twenty-year-old animation rigs. In the worst examples, the technology does not improve the art direction so much as arrive with its own art direction and start moving furniture.

I understand the backlash. Some of the results look bad. Some look deeply weird. Changing the apparent age, identity, expression, or styling of a face is not a small rendering error. It is the sort of error humans are unusually good at noticing.

But I also think the backlash is missing the larger story.

DLSS 5 is not just another upscaler. It is an early attempt to use a generative model as part of the final real-time rendering process. The current version is imperfect, expensive, and sometimes alarmingly enthusiastic. It is also a glimpse of a rendering pipeline that can produce visual detail conventional real-time methods could not deliver broadly at the same frame budget.

The long-term direction is more significant than whether every face looks good this week.

## Yes, the faces can be uncanny

Faces are where this technology is most impressive and least forgiving.

Skin is not a coloured shell. Light enters it, scatters, and exits somewhere else. Tiny changes in roughness, translucency, blood flow, facial hair, normal detail, and shadowing all affect whether a face looks alive. Hair, eyes, teeth, and the wet line around an eyelid each come with their own small collection of rendering problems. Then all of it has to remain stable while the character moves, the camera moves, the lighting changes, and the frame finishes in a few milliseconds.

Games solve these problems with a stack of clever approximations. Good artists and rendering engineers can produce remarkable results with those approximations. They are still approximations, operating within strict budgets.

DLSS 5 has learned appearance priors for things such as skin, hair, fabric, foliage, and lighting. That lets it synthesize details the source renderer may only describe crudely. It also means the model can be confidently wrong in ways a conventional shader would never attempt.

The recent experiments make that trade-off extremely visible.

<div class="social-example">
  <blockquote class="twitter-tweet" data-dnt="true"><a href="https://twitter.com/dvesf_yt/status/2093219701711122675">A recent The Last of Us Part II before-and-after test on X</a></blockquote>
  <p class="social-example__caption">A face gains striking material detail, but also appears older and different. This is exactly where “more realistic” and “more faithful” stop being synonyms.</p>
</div>

<div class="social-example">
  <blockquote class="twitter-tweet" data-dnt="true"><a href="https://twitter.com/WreckedelkJr/status/2093896139523187055">An extreme DLSS 5 test in Halo on X</a></blockquote>
  <p class="social-example__caption">An intentionally aggressive test in an older game. Impressive as a stress test; less convincing as an art-directable result.</p>
</div>

These clips are useful, but they need a large asterisk. Much of what has circulated over the past few days comes from people injecting leaked or experimental DLSS 5 components into games that were not authored, integrated, masked, or tuned for it. Turning every dial to eleven is an excellent way to learn what a system can do. It is not necessarily a fair preview of what a developer would ship.

It does, however, expose the failure modes. The model can over-interpret a face. It can add material response that clashes with the surrounding scene. It can push one part of an old game toward photorealism while geometry, animation, and everything else remain firmly in 2004.

Those are real problems. They are also engineering problems, not proof that the entire direction is a dead end.

## This is not really super sampling anymore

The name “DLSS” now has to cover a surprisingly large family reunion.

Earlier DLSS systems primarily reconstructed a higher-resolution image or generated intermediate frames from existing rendered information. DLSS 5 does something more fundamental: it generates the final displayed appearance.

NVIDIA’s [technical description of DLSS 5](https://research.nvidia.com/labs/adlr/DLSS5/) calls it a 3D-guided, one-step pixel-space diffusion model. At inference time it is conditioned on the current rendered frame, engine motion vectors, temporal state, and art-direction controls. During training it also uses renderer-derived scene attributes to learn how to remain anchored to the authored scene.

Unlike prompting a video model and hoping it remembers who the protagonist is, the conventional renderer still supplies the geometry, composition, movement, and a structured description of the scene. The neural renderer supplies appearance knowledge that would be difficult or expensive to simulate directly.

Or, less formally: the game still tells the model what is there and where it is. The model gets a controlled opportunity to make it look more like a photograph.

The “controlled” part is doing a lot of work in that sentence.

## The quality ceiling has moved

The strongest case for DLSS 5 is not that every current example looks better. It is that some current examples contain visual information we normally cannot afford in a real-time frame.

Look at the good face examples and ignore, for a moment, whether you prefer the result. Look at the light passing through ears, the response of skin under shadow, the fine occlusion around hair, the variation across a material, and the way small facial forms become readable. Producing all of that conventionally, across many characters and lighting conditions, is difficult and expensive. Producing it at scale, at high resolution, and at real-time frame rates is another problem entirely.

<div class="social-example">
  <blockquote class="twitter-tweet" data-dnt="true"><a href="https://twitter.com/DanielVavra/status/2094134321653129450">Daniel Vávra compares a Kingdom Come: Deliverance II character with and without DLSS 5</a></blockquote>
  <p class="social-example__caption">The useful argument here is not that the neural result must be preferred. It is that an engine limitation is not automatically the artist’s intended final image.</p>
</div>

That last point complicates the most common criticism: that neural rendering necessarily overrides artistic intent.

Sometimes it absolutely can. The viral face examples demonstrate that with impressive efficiency. But the image produced by the conventional renderer is also shaped by compromises: shader complexity, memory, frame time, platform targets, production schedules, and what the engine happens to support. A missing helmet shadow is not sacred merely because rasterization failed to draw it.

The goal should not be to preserve every limitation of the source frame. It should be to preserve what the artists meant to preserve.

That requires better control than “AI on” and “AI off.”

## Artist control is the actual product

NVIDIA says DLSS 5 integrations provide strength, colour, and masking controls, including per-pixel control over where the neural uplift should apply. In NBA 2K27, Visual Concepts says it uses those controls to protect player likenesses while tuning materials and lighting. NVIDIA’s [launch documentation](https://www.nvidia.com/en-us/geforce/news/dlss-5-3d-guided-neural-rendering/) describes structure, tone, and semantic masks intended to constrain the result.

That is the right direction, but the existence of a control does not prove the control is good enough.

For this to work in production, artists need predictable ways to lock identity, preserve intentional stylization, limit particular material changes, diagnose temporal failures, and compare results across lighting and animation. The model cannot behave like a mysterious finishing filter applied after everyone has gone home. It has to behave like part of the renderer: inspectable, repeatable, and subordinate to the art direction.

I expect this is where much of the next several years of work will happen. Better models will matter, but so will better conditioning, masks, training data, debugging tools, and integration into actual content pipelines. The revolution will need a surprisingly large number of sliders.

## It is already getting faster

The performance criticism is also fair. Neural rendering that makes a game look better while cutting the frame rate in half is not a universally compelling bargain, especially when conventional rendering, upscaling, and frame generation are already stacked together.

But this is exactly the sort of cost that tends to change quickly.

NVIDIA says it achieved a fivefold performance improvement between the March demonstration and the September release, moving from two RTX 5090s to a single RTX 50-series GPU. The company also says further model and pipeline optimizations are in development. Those are vendor-reported numbers, and independent testing is still necessary, but the direction is believable: inference software, model architecture, hardware, and integration are all moving at once.

The visual quality will improve for the same reason. Today’s failures are not subtle, which is embarrassing for a launch and extremely useful for development. We now have a large public catalogue of exactly where the model loses identity, over-sharpens a material, breaks temporal coherence, or bulldozes a style. Those examples are practically a training curriculum.

## The beginning of the end—slowly

I think DLSS 5 is the start of the end of traditional raster-based rendering as the sole author of the final image.

That does not mean rasterization disappears next Tuesday. NVIDIA itself describes DLSS 5 as an extension of the existing pipeline, not a replacement for rasterization, ray tracing, or path tracing. Geometry still needs to be transformed. Visibility still needs to be resolved. Motion vectors and stable engine buffers still need to exist. Games still need a deterministic world underneath the generated appearance.

The more likely transition is hybrid. The conventional renderer becomes the grounded, controllable description of the scene. Neural systems take on more of the expensive work of turning that description into the final pixels. Over time, we may render less of what the player literally sees and more of the evidence a model needs to produce it faithfully.

That is a major change in what a renderer is for.

There will be bad implementations. There will be games where the technique is inappropriate. There will be a great deal of marketing language trying to convince us that a wet-looking forehead is the same thing as photorealism. None of that makes the underlying idea unimportant.

DLSS 5 occasionally looks bad because it is attempting something much harder than making a low-resolution image sharper. It is trying to synthesize the final appearance of an interactive world, in real time, while remaining tied to authored geometry and intent.

It does not always succeed yet.

The surprising part is how often it already comes close.

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
