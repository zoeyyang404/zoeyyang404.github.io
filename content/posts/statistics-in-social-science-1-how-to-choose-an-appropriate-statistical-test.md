---
title: "Statistics in Social science (1): How to choose an appropriate correlation test?"
date: "Fri, 26 Feb 2021 11:47:00 +0000"
draft: false
slug: "statistics-in-social-science-1-how-to-choose-an-appropriate-statistical-test"
tags: []
categories: []
math: true
---
In social science, it is common to calculate the association between two variables. For example, you may want to test the relationship between smoking and lung cancer, consumption and income, etc. The test method could be summarized in the table below under different variables and different distributions. In this blog, we only measure two continuous variables.

| Category | Method |
|---|---|
| **Two continuous variables** |  |
| Normal distributed? | [Pearson correlation coefficient](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient) |
| Not normal distributed | [Spearman rank correlation coefficient](https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient) |
| **Two categorical variables** | [Fisher exact test](https://en.wikipedia.org/wiki/Fisher%27s_exact_test); [Chi-square test](https://en.wikipedia.org/wiki/Chi-squared_test) |
| **One continuous variable and one categorical variable** | [Boxplot](https://en.wikipedia.org/wiki/Box_plot#:~:text=In%20descriptive%20statistics%2C%20a%20box,whisker%20plot%20and%20box%2Dand%2D); [Biserial rank correlation](https://www.scalestatistics.com/rank-biserial.html#:~:text=The%20rank%20biserial%20correlation%20is,variable%20and%20an%20ordinal%20variable.&text=Rank%20biserial%20is%20the%20correlation,categorical%20and%20an%20ordinal%20variable.) |

# Analysis of Correlation

## Drawing the plot – a direct way

The first step of measuring the correlation is drawing the plot:

![](/old_posts_image/18/2021/02/Untitled.png)

Assume we have continuous data y1, x1, x2, x3 and x4. From the plot above, we could see the correlation between y1 and x1 is a positive linear correlation; y2 and x2 seem no apparent linear correlation and non-linear correlation; y1 and x3 have negative linear correlation and y1 and x4 have a non-linear correlation.

## Calculating the correlation coefficient – a mathematical way

The correlation coefficient is a statistic measuring the strength of the linear correlation. Usually, there are two ways: the Pearson correlation coefficient and the Spearman correlation coefficient. Although you may want to report the P-value of the correlation test, it is necessary to report the coefficient at the same time.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX0ajRSz4AXEjEt5E4CVH1FEWbD9I7NRrw-A&usqp=CAU)

### Pearson correlation coefficient

Pearson correlation coefficient could be calculated in R by `cor()` function. It is the most commonly used statistics; However, it assumes normal or bell-shaped distribution for continuous variable. We didn’t check the assumption here but it has to be done in real data analysis.

The correlation coefficient ranges from -1 to 1. The sign measures the direction of correlation: positive refers to the positive relationship while negative value refers to the negative relationship. The absolute value measures the strength of the correlation. Usually, the absolute value \|value\|>0.7 could be considered as a strong correlation.

From the example we could see, y1 and x1 have a strong positive correlation; the correlation coefficient between y1 and x2 is really small only 0.016; y1 and x3 have a strong negative correlation; while y1 and x4 have a mild correlation. Note: Here we could only say they have a linear correlation since Pearson ignore the non-linear relationship.

```r
cor(y1,x1)
# [1] 0.8708785

cor(y1,x2)
# [1] 0.01631352

cor(y1,x3)
# [1] -0.9145617

cor(y1,x4)
# [1] 0.405236
```
### Spearman Rank Correlation Coefficient

Unlike Pearson’s method, Spearman’s rank correlation does not assume any specific
distribution of the variables. Usually, we obtain results similar to Pearson’s
correlation (as shown below). The main difference between the Spearman rank
correlation and Pearson correlation is that Pearson only accounts for *linear*
relationships and ignores nonlinear relationships. In contrast, the Spearman
test considers both linear and nonlinear (monotonic) relationships.

```r
cor(y1, x1, method = "spearman")
# [1] 0.8520012

cor(y1, x2, method = "spearman")
# [1] 0.01749775

cor(y1, x3, method = "spearman")
# [1] -0.9017702

cor(y1, x4, method = "spearman")
# [1] 0.4252865
```
## How we report?

1. Firstly, draw the plot to see the relationship.
2. If you want a statistical test:
   - Draw the histogram to see if the variables have a normal (bell-shaped) distribution.
   - If yes, use the Pearson method.
   - If no, use the Spearman method.

It is worth noting that statistical tests are only an assisted tool for interpreting
relationship plots. In some cases, the results of these tests may not be reliable.
For example, we may observe a strong nonlinear relationship in the plot below, while
both the Pearson and Spearman correlation coefficients are approximately zero.

![](/old_posts_image/18/2021/02/Untitled-1.png)

*Cited from:*  
https://support.minitab.com/en-us/minitab-express/1/help-and-how-to/modeling-statistics/regression/supporting-topics/basics/a-comparison-of-the-pearson-and-spearman-correlation-methods/

Besides, we can only conclude that there is a correlation between variables; we cannot
infer that one variable is the cause of another. Specifically, even if two variables
have a high correlation coefficient (e.g. 0.9), and variable A tends to be large when
variable B is large, we still cannot conclude that high values of A cause high values
of B.

![](/old_posts_image/18/2021/04/image-18.png)

For more readings:

- <http://www.sthda.com/english/wiki/correlation-test-between-two-variables-in-r>  
  This blog specifically lists how to conduct other correlation tests between two variables in R.

- <https://www.statisticshowto.com/probability-and-statistics/correlation-coefficient-formula/>  
  This is a very good blog explaining the definition of correlation coefficients and includes a helpful video.
