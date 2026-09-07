---
title: "Audio-Driven Animation in Unreal Engine 5.5"
date: 2024-11-18 09:00:00 -0700
description: "Some early thoughts on MetaHuman Animator's new ability to turn a recorded voice performance into full-face animation."
categories: [technical-art]
tags: [unreal-engine, metahuman, animation, machine-learning]
card_image:
  path: /assets/img/blog/metahuman-audio-driven-animation.png
  alt: "A rendered MetaHuman beside the MetaHuman logo"
  source: "Epic Games, MetaHuman documentation"
  source_url: https://dev.epicgames.com/documentation/en-us/metahuman/audio-driven-animation-for-metahuman
featured: false
content_type: article
sections: [blog]
---

<figure class="article-lead-image">
  <img src="{{ '/assets/img/blog/metahuman-audio-driven-animation.png' | relative_url }}" alt="A rendered MetaHuman beside the MetaHuman logo" width="1920" height="335" decoding="async">
  <figcaption>MetaHuman Animator can now generate facial animation from a recorded voice performance. Image: Epic Games.</figcaption>
</figure>

One of the quieter additions to Unreal Engine 5.5 may turn out to be one of the most important: [MetaHuman Animator can now generate facial animation from audio alone](https://forums.unrealengine.com/t/metahuman-ue5-5-release/2122442).

The workflow is simple. Import a recorded voice performance, select it in a MetaHuman Performance asset, and process it. The solver generates animation across the full MetaHuman facial rig, including lip sync and plausible upper-face movement. It works locally, supports a range of voices and languages, and can batch-process multiple recordings.

This concept isn't new. Audio-driven facial animation has existed in production pipelines for years, often through systems that analyzed speech and converted it into phonemes, visemes, or rig controls. [FaceFX](https://facefx.com/) is one well-known example, having been used to generate dialogue-driven facial animation for games and other interactive projects. SGX also explored earlier forms of speech-driven facial animation, using audio analysis and procedural techniques to drive character rigs before these modern machine-learning systems showed up.

More recently, [NVIDIA's Audio2Face](https://developer.nvidia.com/blog/nvidia-omniverse-audio2face-app-now-available-in-open-beta/) has generated facial animation from voice input in real time and retargeted that motion onto a character. At EA, I was part of the small group that started [SEED's Voice2Face](https://www.ea.com/technology/news/sca22-voice2face-audio-driven-facial-animation), which explored a related problem: generating facial and tongue animation directly from recorded speech, then mapping the result into a production rig. The work was later presented publicly at the Eurographics Symposium on Computer Animation in 2022.

What feels new here is not the basic idea so much as the quality and where Epic has placed it. The results are a substantial step forward from anything I had seen from an audio-driven system at the time. The mouth shapes are more convincing, but the larger improvement is that the rest of the face feels involved too; it reads more like a performance than a lip-sync pass.

MetaHuman Animator also brings that quality directly into a character system and workflow that many Unreal teams already use. There is no separate application to learn, no custom retargeting step to build, and less friction between generating a performance and editing it alongside the rest of the character animation.

There is no camera to calibrate, no facial capture take to manage, and no actor video that needs to stay aligned with the final edit. There is just the audio file that a production already has—or, in some cases, a temporary or synthetic voice that is enough to begin building the scene.

That changes where facial animation can reasonably fit into a project.

## A useful first pass

Audio-driven animation is not the same thing as capturing a facial performance. Audio tells us a great deal about timing, emphasis, and emotion, but it does not contain every raised eyebrow, glance, or asymmetric expression an actor might make.

Still, not every line of dialogue receives the same level of facial-animation treatment. Early in production, a team may be working with a temporary TTS voice before final casting or recording is complete. Later, some conversations may never receive dedicated facial-performance capture at all, particularly dialogue intended for silver- or bronze-level content rather than a hero cinematic.

For those cases, the choice is often not between audio-driven animation and a carefully captured performance. It is between generating a credible facial pass automatically and leaving the character with limited or generic motion. Producing that first pass has traditionally meant choosing between a fairly blunt procedural lip-sync system and a great deal of manual work.

Earlier tools such as FaceFX and SGX helped establish this workflow by turning speech analysis into usable animation controls. They were valuable because they made dialogue-driven facial animation scalable, but their output was generally more constrained by phoneme timing, viseme libraries, and procedural rules. The newer generation of learned systems can make broader inferences about expression and movement, producing a result that feels less like a sequence of mouth shapes and more like a complete facial interpretation.

MetaHuman Animator now offers a much stronger starting point. The output can carry the rhythm of the performance across the entire face rather than moving only the jaw and a few mouth shapes. An animator can then spend time on the moments that need specific intent instead of building every syllable from scratch—or use the generated result as a finished-enough solution for content that does not justify a full capture and cleanup pass.

I think that is the right way to look at this kind of tool. It is less interesting as a promise to finish every performance automatically than as a way to make facial animation practical across more levels of content, from early TTS-driven prototypes to dialogue that needs to ship without dedicated facial capture.

## Iteration gets cheaper

Dialogue changes constantly during production. Lines are rewritten, alternate takes arrive, timing shifts, and localization replaces the whole performance in another language. Facial animation often sits downstream from all of those decisions, which makes every change more expensive than it first appears.

An audio-only solve makes those changes less disruptive. A new recording can produce a new animation pass without recreating a capture setup. The same is true when a temporary TTS voice is replaced by a final performance: the audio can change without requiring the team to rebuild the entire facial-animation process from the beginning. Because the processing runs locally and supports batches, it also looks useful for teams dealing with a large volume of dialogue rather than a handful of hero cinematics.

Localization is an especially compelling use case. A production can generate language-specific facial motion from the localized voice track instead of asking one animation to fit several very different performances. The result will still need review, but it is a much quicker solution than re-animating or grabbing new performance capture.

There is also a straightforward benefit during layout. Designers and cinematic artists can evaluate a scene with facial movement earlier, while the edit and performance are still changing. Temporary animation has a habit of surviving longer than anyone intended; raising the quality of that temporary pass is useful even when it is eventually replaced. For lower-priority conversations, that same pass may be all the facial animation the scene needs.

## What I would want to test

The interesting questions are not whether the solver can make a MetaHuman's mouth move. Epic's examples already show that it can. I would want to know how reliably the result holds up across the awkward material that appears in a real project:

- quiet, breathy, or heavily stylized delivery;
- shouting, laughter, and nonverbal sounds;
- noisy recordings and aggressive compression;
- invented names and unusual phonemes;
- interruptions, short reactions, and overlapping speech;
- performances where the intended expression contradicts the apparent tone of the voice;
- temporary TTS voices that may have unusual timing, emphasis, or pronunciation.

I would also want to see how easy the curves are to edit after processing. A generated result is much more valuable when an animator can correct it locally without fighting hundreds of noisy keys or rerunning the entire solve.

These are normal production questions, not reasons to dismiss the feature. Every capture or procedural-animation system has a cleanup story. The useful comparison is how much good animation we get before that cleanup begins, and whether the output remains workable afterward. For some content, the relevant question may simply be whether the generated result is convincing enough to avoid manual facial animation altogether.

## More than lip sync

The phrase *audio-driven animation* can make this sound like a new version of automated mouth shapes. The more significant idea is that a learned system can infer a broader facial performance from information that does not completely specify it.

That inference will sometimes be wrong. Two people can say the same line with similar timing while making very different expressions. There is no single correct face hidden inside a waveform. The solver has to choose a plausible interpretation.

For background characters, prototypes, TTS-driven scenes, localization, and silver- or bronze-level dialogue systems, plausible may be exactly the right target. For close-ups and important dramatic beats, the generated animation is more likely to be a base layer that needs direction.

The important thing is that those two uses can share the same pipeline. Teams do not need one system for cheap dialogue and an entirely separate representation for higher-quality work. The result lands on the MetaHuman facial rig, where it can continue through the existing animation workflow.

## A small feature with a large surface area

Unreal Engine 5.5 has much louder features than this one. MegaLights will make better screenshots, and the animation-tooling improvements are easier to demonstrate on stage.

Audio-driven facial animation is less spectacular at first glance. It is also the sort of feature that could quietly touch early prototypes, temporary TTS performances, lower-priority conversations, thousands of lines of dialogue, every localization pass, and months of iteration on a production.

It will not remove the need for performance capture or facial animators. It may remove a lot of work that neither of them particularly needed to be doing—and make convincing facial animation available in places where a dedicated performance was never going to happen.
