---
title: "Statistics in Social science (2): Explaining Linear regression"
date: "Sun, 14 Mar 2021 23:10:34 +0000"
draft: false
slug: "statistics-in-social-science-2-explaining-linear-regression"
tags: []
categories: []
math: true
---
<span class="has-inline-color has-secondary-color">This blog will give you a real example how to explain linear regression</span>

<div class="wp-block-image">

<figure class="aligncenter is-resized">
<img src="https://miro.medium.com/max/888/1*guak1sQTh5sAf46NMzbQig.jpeg" loading="lazy" decoding="async" width="351" height="198" alt="The Complete Guide to Linear Regression in Python | by Marco Peixeiro | Towards Data Science" />
</figure>

</div>

# Why we need linear regression?

People in social science uses linear regression frequently. Scientists often use it to measure the relationship between a dependent variable and independent variables. And most real-world situations could be modelled and therefore explained. Basically, if we have data, and if you want to:

- Explain some situation: eg: the relationship between wage and education, gender, working experience and so on. Does higher education lead to a higher average wage? Is there a gender difference in the average wage?
- Predicting : eg: what’s the pupils’ grade next semester given his/her current performance.

You could use linear regression. Linear regression often expressed as the Equation below. The dependent variable is the variable we want to explain, and independent variables are factors associated with dependent variables. The coefficient and constant will be estimated by computers, and we will explain them later. When there is only one independent variable, it is called a simple linear regression model. Multiple independent variables indicate multiple linear regression.

<div class="wp-block-image">

<figure class="aligncenter is-resized">
<img src="https://i2.wp.com/contentsimplicity.com/wp-content/uploads/2019/05/18d7e-1eieyrsqib85cpa32zapqwq.png?w=1080&amp;ssl=1" loading="lazy" decoding="async" width="576" height="242" alt="Simple linear regression in four lines of code | Content Simplicity" />
</figure>

</div>

When I was trying to find resources about linear regression, most tutorials only focused on building the model in software while fewer mentions explanation. Moreover, there is no tutorial talking about the variable choice before modelling. Here, we assume our readers are confident with building models with different software, and we only focus on the process and explanation of model construction.

# What factors have to be included in the model?

Directly building a model with all variables is not sensible, especially when the number of variables is large. And you don’t want to explain something by irrelevant factors like explain a pupil’s grade by the number of animals in the zoo. So, we only want relevant factors in our model.

Typically, there are two rules to find relevant factors:

- Plotting the relationship between the dependent variable and independent variable or calculating the correlation coefficient. If there is a linear relationship or the correlation coefficient is reasonably large, we could consider include this independent variable in our model. To find out how these are measured, please read this [blog](https://www.lancaster.ac.uk/stor-i-student-sites/ziyang-yang/2021/02/26/statistics-in-social-science-1-how-to-choose-an-appropriate-statistical-test/).
- Literature review. Find out which variable has been used in other similar researches. Therefore, we could add these variables to our model.

If a variable fits either rule, it could be selected to build the model.

For example, we will measure what factors will influence peoples’ feeling about the life satisfaction ladder (figures from 1 to 7 with 1 represents dissatisfaction totally and 7 represents satisfaction totally). From the literature review, researches show age and gender has an impact on life satisfaction. The relationship plot and correlation coefficient also support this argument. Therefore, we added both age and gender in our model to explain life satisfaction.

# How to explain the final model?

Fitting model and checking model is a technical and complex process, we don’t show the whole process here.

Recall our example about life satisfaction, we have the mathematical expression like:

\\Lifesatisfaction = 7.101 + -0.099 \times Age +0.111 \times Gender (Female)\\

How to explain it?

- 7.101: Intercept. This is the average life satisfaction for reference people. In our example, it means the average life satisfaction of female 0-year old (it is impossible) people is 7.101. Therefore, we could see sometimes the intercept has no practical meaning.
- -0.099: Slope for continuous variable. In our example, it means for the same gender, the average life satisfaction will decrease 0.099 as one year increase in age. It is reasonable when people are growing up, more things have to consider and they are not satisfied with their life as before.
- 0.111: Slope for the discrete variable. In our example, it means under the same age, on average females are more satisfied with their life than males.

Now, you are able to select the variables for models and explain the basic linear models.

For more technical blogs on model construction:

How to build models in R: <https://www.r-bloggers.com/2020/05/step-by-step-guide-on-how-to-build-linear-regression-in-r-with-code/>

How to build models in SPSS: <https://www.r-bloggers.com/2020/05/step-by-step-guide-on-how-to-build-linear-regression-in-r-with-code/>

For more readings about the linear regression:

<https://www.youtube.com/watch?v=ZkjP5RJLQF4>
