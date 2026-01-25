---
title: "Statistics in Social science (1): How to choose an appropriate correlation test?"
date: "2021-02-26T11:47:00+00:00"
draft: false
slug: "statistics-in-social-science-1-how-to-choose-an-appropriate-statistical-test"
tags: [""]
categories: [""]
aliases: ["https://www.lancaster.ac.uk/stor-i-student-sites/ziyang-yang/2021/02/26/statistics-in-social-science-1-how-to-choose-an-appropriate-statistical-test/"]
---
This blog will give you the idea of choosing an appropriate statistical correlation test in social science area.

Recently I am talking with friends who are studying in the social science area, and they are confused about how to use statistical test appropriately. So I decided to write a series of blogs talking about the common statistical method in social science and how to explain the result.

In social science, it is common to calculate the association between two variables. For example, you may want to test the relationship between smoking and lung cancer, consumption and income, etc. The test method could be summarized in the table below under different variables and different distributions. In this blog, we only measure two continuous variables.

<figure class="wp-block-table is-style-regular">
<table>
<tbody>
<tr>
<td><strong>Two continuous variables</strong></td>
<td></td>
</tr>
<tr>
<td>Normal distributed?</td>
<td><a href="https://en.wikipedia.org/wiki/Pearson_correlation_coefficient">Pearson Correlation coefficient</a></td>
</tr>
<tr>
<td>Not normal distributed</td>
<td><a href="https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient">Spearman Correlation coefficient</a></td>
</tr>
<tr>
<td><strong>Two categorical variables</strong></td>
<td><a href="https://en.wikipedia.org/wiki/Fisher%27s_exact_test">Fisher exact test</a>; <a href="https://en.wikipedia.org/wiki/Chi-squared_test">Chi-square test</a></td>
</tr>
<tr>
<td><strong>one continuous variable and one continuous variable</strong></td>
<td><a href="https://en.wikipedia.org/wiki/Box_plot#:~:text=In%20descriptive%20statistics%2C%20a%20box,whisker%20plot%20and%20box%2Dand%2D">Boxplot</a>; <a href="https://www.scalestatistics.com/rank-biserial.html#:~:text=The%20rank%20biserial%20correlation%20is,variable%20and%20an%20ordinal%20variable.&amp;text=Rank%20biserial%20is%20the%20correlation,categorical%20and%20an%20ordinal%20variable.">Biserial rank correlation</a></td>
</tr>
</tbody>
</table>
</figure>

# Analysis of Correlation

## Drawing the plot â€“ a direct way

The first step of measuring the correlation is drawing the plot:

<div class="wp-block-image">

<figure class="aligncenter size-large is-resized">
<img src="/wp-content/uploads/sites/18/2021/02/Untitled.png" class="wp-image-198" loading="lazy" decoding="async" srcset="/wp-content/uploads/sites/18/2021/02/Untitled.png 787w, https://www.lancaster.ac.uk/stor-i-student-sites/ziyang-yang/wp-content/uploads/sites/18/2021/02/Untitled-300x205.png 300w, https://www.lancaster.ac.uk/stor-i-student-sites/ziyang-yang/wp-content/uploads/sites/18/2021/02/Untitled-768x526.png 768w" sizes="auto, (max-width: 584px) 100vw, 584px" width="584" height="400" />
</figure>

</div>

Assume we have continuous data y1, x1, x2, x3 and x4. From the plot above, we could see the correlation between y1 and x1 is a positive linear correlation; y2 and x2 seem no apparent linear correlation and non-linear correlation; y1 and x3 have negative linear correlation and y1 and x4 have a non-linear correlation.

## Calculating the correlation coefficient â€“ a mathematical way

The correlation coefficient is a statistic measuring the strength of the linear correlation. Usually, there are two ways: the Pearson correlation coefficient and the Spearman correlation coefficient. Although you may want to report the P-value of the correlation test, it is necessary to report the coefficient at the same time.

<div class="wp-block-image">

<figure class="aligncenter">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX0ajRSz4AXEjEt5E4CVH1FEWbD9I7NRrw-A&amp;usqp=CAU" decoding="async" alt="Correlation Coefficient - quickmeme" />
</figure>

</div>

### Pearson correlation coefficient

Pearson correlation coefficient could be calculated in R by cor() function. It is the most commonly used statistics; However, it assumes normal or bell-shaped distribution for continuous variable. We didnâ€™t check the assumption here but it has to be done in real data analysis.

The correlation coefficient ranges from -1 to 1. The sign measures the direction of correlation: positive refers to the positive relationship while negative value refers to the negative relationship. The absolute value measures the strength of the correlation. Usually, the absolute value \|value\|\>0.7 could be considered as a strong correlation.

From the example we could see, y1 and x1 have a strong positive correlation; the correlation coefficient between y1 and x2 is really small only 0.016; y1 and x3 have a strong negative correlation; while y1 and x4 have a mild correlation. Note: Here we could only say they have a linear correlation since Pearson ignore the non-linear relationship.

``` wp-block-code
> cor(y1,x1)
[1] 0.8708785
> cor(y1,x2)
[1] 0.01631352
> cor(y1,x3)
[1] -0.9145617
> cor(y1,x4)
[1] 0.405236
```

### Spearman Rank correlation coefficient

Unlike Pearsonâ€™s method, Spearmanâ€™s method does not assume the distribution of the variables. Usually, we got a similar result to Pearson (as the result we see below). The difference between the Spearman rank correlation and Pearson rank correlation is that Pearson only takes account into the linear relationship but discards non-linear relationship. However, the Spearman test considers both linear and non-linear relationship.

``` wp-block-code
> cor(y1,x1,method = 'spearman')
[1] 0.8520012
> cor(y1,x2,method = 'spearman')
[1] 0.01749775
> cor(y1,x3,method = 'spearman')
[1] -0.9017702
> cor(y1,x4,method = 'spearman')
[1] 0.4252865
```

## How we report?

1.  Firstly, draw the plot to see the relationship.
2.  If you want a statistical test:

- draw the histogram to see if they have a normal/bell-shaped distribution
- If yes, using a test with the Pearson method
- If no, using the test with the Spearman method

It is worth noting that the statistical test is only an assisted tool for the relationship plot. Since in some cases, the result of the test is not reliable. For example, we could see a strong nonlinear correlation in the plot below. However, the Pearson coefficient and Spearman coefficient are both approximately 0.

<div class="wp-block-image">

<figure class="aligncenter size-large is-resized">
<img src="/wp-content/uploads/sites/18/2021/02/Untitled-1.png" class="wp-image-197" loading="lazy" decoding="async" width="397" height="260" />
<figcaption>Cited from <a href="https://support.minitab.com/en-us/minitab-express/1/help-and-how-to/modeling-statistics/regression/supporting-topics/basics/a-comparison-of-the-pearson-and-spearman-correlation-methods/">https://support.minitab.com/en-us/minitab-express/1/help-and-how-to/modeling-statistics/regression/supporting-topics/basics/a-comparison-of-the-pearson-and-spearman-correlation-methods/</a></figcaption>
</figure>

</div>

Besides, we could only say there is a correlation between variables and we could not get a conclusion that one variable is the causality of another variable. Specifically, if two variables have a large correlation of 0.9 and variable A has a high value, variable B will probably have a high value. However, we could not say high value in variable A causes the high value in variable B.

<div class="wp-block-image">

<figure class="aligncenter size-large is-resized">
<img src="/wp-content/uploads/sites/18/2021/04/image-18.png" class="wp-image-292" loading="lazy" decoding="async" srcset="/wp-content/uploads/sites/18/2021/04/image-18.png 502w, https://www.lancaster.ac.uk/stor-i-student-sites/ziyang-yang/wp-content/uploads/sites/18/2021/04/image-18-300x211.png 300w" sizes="auto, (max-width: 366px) 100vw, 366px" width="366" height="257" />
</figure>

</div>

For more readings:

<http://www.sthda.com/english/wiki/correlation-test-between-two-variables-in-r> This blog specifically listed how to conduct other correlation test between two variables in R

<https://www.statisticshowto.com/probability-and-statistics/correlation-coefficient-formula/> This is a really good blog about the definition and it also contains a good video!

