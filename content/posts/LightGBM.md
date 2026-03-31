---
title: "Gradient Boosting Machine, XGBoost and LightGBM"
date: "2026-03-15"
draft: false
slug: "machine-learning"
tags: []
categories: [machine learning]
math: true
---


LightGBM is a member of the gradient boosting family and belongs to the universe of ensemble learning. Ensemble learning is essentially the idea that we can trust results given by multiple models more than any single one. There are two popular methods: bagging and boosting. Bagging aggregates results from multiple independent models trained simultaneously; the most well-known example is random forest. Boosting trains weak models sequentially, where each model learns from the errors of its predecessor, ultimately producing a strong model.

**1. Gradient Boosting Machine**

We start from the ancestor of XGBoost and LightGBM: the Gradient Boosting Machine (GBM). Assume we observe $N$ i.i.d. samples $\{y_i,x_i\}_{i=1}^N$. Our aim is to find the function $F(x)$ that minimizes the expected loss:

$$F^* = \arg\min_{F}\, \mathbb{E}_{y,x}\left[L(y,F(x))\right]$$

In practice, we minimize the empirical loss:

$$F^* = \arg\min_{F} \sum_{i=1}^N L(y_i,F(x_i))$$

In boosting, $F(x)$ is a weighted sum of weak learners, so the objective is:

$$\sum_{i=1}^N L\left(y_i,\sum_{m=1}^M \beta_m h(x_i;a_m)\right)$$

where $M$ is the number of boosting rounds, $h(\cdot\,;\cdot)$ is the weak learner, $a_m$ are its associated parameters (e.g., the tree structure), and $\beta_m$ is the weight of each weak learner. At iteration $m$, having fixed $F_{m-1}$, we seek:

$$\sum_{i=1}^N L\left(y_i,F_{m-1}(x_i)+\beta_m h(x_i;a_m)\right)$$

Both $\beta_m$ and $a_m$ are unknown and can in principle be jointly optimized:

$$(\beta_m,a_m) = \arg \min_{\beta,a}\sum_{i=1}^N L\left(y_i,F_{m-1}(x_i)+\beta h(x_i;a)\right).$$

Directly optimizing $a$ is difficult because the tree structure is discrete and non-differentiable, making standard gradient-based methods inapplicable. Instead, we work in function space and apply a first-order Taylor expansion around $F_{m-1}(x_i)$:

$$\sum_{i=1}^N L\left(y_i,F_{m-1}(x_i)+\beta h(x_i;a)\right)\approx\sum_{i=1}^N L\left(y_i,F_{m-1}(x_i)\right)+\beta\sum_{i=1}^Nh(x_i;a)\left[\frac{\partial L(y_i,F(x_i))}{\partial F(x_i)}\right]_{F_{m-1}(x_i)}.\tag{1}$$

The first term in (1) is constant with respect to $a$. Defining the pseudo-residual $r_{i,m}=-\left[\frac{\partial L(y_i,F(x_i))}{\partial F(x_i)}\right]_{F_{m-1}(x_i)}$ as the negative gradient, minimizing (1) over $a$ reduces to:

$$a_m = \arg \max_{a}\sum_{i=1}^Nh(x_i;a)\,r_{i,m}.$$

To maximize this inner product, we want $h(x_i;a)$ to be as aligned as possible with $r_{i,m}$. This is achieved by solving the least-squares problem:

$$a_m,\rho_m = \arg\min_{a,\rho}\sum_{i=1}^N\left[r_{i,m} - \rho\, h(x_i;a)\right]^2. \tag{2}$$

Formula (2) can be solved by a CART regression tree with the pseudo-residuals as targets. The scalar $\rho$ acts only as a scale factor on the leaf values and does not affect the optimal $a_m$. Friedman's 2001 paper uses $\beta$ for this scale factor and the later 2002 paper switches to $\rho$ to avoid confusion with the ensemble weights $\beta_m$. We follow the latter convention.

Given $a_m$, the coefficient $\beta_m$ is found by a one-dimensional line search over the actual loss:

$$\beta_m = \arg\min_\beta\sum_{i=1}^N L \left(y_i,F_{m-1}(x_i)+\beta\, h(x_i;a_m)\right),$$

and the model is updated as $F_m(x) = F_{m-1}(x)+\beta_m h(x;a_m)$. This says that at round $m$, we make an additive correction to the previous model in the direction of the negative gradient.

In summary, GBM's advantages include its ability to handle nonlinear relationships, robustness to feature scaling, and flexibility in the choice of differentiable loss function. However, it has slow training speed. It is also sensitive to outliers, since large residuals dominate the gradient updates. Overfitting is a concern because each tree attempts to reduce the residuals of the previous learner, which can lead to deep trees and large step sizes. At the end of his 2001 paper, Friedman introduces a learning rate $\nu$ and stochastic subsampling to mitigate overfitting, though individual trees may still overfit.

**2. XGBoost**

XGBoost was once state-of-the-art on tabular data, and even now it outperforms the majority of newer algorithms. It controls overfitting by directly adding a regularization term into the objective function. Another key difference from GBM is how to find the optimal estimation. In GBM, the tree is decomposed into a direction $a$ and a magnitude $\beta$, and the optimum is found via a first-order Taylor approximation. By contrast, XGBoost uses a second-order Taylor approximation, which enables finding a unique closed-form minimum of the objective.

Rewrite the tree ensemble as $F(x)= \sum_{m=1}^M f_m(x)$, where each $f_m(x) = w_{q(x)}$, $q:\mathbb{R}^p \to \{1,\ldots,T\}$ denotes the tree structure (mapping each instance to a leaf), and $w_j$ is the weight of the $j$-th leaf. The regularized objective is:

$$\sum_{i=1}^N L \left(y_i,\sum_{m=1}^M f_m(x_i)\right)+\sum_{m=1}^M\Omega(f_m), \tag{3}$$

where $\Omega(f_m)= \gamma T + \frac{1}{2}\lambda \|w\|^2$ and $T$ is the number of leaves. This penalizes complex trees at every round. At iteration $m$, having fixed $F_{m-1}$, we optimize:

$$\sum_{i=1}^N L \left(y_i,F_{m-1}(x_i)+f_m(x_i)\right)+\Omega(f_m).$$

Applying the second-order Taylor expansion around $F_{m-1}(x_i)$:

$$\sum_{i=1}^N \left[L \left(y_i,F_{m-1}(x_i)\right)+g_i f_m(x_i)+\frac{1}{2}h_i f_m^2(x_i)\right]+\Omega(f_m),$$

where $g_i = \left[\frac{\partial L(y_i,F(x_i))}{\partial F(x_i)}\right]_{F_{m-1}(x_i)}$ is the first-order gradient and $h_i = \left[\frac{\partial^2 L(y_i,F(x_i))}{\partial F(x_i)^2}\right]_{F_{m-1}(x_i)}$ is the second-order gradient (Hessian). Dropping the constant first term and substituting $f_m(x_i) = w_{q(x_i)}$, we group by leaves to get:

$$\sum_{i=1}^N f_m(x_i)g_i+\frac{1}{2}\sum_{i=1}^N f_m^2(x_i)h_i+\Omega(f_m)$$
$$=\sum_{j=1}^Tw_j\sum_{i\in I_j}g_i+\frac{1}{2}\sum_{j=1}^Tw^2_j\sum_{i\in I_j}h_i+\gamma T + \frac{1}{2}\lambda\sum_{j=1}^T w_j^2$$
$$=\sum_{j=1}^T\left[w_j G_j+\frac{1}{2}w^2_j \left(H_j+\lambda\right)\right]+\gamma T,$$

where $I_j = \{i : q(x_i)=j\}$ is the set of instances in leaf $j$, $G_j = \sum_{i\in I_j}g_i$, and $H_j = \sum_{i\in I_j}h_i$. For a fixed tree structure $q$, this is a sum of independent quadratics in $w_j$. The optimal leaf weight and the corresponding objective value are:

$$w^*_j = -\frac{G_j}{H_j+\lambda}, \qquad \mathcal{L}_{m}(q) = -\frac{1}{2}\sum_{j=1}^T\frac{G_j^2}{H_j+\lambda}+\gamma T.$$

In principle, one could enumerate all tree structures $q$ and select the one minimizing $\mathcal{L}_m(q)$. In practice this is intractable. Instead, the optimal tree is built greedily: the gain from splitting a node with instance set $I = I_L \cup I_R$ is:

$$\text{Gain} = \frac{1}{2}\left[\frac{G_L^2}{H_L+\lambda}+\frac{G_R^2}{H_R+\lambda}-\frac{(G_L+G_R)^2}{H_L+H_R+\lambda}\right]-\gamma.$$

A split is made only when the gain is positive. The rest of the paper discusses approximate algorithms and parallel computation. For the exact greedy algorithm, the worst-case time complexity is $O(M\,d\,p\,N\log N)$, where $M$ is the number of trees, $d$ is the maximum depth, $p$ is the number of features, and $N\log N$ comes from sorting instances per feature at each node. Pre-sorting all features once at the start and scanning the sorted lists reduces this to $O(p\,N\log N + M\,d\,p\,N)$. One can further reduce complexity by evaluating only $q$ candidate split thresholds per feature rather than every possible threshold.

**3. LightGBM**

LightGBM is designed to overcome the high computational cost of XGBoost. It proposes two key innovations:

- Gradient-based One-Side Sampling (GOSS). Instances with small gradients are already well-trained and contribute little to the learning signal, while instances with large gradients require more attention. At each round $m$, GOSS retains the top $100a\%$ of instances by gradient magnitude (set $A$) and randomly samples $100b\%$ of the remaining instances (set $B$). To compensate for the underrepresentation of set $B$, the gradients of sampled instances in $B$ are amplified by a factor of $\frac{1-a}{b}$. This reduces the effective sample size from $N$ to $(a + b(1-a)) \cdot N$.

- Exclusive Feature Bundling (EFB). The idea is to count the conflicts for each pair of features, sort features by the number of conflicts, and greedily assign them into bundles. Two features are considered conflicting if they take nonzero values simultaneously at the same data point. Features with fewer conflicts are bundled together, subject to a maximum conflict threshold that controls the approximation quality. Once the bundles are determined, the features within each bundle are merged into a single feature using a bin-offset trick. This reduces the number of effective features $p$ to the number of bundles.

Unlike XGBoost, which grows trees level-wise, LightGBM uses a leaf-wise growth strategy. At each step, the leaf that can maximally reduce the training loss is split, regardless of its depth. This gives up the natural parallelism of level-wise splitting but remains efficient because features are pre-binned into histograms, enabling fast gain computation.

**4. My recent thoughts**

I recently use LightGBM frequently. This is because I work with multiple time series streams, and classical models such as ARIMA or VAR became painfully slow to fit at scale. Besides, these models also demand careful manual feature engineering. I choose LightGBM purely it handles feature interactions automatically and very fast to run. Even with GPU, XGBoost can still cost significant time compare to LightGBM on CPU. Although it is a tabular model, we can add lags information into feature. On my data, the results were surprisingly good and the training time was a fraction of what classical approaches required. One thing I always need to double check is data leakage problem when adding the lags information on multi-step ahead prediction. Specifically the time series data needs rolling or walk-through train/valid split, but this is another topic. Another drawback is the output lacks the unceratinty quantification, but I find for the real world data, even we use the model outputs probabilistic structure, we would better to use time series conformal interval to correct. So this seems not be a problem.

Overall, I see LightGBM as a strong default approach for first try experiemnt, and where the interpretability of a parametric model is not strictly required.

**References**

Friedman, J.H., 2001. Greedy function approximation: a gradient boosting machine. *Annals of Statistics*, 29(5), pp.1189–1232.

Chen, T. and Guestrin, C., 2016. XGBoost: A scalable tree boosting system. *Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining*, pp.785–794.

Ke, G., Meng, Q., Finley, T., Wang, T., Chen, W., Ma, W., Ye, Q. and Liu, T.Y., 2017. LightGBM: A highly efficient gradient boosting decision tree. *Advances in Neural Information Processing Systems*, 30.

Shi, H., 2007. Best-first decision tree learning (Doctoral dissertation, The University of Waikato).
