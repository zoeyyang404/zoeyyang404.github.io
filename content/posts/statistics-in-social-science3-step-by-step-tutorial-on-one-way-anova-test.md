---
title: "Statistics in Social Science(3): Step-by-Step tutorial on One-way ANOVA test"
date: "Wed, 14 Apr 2021 11:18:52 +0000"
draft: false
slug: "statistics-in-social-science3-step-by-step-tutorial-on-one-way-anova-test"
tags: []
categories: []
math: true
---
**This blog will explain the one-way ANOVA test in detail (including assumptions,
implementation situations, and interpretation), and an example analysed in R
will be shown at the end.**

## What is this test for?

You may be familiar with the *t-test* and some other nonparametric tests used to
determine whether there is a difference in the mean between two groups
(e.g. whether there is a difference in mean score between two classes, or whether
one treatment is better than another).

The **one-way analysis of variance (ANOVA)** is used to **determine whether there
is a significant difference among the means of three or more independent groups**.
For example, it can be applied to test:

- whether there is a difference in mean score among four classes
- whether there is a difference in mean effect among three types of treatment

## Assumptions

There is no free lunch. To implement the one-way ANOVA test, three assumptions
must be satisfied:

- **Normality**: The variable is normally distributed within each group in the
  one-way ANOVA. (Technically, it is the residuals that need to be normally
  distributed, but the result is equivalent.) For example, if we want to compare
  mean scores across three classes, the scores in each class should follow a
  [normal distribution](https://en.wikipedia.org/wiki/Normal_distribution).
- **Homogeneity of variances**: The population variance in each group should be
  equal. For example, the scores of students in the three classes should have a
  similar level of variability.
- **Independence**: Observations should be independent. This means that one
  observation does not influence another. For example, student A’s grade does
  not affect student B’s grade if they take the exam independently.

All three assumptions should be checked before implementing a one-way ANOVA.
Next, we show how to perform and interpret a one-way ANOVA using R.

## How to do it and explain it (An example in R)

We use the built-in R dataset **PlantGrowth**, which contains the weights of
30 plants divided into three groups:

- 10 plants receive no treatment (control group)
- 10 plants receive treatment A
- 10 plants receive treatment B

Our goal is to determine whether there is a difference in mean plant weight
among the three groups.

First, we draw a boxplot to visualise the data.

![](/old_posts_image/18/2021/04/image-2-1024x541.png)

From the boxplot, we can see that treatment 1 has a lower effect than the control
group, although the difference is not very large. Plants receiving treatment 3
appear to have larger weights than the other two groups.

Next, we perform a one-way ANOVA:

```r
res.aov <- aov(weight ~ group, data = data)

# Summary of the analysis
summary(res.aov)
            Df Sum Sq Mean Sq F value Pr(>F)  
group        2  3.766  1.8832   4.846 0.0159 *
Residuals   27 10.492  0.3886                 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
```


##### Interpretation

At the 5% significance level, the p-value of the test is less than 0.05
(\(p = 0.0159 < 0.05\)). Therefore, we conclude that there is a statistically
significant difference among the groups.

However, this result only tells us that **at least one group differs from the others**;
it does not indicate which specific pairs of groups are different.
To identify pairwise differences, we perform Tukey’s multiple comparisons test:


```r
TukeyHSD(res.aov)
  Tukey multiple comparisons of means
    95% family-wise confidence level
Fit: aov(formula = weight ~ group, data = data)
$group
            diff        lwr       upr     p adj
trt1-ctrl -0.371 -1.0622161 0.3202161 0.3908711
trt2-ctrl  0.494 -0.1972161 1.1852161 0.1979960
trt2-trt1  0.865  0.1737839 1.5562161 0.0120064
'''
Under a 5% significance level, we conclude that **treatment 2 is significantly better
than treatment 1** in terms of mean plant weight. However, there is no statistical
evidence that treatment 2 is better than the control group, nor that treatment 1
is worse than receiving no treatment.

#### Checking the assumptions

Now let us check the assumptions.

- **Normality assumption**:  
  From the Q–Q plot, most points lie close to the straight line, except for points
  4, 15, and 17. Given the relatively small sample size (30 plants), this deviation
  is reasonable. We can also formally test normality using the Shapiro–Wilk test.
  At the 5% significance level, we fail to reject the null hypothesis that the
  residuals are normally distributed.

![](/old_posts_image/18/2021/04/image-3-1024x541.png)

```r
shapiro.test(residuals(res.aov))
    Shapiro-Wilk normality test

data:  residuals(res.aov)
W = 0.96607, p-value = 0.4379
```
- **Homogeneity of variance assumption**:  
  From the Residuals vs Fitted plot, we observe slight evidence of non-constant
  variance, as the degree of dispersion differs across groups. However, this
  deviation does not appear severe. Levene’s test can also be used to formally
  assess the homogeneity of variances. At the 5% significance level, we fail to
  reject the null hypothesis (\(p > 0.05\)), indicating that the variances across
  treatment groups can be assumed to be homogeneous.

![](/old_posts_image/18/2021/04/image-4-1024x541.png)

```r
leveneTest(weight ~ group, data = data)
Levene's Test for Homogeneity of Variance (center = median)
      Df F value Pr(>F)
group  2  1.1192 0.3412
      27      
```

- **Independence assumption**:  
  This assumption requires careful consideration. In this example, it is reasonable
  to assume independence, since the weight of one plant does not influence the
  weight of other plants.

That’s all!

This blog also references a resource containing specific R code:

- <http://mathsbox.com/notebooks/python-utilities.html>

Additional useful resources for performing one-way ANOVA using SPSS:

- <https://statistics.laerd.com/statistical-guides/one-way-anova-statistical-guide-3.php>
- <https://statistics.laerd.com/spss-tutorials/one-way-anova-using-spss-statistics.php>
