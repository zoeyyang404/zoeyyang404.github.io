---
title: "Statistics in Social science (2): Explaining Linear regression"
date: "Sun, 14 Mar 2021 23:10:34 +0000"
draft: false
slug: "statistics-in-social-science-2-explaining-linear-regression"
tags: []
categories: []
math: true
---
**This blog will give you a real example of how to explain linear regression.**

![](https://miro.medium.com/max/888/1*guak1sQTh5sAf46NMzbQig.jpeg)

# Why we need linear regression?

People in social science use linear regression frequently. Scientists often use it to
measure the relationship between a dependent variable and independent variables.
Most real-world situations can be modelled and therefore explained.

Basically, if we have data, and if you want to:

- **Explain** a situation, for example the relationship between wage and education,
  gender, and working experience. Does higher education lead to a higher average wage?
  Is there a gender difference in average wage?
- **Predict**, for example what a pupil’s grade will be next semester given their
  current performance.

You can use linear regression.

Linear regression is often expressed as the equation below. The dependent variable is
the variable we want to explain, and the independent variables are factors associated
with the dependent variable. The coefficients and constant are estimated by computers,
and we will explain them later.

When there is only one independent variable, it is called a **simple linear regression**
model. When there are multiple independent variables, it is called **multiple linear
regression**.

![](https://i2.wp.com/contentsimplicity.com/wp-content/uploads/2019/05/18d7e-1eieyrsqib85cpa32zapqwq.png?w=1080&ssl=1)

When I was trying to find resources about linear regression, most tutorials focused
only on building the model in software, while fewer discussed explanation. Moreover,
there are very few tutorials that talk about variable choice before modelling.

Here, we assume our readers are confident with building models using different software,
and we focus only on the **process and explanation of model construction**.

# What factors have to be included in the model?

Directly building a model with all variables is not sensible, especially when the
number of variables is large. You also do not want to explain something using irrelevant
factors, such as explaining a pupil’s grade by the number of animals in a zoo.
Therefore, we only want **relevant factors** in our model.

Typically, there are two rules to identify relevant factors:

- Plot the relationship between the dependent variable and an independent variable,
  or calculate the correlation coefficient. If there is a linear relationship or the
  correlation coefficient is reasonably large, we may consider including this
  independent variable in our model. To learn more about how these are measured,
  please read this [blog](https://www.lancaster.ac.uk/stor-i-student-sites/ziyang-yang/2021/02/26/statistics-in-social-science-1-how-to-choose-an-appropriate-statistical-test/).
- Conduct a literature review. Identify which variables have been used in similar
  studies, and include those variables in the model.

If a variable satisfies either rule, it can be selected for model construction.

For example, suppose we want to study which factors influence people’s feelings on the
life satisfaction ladder (measured from 1 to 7, where 1 represents complete
dissatisfaction and 7 represents complete satisfaction).

From the literature review, previous research shows that age and gender affect life
satisfaction. Relationship plots and correlation coefficients also support this
argument. Therefore, we include both age and gender in the model to explain life
satisfaction.

# How to explain the final model?

Fitting and checking a model is a technical and complex process, so we do not present
the full procedure here.

Continuing with the life satisfaction example, suppose we obtain the following model:

$$
\text{LifeSatisfaction}
=
7.101 - 0.099 \times \text{Age}
+ 0.111 \times \text{Gender (Female)}
$$

How do we explain this model?

- **7.101 (Intercept):** This represents the average life satisfaction of the reference
  group. In this example, it corresponds to a 0-year-old female, which is impossible.
  Therefore, the intercept sometimes has no practical meaning.
- **−0.099 (Slope for a continuous variable):** Holding gender constant, the average
  life satisfaction decreases by 0.099 for each additional year of age. This is
  reasonable, as people may face more responsibilities and concerns as they grow older.
- **0.111 (Slope for a categorical variable):** Holding age constant, females are on
  average more satisfied with their lives than males.

At this point, you should be able to select variables for a model and explain the
results of a basic linear regression.

For more technical blogs on model construction:

- How to build models in R:  
  <https://www.r-bloggers.com/2020/05/step-by-step-guide-on-how-to-build-linear-regression-in-r-with-code/>

- How to build models in SPSS:  
  <https://www.r-bloggers.com/2020/05/step-by-step-guide-on-how-to-build-linear-regression-in-r-with-code/>

For further reading on linear regression:

- <https://www.youtube.com/watch?v=ZkjP5RJLQF4>
