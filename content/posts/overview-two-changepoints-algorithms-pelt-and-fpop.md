---
title: "Overview two changepoints algorithms – PELT and FPOP"
date: "Sat, 11 Dec 2021 20:18:53 +0000"
draft: false
slug: "overview-two-changepoints-algorithms-pelt-and-fpop"
tags: []
categories: []
math: true
---
<span class="has-inline-color has-secondary-color">Hi! As you know I have started my first year of PhD, and my research direction is anomaly detection. And it could be seen as some special changepoint questions. So I started to write some notes during my PhD learning period. This is suitable for people already familiar with changepoint algorithms and who wants to have a look. I am happy to discuss with you my notes if there is something I misunderstand:)</span>

# To Detect Changepoints

The story begins with detecting changes in a sequence of observations.  
Assume we observe data from time $1$ to time $t$, and denote this sequence by
$y_1, y_2, \ldots, y_t$. Our goal is to infer both the **number** and the **locations**
of changepoints, denoted by $\tau$.

This problem can be naturally reformulated as a **segmentation (classification) problem**:
how can we partition an ordered sequence into several segments as accurately as possible?
Based on this idea, we consider the following minimisation problem:

$$
\min_{K \in \mathbb{N},\ \tau_1,\tau_2,\ldots,\tau_K}
\sum_{k=0}^{K} L\!\left(y_{\tau_k+1:\tau_{k+1}}\right),
$$

where $L\!\left(y_{\tau_k+1:\tau_{k+1}}\right)$ represents the cost of modelling the data
$y_{\tau_k+1}, y_{\tau_k+2}, \ldots, y_{\tau_{k+1}}$ as a single segment (for example,
the negative log-likelihood), and $K$ denotes the total number of changepoints.

This formulation corresponds to partitioning the ordered sequence into $K+1$ segments
and selecting the segmentation that minimises the total cost.

However, a problem arises if we directly minimise this expression.  
For example, suppose we observe only three data points. If we choose $K = 2$, each segment
contains exactly one observation. In this case, the cost of each segment can be zero,
leading to a total cost of zero. Therefore, the unconstrained optimisation always favours
the maximum possible number of changepoints.

**Hence, we need to introduce constraints or penalties.**

---

# Constrained and Penalised Optimisation Problems

If the true number of changepoints $K$ is known, we can force the algorithm to find exactly
$K+1$ segments. This leads to the **constrained optimisation problem**:

$$
Q_n^K =
\min_{\tau_1,\tau_2,\ldots,\tau_K}
\sum_{k=0}^{K} L\!\left(y_{\tau_k+1:\tau_{k+1}}\right).
$$

The right-hand side can be solved efficiently using **dynamic programming**, yielding the
optimal locations of $K$ changepoints. However, this approach requires prior knowledge of
the number of changepoints, which is usually unavailable in practice.

When the number of changepoints is unknown, one approach is to specify a maximum number of
changepoints (for example, $K_{\max} = 10$), compute $Q_n^k$ for all
$k = 0,1,2,\ldots,K_{\max}$, and then select the best solution. In general, this can be
written as

$$
\min_k \left[ Q_n^k + g(k,n) \right],
$$

where $g(k,n)$ is a penalty function that discourages overfitting by introducing too many
changepoints.

Motivated by this idea, the problem can be reformulated as a **penalised optimisation problem**.
If the penalty is linear in $k$, for example $g(k,n) = \beta k$ with $\beta > 0$, then we define

$$
Q_{n,\beta}
= \min_k \left[ Q_n^k + \beta k \right]
= \min_{k,\tau}
\left[
\sum_{k=0}^{K} L\!\left(y_{\tau_k+1:\tau_{k+1}}\right) + \beta K
\right].
$$

This is known as the **penalised changepoint optimisation problem**, and it forms the basis
of many modern changepoint detection algorithms.

---

# Dynamic Programming for the Penalised Problem

The penalised optimisation problem can be solved using dynamic programming.
Let $Q_{0,\beta} = -\beta$. Then for $t = 1,2,\ldots,n$, we have the recursion

$$
Q_{t,\beta}
= \min_{0 \le \tau < t}
\left[
Q_{\tau,\beta}
+ L\!\left(y_{\tau+1:t}\right)
+ \beta
\right].
$$

This algorithm has a worst-case computational complexity of $\mathcal{O}(n^2)$,
since at each step we must consider all previous changepoint candidates.

To reduce the computational cost, two important approaches have been proposed:
**PELT** and **FPOP**.

---

# PELT (Pruned Exact Linear Time)

Consider the following inequality: assume there exists a constant $a$ such that

$$
Q_\tau + L\!\left(y_{\tau+1:t}\right) + a > Q_t.
$$

If this condition holds, then $\tau$ can never be the optimal last changepoint for any future
time point. The left-hand side represents the cost of modelling the data with a changepoint
at $\tau$, while the right-hand side represents a cheaper alternative.

As a result, $\tau$ can be **pruned** from the set of candidate changepoints, thereby reducing
the search space.

In the worst case, the computational complexity of PELT remains $\mathcal{O}(n^2)$. However,
when the number of changepoints grows linearly with the number of observations, PELT achieves
**linear time complexity**, making it highly efficient in practice.

---

# FPOP (Functional Pruning Optimal Partitioning)

FPOP applies **functional pruning** by changing the order of minimisation.
Assume the segment cost can be written as a sum of pointwise losses:

$$
L(y_{\tau+1:t}) = \min_{\theta} \sum_{i=\tau+1}^{t} \gamma(y_i, \theta).
$$

Then the recursion becomes

$$
\begin{aligned}
Q_t
&= \min_{0 \le \tau < t}
\left[
Q_\tau + \min_{\theta} \sum_{i=\tau+1}^{t} \gamma(y_i, \theta) + \beta
\right] \\
&= \min_{\theta}
\min_{0 \le \tau < t}
\left[
Q_\tau + \sum_{i=\tau+1}^{t} \gamma(y_i, \theta) + \beta
\right] \\
&= \min_{\theta} Q_t(\theta),
\end{aligned}
$$

where $Q_t(\theta)$ denotes the minimum cost of partitioning the data up to time $t$, given that the parameter of the current segment is $\theta$.

If, for two candidate changepoints $\tau_1$ and $\tau_2$, we have
$q_t^{\tau_1}(\theta) \ge q_t^{\tau_2}(\theta)$ for all $\theta$, then $\tau_1$ can be safely pruned, as it is never optimal for any value of $\theta$.

The dynamic programming recursion for FPOP is given by

$$
Q_t(\theta)
=\gamma(y_t, \theta)+\min\left\{Q_{t-1}(\theta),\ 
\min_{\theta'} Q_{t-1}(\theta') + \beta\right\}.
$$

In the worst case, FPOP has a computational complexity of $\mathcal{O}(n^2)$; however, under favourable conditions, it can achieve a complexity of $\mathcal{O}(n \log n)$.

The accompanying figure illustrates how FPOP prunes candidate changepoints in practice.
![](/old_posts_image/18/2021/12/Untitled.png)

At time $t = 78$, we store $7$ candidate intervals together with their associated parameter values $\mu$.
Since we assume the function $\gamma$ corresponds to the negative log-likelihood of normally distributed
data, each cost function exhibits a quadratic shape, as shown in Figure (a).

At time $t = 79$, a new observation is received. We therefore recompute the cost functions, resulting in
the curves shown in Figure (b). In this figure, notice that the purple curve is no longer optimal: it lies
entirely above all other curves. This purple curve corresponds to the case where the most recent
changepoint is located at time $78$.

Consequently, we can prune this candidate and remove it from further consideration. That is, we no longer
consider $y_{78}$ as a possible changepoint in future iterations, as illustrated in Figure (c).
