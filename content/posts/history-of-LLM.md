---
title: "The history of LLM, starting from n gram"
date: "Saturday, 9 May 2026"
draft: true
slug: "self"
tags: []
categories: [LLM]
math: true
---
To me, the inner system of large language models still feel like magic, even though I use Claude and ChatGPT for my daily tasks. I have read *Attention Is All You Need* before, but I still cannot control myself to look behind the curtain of modern LLMs: Why do we need each component, and what motivated its development? Therefore, I have made a plan to study LLMs from both theoretical and practical perspectives.

## Most LLMs Are Answering One Question
Modern LLM papers often look complicated, with different terminology, architectures, and elaborate figures. However, most autoregressive language models are ultimately designed to answer the same fundamental question: How to model the joint probability of a sentence $P(w_1, \ldots, w_{n-1}, w_n)$ for a sentence with $n$ tokens? 

This can lead to further subtasks, such as forecast. Suppose we have observed $n-1$ tokens $
w_1, w_2, \ldots, w_{n-1}$. The goal is to estimate the probability distribution of the next token $w_n$:
$$
P(w_n \mid w_1, \ldots, w_{n-1})
=
\frac{P(w_1, \ldots, w_{n-1}, w_n)}
{P(w_1, \ldots, w_{n-1})}.
$$
This driven the modern applications as ChatGPT and Claude. This next-token prediction objective underlies modern autoregressive language models and applications such as ChatGPT and Claude. By repeatedly predicting and sampling the next token, the model can generate a complete sequence.

Another modelling direction is masked language modelling. Instead of predicting only the next token, the model hides a token at position (s) and attempts to recover it from the surrounding context. Its objective is to estimate:

$$
P\left(
w_s
\mid
w_1,\ldots,w_{s-1},w_{s+1},\ldots,w_n
\right).
$$

Equivalently, this conditional probability can be written as:

$$
P\left(
w_s
\mid
w_1,\ldots,w_{s-1},w_{s+1},\ldots,w_n
\right)
=
\frac{P(w_1,\ldots,w_n)}
{P(w_1,\ldots,w_{s-1},w_{s+1},\ldots,w_n)}.
$$

Unlike an autoregressive model, which uses only the preceding context when predicting a token, a masked language model can use context from both before and after the masked position. This driven the BERT style model.

Although this looks mathematically straightforward, directly estimating these probabilities is impractical. The number of possible token sequences grows exponentially with sequence length, and most possible sequences will never appear in a finite training dataset. A model therefore cannot simply store the probability of every possible context and continuation.

The history of modern language models is the story of how one can continuing attempt to solve this problem:

1. How can we represent the historical context efficiently?
2. How can we generalise to sequences that have not been observed before?
3. How can we calculate the next-token distribution quickly?

Different architectures, such as $n$-gram models, recurrent neural networks, LSTMs, and Transformers, provide different answers to these questions. We still briefly go through these models.

## N-gram Models: Pruning the Distant History

The idea behind an N-gram language model is to discard most of the distant history and approximate the next-token probability using only the most recent tokens. For example, a bigram model makes the approximation

$$
P(w_n \mid w_{n-1})
\approx
P(w_n \mid w_1,\ldots,w_{n-1}).
$$

This is a first-order Markov assumption: once the immediately preceding token $w_{n-1}$ is known, all earlier tokens are assumed to provide no additional information about $w_n$.

More generally, an N-gram model uses the preceding N-1 tokens:

$$
P(w_n \mid w_1,\ldots,w_{n-1})
\approx
P(w_n \mid w_{n-N+1},\ldots,w_{n-1}).
$$

The joint probability of a sequence can therefore be approximated as

$$
P(w_1,\ldots,w_n)
\approx
\prod_{t=1}^{n}
P(w_t \mid w_{t-N+1},\ldots,w_{t-1}),
$$

with suitable adjustments near the beginning of the sequence.

By restricting the history to the most recent N-1 tokens, an N-gram model makes the number of possible contexts independent of the total sequence length. Once N is fixed, the model has at most $V^{N}$ possible N-grams. Increasing the context length may provide more information for predicting the next token. However, it also makes the possible contexts much more numerous. As a result, longer N-grams appear less frequently in a finite training corpus, creating a trade-off between contextual information and data sparsity.

Although N-gram models are computationally feasible, they have several important limitations. They are essentially count-based lookup tables: probabilities are estimated from how frequently particular token sequences occur in the training corpus. Consequently, their performance depends heavily on the coverage and domain of the training data. For example, a model trained only on Shakespeare's works would be poorly suited to predicting language in a modern financial dialogue. Another problem is that many valid token sequences may never appear in the training data. Without smoothing or interporlation, an unseen N-gram is assigned a probability of exactly zero, even when the sequence is linguistically reasonable. Smoothing and back-off methods alleviate this problem by redistributing some probability mass to unseen or less frequent sequences.

Among these drawbacks, the most important is that traditional N-gram models, and more generally, models that treat tokens as discrete and unrelated symbols, cannot naturally capture semantic similarities between words. For example, such a model does not inherently know that *smile* is related to *happy*, or that *red* and *yellow* are both colour words. It can infer these relationships only indirectly from the exact sequences and co-occurrence patterns observed in the training data.

## Embedding


