---
title: "What Probes Can Tell Us About Truth, Deception, and Risk"
date: 2026-08-29 13:00:00 -0600
description: "Three papers on using simple probes to detect truth, strategic deception, and high-stakes interactions in language-model activations."
categories: [ai-safety]
tags: [mechanistic-interpretability, activation-probes, deception, monitoring]
card_image:
  path: /assets/img/blog/probes-truth-deception-risk-2400.png
  alt: "A diagram showing three probes reading truth, deception, and high-stakes signals from model activations"
  source: Original diagram
featured: false
content_type: article
sections: [blog]
---

<figure class="article-lead-image">
  <img src="{{ '/assets/img/blog/probes-truth-deception-risk-2400.png' | relative_url }}" alt="A diagram showing three probes reading truth, deception, and high-stakes signals from model activations" width="2400" height="1800" decoding="async">
  <figcaption>Three related probing problems with importantly different targets.</figcaption>
</figure>

I have been reading about probes as a follow-up to the ARENA material on mechanistic interpretability. Three papers in particular helped make the subject more concrete for me:

- Marks and Tegmark's [The Geometry of Truth](https://arxiv.org/abs/2310.06824)
- Apollo Research's [Detecting Strategic Deception Using Linear Probes](https://arxiv.org/abs/2502.03407)
- [Detecting High-Stakes Interactions with Activation Probes](https://arxiv.org/abs/2506.10805), presented at NeurIPS 2025

The common idea is straightforward. Run a language model, record its internal activations, and train a small classifier to predict some property from those activations. In these papers, that property is factual truth, strategic deception, or whether an interaction could have serious real-world consequences.

What I found interesting is how much useful information can sometimes be recovered with a relatively simple readout. At the same time, the three papers are asking different questions, and I think it is important not to collapse them into a single claim that we have found a general-purpose lie detector inside a language model.

## A linear probe, briefly

A model's residual stream at a particular layer is a high-dimensional vector. A linear probe learns a direction in that space that separates two labelled groups of examples. If examples on one side tend to be true and examples on the other tend to be false, the probe can use the position along that direction as a truth score.

This is deliberately a simple model. That simplicity is part of the appeal: if a linear classifier can recover a concept, then information about that concept is available in a fairly accessible form.

But decodable information is not automatically the same as a mechanism the model uses. A probe might rely on a correlated feature rather than the concept we intended to measure. It might separate examples accurately without identifying a direction that has any causal effect on the model's output. Generalization and intervention tests therefore matter at least as much as in-distribution accuracy.

## The geometry of factual truth

[The Geometry of Truth](https://arxiv.org/abs/2310.06824) studies simple factual statements using models from the LLaMA-2 family. The datasets include statements about cities, translations, and numerical comparisons, along with negated and logically combined versions of those statements.

The authors present three kinds of evidence that larger models develop a linear representation related to factual truth.

First, visualizations show true and false statements separating in activation space. Second, probes trained on one kind of statement can generalize to statements with different topics and structures. That generalization improves with model scale, suggesting that larger models may represent something more abstract than the surface form of a particular dataset.

Third, and most importantly, the paper includes causal interventions. The authors add or subtract a candidate truth direction during the model's forward pass and measure whether its prediction changes from true to false or vice versa. Their difference-in-means directions are not only useful classifiers; they are more causally connected to the model's output than some alternative probe directions.

That last result makes this paper especially interesting to me. A probe that classifies activations correctly tells us that some information is present. A successful intervention is stronger evidence that the direction is connected to the computation the model is actually performing.

The scope is still deliberately narrow. These are clear, simple factual claims, and the authors note that the feature might be difficult to distinguish from nearby ideas such as "commonly believed" or "verifiable." The experiments also use one model family. The result is not that truth has been solved as a single universal axis, but that there is meaningful, generalizable, and partly causal linear structure associated with factual truth in the models they studied.

## From falsehood to strategic deception

Factual truth and strategic deception are related, but they are not the same target. A model can make a false statement because it is mistaken. Deception implies that the model has information or context pointing one way while producing a response intended to lead someone another way.

Apollo Research's [deception-probes paper](https://arxiv.org/abs/2502.03407) tests whether a linear probe trained on relatively simple contrastive data can generalize to more realistic deceptive behaviour in Llama-3.3-70B-Instruct. The evaluation scenarios include an AI trading assistant concealing its use of insider information and a model deliberately underperforming on selected safety questions.

The reported classification results are strong: AUROCs between 0.96 and 0.999 across their evaluation datasets, with 95-99% of deceptive responses detected at a threshold set to produce a 1% false-positive rate on unrelated chat data.

One result I found particularly notable is that the probe can sometimes register deception before the response contains explicitly deceptive language. That suggests the activations can contain relevant information that is not obvious from the output text alone.

The failure cases are just as informative. The probe sometimes responds to whether a scenario is *about* deception rather than whether the current response is deceptive. It can also confuse an honest admission of earlier wrongdoing with present dishonesty. In other cases, averaging the score across a whole response hides a strong signal over only part of the text.

These examples show why a high score is not enough to establish what a probe has learned. "Deception," "a situation where deception would be useful," and "language associated with wrongdoing" may occupy nearby directions in activation space. A real monitoring system would need to separate those possibilities reliably.

The paper is appropriately cautious about deployment. The evaluated deception is often fairly explicit and may appear in the model's chain of thought, even though the probe is applied to response tokens. Ground-truth intent is also difficult to label, and ambiguous examples are inherently hard to evaluate. The authors describe the results as promising, but not yet reliable enough to serve as a robust defence on their own.

## Detecting when the situation is high-stakes

The [high-stakes interactions paper](https://arxiv.org/abs/2506.10805) looks at a different monitoring problem. It is not trying to determine whether the model is truthful or deceptive. It asks whether the user's request describes a situation in which a model's answer could cause substantial real-world harm—for example, medical, financial, or safety-critical advice.

The researchers train several probe architectures on synthetic examples and test them on varied out-of-distribution datasets. Their best overall design is an attention probe, which learns how to weight activation scores from different token positions rather than simply averaging them.

The probes perform comparably to prompted or fine-tuned medium-sized LLM classifiers while using roughly six orders of magnitude less additional compute. That comparison assumes the monitored model is already running, so its activations are available and the probe only adds a small readout on top.

The efficiency result makes the proposed deployment pattern more interesting than the classifier alone. A cheap probe can inspect every interaction, while uncertain examples are passed to a larger and more expensive monitor. The paper finds that this cascade can outperform either approach by itself at the same compute budget.

This is a practical use of interpretability-adjacent techniques. The probe does not need to provide a complete explanation of the model. It only needs to act as a useful early warning system and send the difficult cases to something more capable.

There are still important limits. At a 1% false-positive rate, the best probe detects only 43% of high-stakes cases, compared with 55% for the strongest LLM baseline. The definition of "high-stakes" is also subjective and context-dependent, and both the training and evaluation labels rely heavily on GPT-4o's interpretation of that concept. The authors also note that linear probes can be vulnerable to targeted adversarial attacks.

Those limitations reinforce the paper's proposed use of probes as one layer in a monitoring system, rather than the final authority making a safety decision.

## What connects these papers

Taken together, the papers show three different ways internal activations can be useful:

1. **Representation:** Is information about factual truth encoded in a form that a simple classifier can recover?
2. **Monitoring model behaviour:** Do the activations contain a signal associated with strategic deception, including cases where the output alone looks benign?
3. **Monitoring context:** Does the interaction itself appear consequential enough to justify more scrutiny?

The targets become less clean as we move down that list. The truth paper uses simple factual statements with controlled labels. Strategic deception depends on inferred intent. High stakes depends on a contextual judgement about possible consequences. That does not make the later targets less useful, but it makes evaluation and interpretation more difficult.

I also think these papers clarify the difference between interpretability and monitoring. A linear probe can be operationally useful without giving us a satisfying mechanistic explanation. It may tell us that a safety-relevant signal exists in the activations and provide a cheap way to detect it, while leaving open how that signal was computed and exactly what it represents.

For AI safety, that still seems valuable. We should not expect one technique to provide a complete solution. A practical system might combine activation probes, larger model-based monitors, behavioural evaluations, causal interventions, and human review. The very low cost of probes makes them particularly attractive as the first stage of that system.

## What I want to understand next

The question I keep coming back to is generalization. A probe can perform extremely well on a test set and still fail if the deployment environment changes, if a nearby correlated feature becomes more important, or if a capable model learns to evade the monitor.

I would like to understand more about how researchers determine what a probe is actually detecting, rather than only measuring its accuracy. The causal work in The Geometry of Truth points in one direction. The token-level analysis and failure cases in the deception paper point in another. Both make the internal signal more legible than a single aggregate performance number.

I am also interested in how these methods behave across different model families and at larger scales. If useful representations become more abstract and general with scale, as the truth paper suggests, probing may become more effective. On the other hand, more capable models may produce subtler behaviours and present a harder monitoring problem.

My main takeaway is cautiously positive. These papers do not show that we can reliably read a model's intentions. They do show that safety-relevant information can sometimes be recovered from internal activations with surprisingly simple tools, and that those tools may be cheap enough to use continuously. That seems like a useful capability to develop, as long as we remain precise about what each probe measures and what evidence supports that interpretation.
