---
title: "Overview two changepoints algorithms – PELT and FPOP"
date: "2021-12-11T20:18:53+00:00"
draft: false
slug: "overview-two-changepoints-algorithms-pelt-and-fpop"
tags: [""]
categories: [""]
aliases: ["https://www.lancaster.ac.uk/stor-i-student-sites/ziyang-yang/2021/12/11/overview-two-changepoints-algorithms-pelt-and-fpop/"]
---
<span class="has-inline-color has-secondary-color">Hi! As you know I have started my first year of PhD, and my research direction is anomaly detection. And it could be seen as some special changepoint questions. So I started to write some notes during my PhD learning period. This is suitable for people already familiar with changepoint algorithms and who wants to have a look. I am happy to discuss with you my notes if there is something I misunderstand:)</span>

# To detect the change!

The story begins by detecting the change. Assume we observed data from time \\ 1 \\ to time \\ t \\ ; we could name this sequence of observations by \\ y_1, y_2,â€¦, y_t \\. We aim to infer the locations and numbers of these changes â€“ that is, to infer \\ \tau \\ . This question could be easily transferred to a classification problem, that is, how could we classify an ordered sequence into several categories as good as we can. Based on this idea, we could write the following minimisation problem:

\$\$ \min\_{K \in N ; \tau_1,\tau_2,â€¦,\tau_K} \sum\_{k=0}^K L(y\_{\tau_k+1:\tau\_{k+1}}), \$\$

\\ L(y\_{\tau_k+1:\tau\_{k+1}})\\ represents the cost for modelling the data \\ y\_{\tau_k+1},y\_{\tau_k+2},â€¦,y\_{\tau\_{k+1}} \\ as a segment, it could be the negative log-likelihood; \\ K \\ is the total number of changepoints. Thus, this problem means we want to classify the ordered sequence into \\ K+1 \\ segments and make sure the classification could achieve the minimum log-likelihood. A question is that if we directly use this minimisation expression, we will always assign only one observation into one segment. Imagine that if we have 3 data points, when \\ K=2 \\ , we always achieve its minimum coz the cost for each segment is 0 and the sum is 0 too. Thus, we need a constrain!

# Constrained problem and penalised optimisation problem

If we know the optimal number of changepoint \\ K \\ , we could force our algorithm to find \\ K+1 \\ segments. This is the constrained problem:

\$\$Q_n^K=\min\_{K \in N ; \tau_1,\tau_2,â€¦,\tau_K} \sum\_{k=0}^K L(y\_{\tau_k+1:\tau\_{k+1}}), \$\$

Solve the RHS of the above equation by dynamic programming; we will get the optimal location of \\ K \\ changepoints. However, this requires prior knowledge of the number of changepoints. When we donâ€™t know the exact number of changepoint, we could try to give a maximum number of changepoints, e.g.10; then compute \\ Q_n^k \\ for all \\ k=0,1,2,â€¦,10 \\ , and choose the minimum \\ Q_n^k \\ as the final solution. In general, it could be written like:

\$\$\min_k\[Q_n^k+g(k,n)\],\$\$

where \\ g(k,n) \\ is the penalty function for overfitting the number of changepoints.

Given this idea above, a group of clever people think why not transfer the problem into a penalised one. If the penalty function is linear in \\ k \\ , say, \\ g(k,n)=\beta k, \beta\>0 \\, we could write it as:

\$\$Q\_{n,\beta}=\min\_{k}\[Q_n^k+\beta k\]=\min\_{k,\tau}\[\sum\_{k=0}^K L(y\_{\tau_k+1:\tau\_{k+1}})+\beta \] â€“ \beta\$\$

This is known as the penalised optimisation problem. And all our stories come from here.

To solve the penalised optimisation problem, we could use dynamic programming! Given \\ Q\_{0,\beta}=-\beta \\ , we have

\$\$Q\_{t,\beta}=\min\_{0\leq\tau\<t} \[Q\_{\tau,\beta}+L(y\_{\tau+1:t})+\beta\],\$\$

for \\ t=1,2,â€¦,n \\ . However, solving this one requires \\ O(n^2) \\ time complexity! Because of each step, we have to recalculate the cost for each observation. In order to reduce the computational complexity, two approaches have been proposed â€“ PELT and FPOP!

# PELT

Letâ€™s look at some maths first! Assume there exists a constant \$a\$ and

\$\$Q\_\tau + L(y\_{\tau+1:t}) +a \>Q_t,\$\$

\\ y\_\tau \\ will never be the optimal change point in the future recursion. The LHS of the inequality above means the cost for modelling data have a changepoint at \\ \tau \\ until time \\ t \\ , while the RHS represents the cost without changepoint at \\ \tau \\ . Thus, in the following calculation, we do not need to consider the possibility that \$\tau\$ is the optimal last changepoint. So, the search space is reduced!

In each recursion, instead of calculating the cost and finding the minimum, we need to add an additional step to check if the inequality holds. In the worst cases, the computational complexity is still \\ O(n^2) \\ . However, when the number of changepoint increases with the number of observations, PELT could achieve linear computational complexity!

# FPOP

FPOP is functional pruning. In the optimisation problem, we firstly model the segment then find the minimisation. But functional pruning swaps the order of minimisation, that is to find the segment for different parameters. Assume cost function could be represented as the sum of \\ \gamma(y_i,\theta), \\ you will be very clear if we do some maths:

\$\$\begin{split} Q_t&=\min\_{0 \leq \tau \< t} \[Q\_\tau+L(y\_{\tau+1:t})+\beta\]\\&=\min\_{0 \leq \tau \< t} \[Q\_\tau+\min\_\theta \sum\_{i=\tau+1}^t \gamma(y\_{i,\theta})+\beta\]\\\\\\\\ (\mathrm{independent\\ assumption})\\&=\min\_{\theta} \min\_{0 \leq \tau \< t} \[Q\_\tau+\sum\_{i=\tau+1}^t \gamma(y\_{i,\theta})+\beta\]\\& = \min\_{\theta} \min\_{0 \leq \tau \< t} q_t^\tau(\theta)\\&=\min\_{\theta} Q_t(\theta),\end{split} \$\$

where \\ q_t^\tau(\theta) \\ is the optimal cost of partitioning the data up to time \\ t \\ conditional on the last changepoint being at \\ \tau \\ with the current parameter being \\ \theta \\ ; and \\ Q_t(\theta) \\ is the optimal cost of partitioning the data up to time \\ t \\ with the current segment parameter being \\ \theta \\ . Simply, assume we have two possible changepoint candidates \\ \tau_1 \\ and \\ \tau_2 \\ , \\ \tau_1 \\ will never be the optimal partition if \\ q^{\tau_1}\_t \> q^{\tau_2}\_t \\ , then we could simply prune \\ \tau_1 \\ .

You could easily find the difference. Before in penalised optimisation problem, we firstly find the possible partition and then estimate the parameter in the segment, and then find the minimum cost. As a result, the associated partition is the solution we want. But here, we have possible estimated parameters, for each estimated parameter, we have corresponded partition. Then the minimum cost over all possible parameters is the solution we want.

The equation above could be easily solved by dynamic programming:

\$\$Q_t(\theta)=\min \big\\Q\_{t-1}(\theta), \min\_\theta Q\_{t-1}(\theta)+\beta\big\\+\gamma(y_t,\theta)\$\$

The former one in the bracket means there is no new changepoint in the last iteration, while the latter one in the bracket means that add a new changepoint in the last iteration after updating one observation. In the worst case, the time complexity is \\ O(n^2) \\ ; but in the best case, the time complexity is \\ O(n\log n) \\ .

I will explain the Figure here, and you will understand how FPOP prune candidate changepoint.

<div class="wp-block-image">

<figure class="aligncenter size-full is-resized">
<img src="/old_posts_image/wp-content/uploads/sites/18/2021/12/Untitled.png" class="wp-image-409" fetchpriority="high" decoding="async" srcset="/old_posts_image/wp-content/uploads/sites/18/2021/12/Untitled.png 879w, /old_posts_image/wp-content/uploads/sites/18/2021/12/Untitled-300x141.png 300w, /old_posts_image/wp-content/uploads/sites/18/2021/12/Untitled-768x362.png 768w" sizes="(max-width: 575px) 100vw, 575px" width="575" height="271" />
<figcaption>This is a direct screenshot from Paper (On Optimal Multiple Changepoint Algorithms for Large Data, arxiv: 1409.1942</figcaption>
</figure>

</div>

At time \\ t=78 \\ , we stored \\ 7 \\ intervals with associated \\ \mu \\ . Since we assume \\ \gamma \\ function is a negative loglikelihood for normally distributed data, it shows a quadratic shape in the Figure. At time \\ t=79 \\ , we observed new data, so we recompute the cost function and get the result as the middle Figure shows. In the middle Figure, notice that the purple line is not optimal anymore (it is above all the curves), and the purple line corresponds to the cost when the changepoint is located in 78. Thus, we could prune this candidate that we will not consider \\ y\_{78} \\ to be the possible changepoint anymore (as shown in Figure (c)).



