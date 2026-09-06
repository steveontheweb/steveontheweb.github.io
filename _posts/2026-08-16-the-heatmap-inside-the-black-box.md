---
title: "Visualizing Attention in Language Models"
date: 2026-08-16 10:00:00 -0600
description: "Some notes on attention patterns, induction heads, and what I found useful in ARENA's introduction to mechanistic interpretability."
categories: [ai-safety]
tags: [mechanistic-interpretability, transformer-lens, induction-heads, arena]
card_image:
  path: /assets/img/blog/mechanistic-interpretability-attention.png
  alt: "An illustrative transformer attention matrix with an induction-head stripe"
  source: Original diagram
featured: false
content_type: article
sections: [blog]
---

<figure class="article-lead-image">
  <img src="{{ '/assets/img/blog/mechanistic-interpretability-attention.png' | relative_url }}" alt="An illustrative transformer attention matrix with an induction-head stripe" width="1200" height="900" decoding="async">
  <figcaption>An illustrative attention pattern for a repeated sequence. Not output from a particular model run.</figcaption>
</figure>

I recently finished [ARENA’s introduction to mechanistic interpretability](https://learn.arena.education/chapter1_transformer_interp/02_intro_mech_interp/). It was my first time working through mechanistic interpretability in a practical way, using TransformerLens to inspect the activations and weights of a small transformer.

The part I found most interesting was being able to visualize the model’s attention patterns. Language models are often described as black boxes, and although their weights and activations are technically available, that does not mean they are easy to understand. An attention visualization is one relatively simple way to start making some of that internal computation readable.

## Visualizing attention patterns

An attention pattern shows how strongly one token position attends to other token positions. The destination tokens are placed on one axis, the source tokens on the other, and each cell is coloured according to its attention weight.

The [ARENA exercises](https://learn.arena.education/chapter1_transformer_interp/02_intro_mech_interp/2-finding-induction-heads/) use Neel Nanda’s [TransformerLens](https://transformerlensorg.github.io/TransformerLens/) and CircuitsVis to display the attention pattern for every head in a model. The model is run with an activation cache, and the cached attention patterns can then be displayed alongside the input tokens.

What surprised me was how easy it was to recognize some basic behaviours in the results. Some heads attend mainly to the previous token. Others attend to the current token, or use the first token as a default position. These behaviours appear as distinctive lines or columns in the visualization.

This is obviously not the same thing as reading the model’s thoughts, but it does provide a useful view into how information is being routed through the transformer. Instead of only looking at a large collection of weights, we can observe a particular component doing something consistent on a particular input.

Attention patterns only show **where** information is being read from. They do not necessarily show **what** information is being moved, or whether that information has an important effect on the model’s output. Still, they provide a useful place to begin forming more specific hypotheses.

## Finding induction heads

The main example used throughout the chapter is an induction head. The basic behaviour can be represented as:

`[A] [B] ... [A] → [B]`

If a model sees a token it has seen before, an induction head can attend to what followed that token previously and predict that the same continuation will happen again. This can support repeated phrases and more general forms of in-context pattern completion.

The important part is that the model does not need to have memorized a particular relationship between `A` and `B` during training. The exercise can use a randomly generated sequence of tokens. The relationship is provided in the context, and the model applies the same operation to the repeated sequence.

Induction heads have a characteristic diagonal stripe when their attention patterns are visualized on repeated input. Seeing that stripe is interesting because it connects a visible pattern in the model’s activations to a specific proposed algorithm.

## Understanding the induction circuit

[Neel Nanda’s mechanistic-interpretability glossary](https://www.neelnanda.io/mechanistic-interpretability/glossary) separates the work of an attention head into two useful questions:

- The QK circuit helps decide **where** to move information from and to.
- The OV circuit helps decide **what** information to move.

For the induction circuit studied in ARENA, two attention heads compose across layers. A previous-token head writes information into the residual stream about the token that came before. A later induction head uses that information to find the token following an earlier occurrence, and then increases the probability of that token being predicted next.

Callum McDougall’s [illustrated walkthrough of induction heads](https://www.lesswrong.com/posts/TvrfY4c9eaGLeyDkE/induction-heads-illustrated) was particularly useful here. The diagrams build the circuit up one step at a time and show how the heads communicate through the residual stream. This helped make the relationship between the attention patterns, the weight matrices, and the overall algorithm much clearer to me.

The model used in these exercises is intentionally small and simplified, but the result is still significant: a learned neural network contains a recognizable algorithm, and we can investigate how that algorithm is implemented in its weights.

## Visualization is only the starting point

It would be easy to look at an attention pattern, assign a plausible description to it, and stop there. The more important part of mechanistic interpretability is testing whether that description is actually correct.

The ARENA chapter moves from visually inspecting attention to writing detectors for specific patterns. It then uses logit attribution to ask which components contribute to the correct prediction, ablation to see what breaks when a head is removed, and direct weight analysis to investigate the QK and OV circuits. The [reverse-engineering exercises](https://learn.arena.education/chapter1_transformer_interp/02_intro_mech_interp/4-reverse-engineering-induction-circuits/) explicitly distinguish noticing a feature from explaining the mechanism that produces it.

That progression is roughly:

1. Observe a pattern.
2. Form a hypothesis about what it is doing.
3. Test whether the component affects the behaviour.
4. Inspect the weights and composition to understand why.

I found this progression useful because each step provides stronger evidence than the one before it. The visualization suggests a possible function. Attribution and ablation test whether the component is important to the behaviour. Looking directly at the weights and the composition between heads helps explain why the behaviour occurs.

## Why this is relevant to AI safety

If increasingly capable models are going to make consequential decisions, behavioural testing alone may not give us all the information we need. We would also like to understand which internal representations and computations produce a behaviour, whether those mechanisms remain stable in unfamiliar situations, and whether the model is relying on something different from the explanation we have assigned to it.

Mechanistic interpretability offers a concrete approach to that problem: identify a behaviour, find candidate components, test them, and recover enough of the circuit to describe the computation taking place.

The induction-head example does not solve alignment. It is a relatively clean circuit in a small, deliberately interpretable model. Larger models contain many more interacting components, and features may be distributed across the network or represented in superposition. Understanding a simple pattern-completion circuit is very different from understanding the mechanisms behind more complex behaviours such as planning or deception.

However, I still find the basic result encouraging. It shows that some learned computations can be isolated, tested, and described mechanistically. Even if the same methods do not scale directly to every behaviour we care about, they provide a useful framework for investigating what is happening inside a model rather than relying only on its outputs.

## Next: probes and representations

The next ARENA section covers [probing and representations](https://learn.arena.education/chapter1_transformer_interp/1_3_overview/), which I am looking forward to.

Attention patterns help show how information is routed between positions. Probes ask a different question: what information can be decoded from the model’s internal activations, and where does that information appear?

If a simple classifier can recover a concept from a particular layer, then the model represents enough information there for the classifier to use. One complication is that information being decodable does not necessarily mean the model uses that information itself. I am interested in learning how probes are evaluated, and how they can be combined with causal methods to distinguish between information that is merely present and information that affects the model’s behaviour.

## Closing thoughts

The attention visualizations were the most immediately interesting part of the chapter for me. They make it possible to see consistent structure in the way a model routes information, and induction heads provide a good example of how that structure can be connected to a specific algorithm.

At the same time, the exercises make it clear that visualization alone is not enough. A useful explanation needs to connect attention patterns, activations, weights, and model behaviour, and it needs to survive interventions such as ablation.

I am still early in learning this material, but completing the chapter made the idea of looking inside a language model feel much more concrete. I am looking forward to continuing with probes and representations next.
