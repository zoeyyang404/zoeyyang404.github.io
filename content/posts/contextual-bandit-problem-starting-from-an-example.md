---
title: "Why does Amazon always guess our preference? – explaining contextual bandit problem without mathematics"
date: "Mon, 08 Feb 2021 13:36:37 +0000"
draft: false
slug: "contextual-bandit-problem-starting-from-an-example"
tags: []
categories: []
math: true
---
<span class="has-inline-color has-secondary-color">This blog will give you an idea of the rationale behind the recommendation system. How contextual bandit problem works in such a system? Hope this blog will give you an answer.</span>

During last semester, we are given a list of topics to discuss as a team. The fourth topic is bandit problem!

![](/old_posts_image/18/2021/04/1_pcEsW85jbSIzsEONxn1XRQ.jpeg)

This is the two-arm bandit machine. Each time you have to choose to pull one arm to earn money. How will you do that? Which arm you will choose to pull? Probably try several times, and summarise some experience. Then you may have some rules to guide you to pull the arm.

This is the bandit problem which is clearly about how to make a good decision. In a two-arm bandit machine, it is to choose to pull which arm to earn more money. When it comes to the recommendation system, it is to choose the good news/products/videos to earn a more click-through rate!!!

![](/old_posts_image/18/2021/02/recommendation-1-1024x350.png)

When you open your Amazon, you may notice it automatically recommends products for you. And when you using Tictok, it probability recommends videos that most attracts you. That is a recommendation system.

> Judging by Amazon’s success, the recommendation system works. The company reported a 29% sales increase to $12.83 billion during its second fiscal quarter, up from $9.9 billion during the same time last year. A lot of that growth arguably has to do with the way Amazon has integrated recommendations into nearly every part of the purchasing process.
>
> Amazon benefits from its recommendation system by recommending personalised products to different customers. You may have noticed that once you open Amazon, it shows the recommendation for you that you are actually interested in. Similarly, you may notice that Yahoo! recommends news you interests in, Tiktok always knows your tastes in videos. Although they may use a different algorithm, such personalized recommendation could be done by contextual bandit algorithms. **A good recommendation system will always know you better than yourself!!**
>
> Now, let’s look at what is contextual bandit problem through an example.

# Looking at the contextual bandit problem through an example

------------------------------------------------------------------------

------------------------------------------------------------------------

Assuming we have a website called ‘click me’ posting interesting news, and we make a profit from the click-through rate on web advertising. A list of companies asked us to put their advertisements on our website. In order to maximize our profit, we want to personalize these advertisements and attract our customers to click. In other words, we want to show specific advertisements to specific viewers. But how? This is the bandit problem.

## Collecting the contextual information

If we want to guess a person’s preference, we firstly want to know more about this person. Similarly, to our company, we want to know more about our viewers, which is called context in bandit problem. These contexts may contain:

- Personal information: Gender, region, age, etc…
- Recent browsing records and click-through records: Even including how many seconds you spend in viewing one advertisement
- The preference of the categories of news: for example, our viewer may like the news of Justin Bieber, or they may focus on sales information.
- etc…

## Trying and learning how to guess

Okay dokey. Now we have lots of information about our viewers. What’s the next step? If you want to guess a persons’ favourite movie, you might want to show them some movies and observe their reactions. For example, if we show them ‘Titanic’ and they said they really love this movie, they probably like a romantic movie and we will show them more romantic movies to guess. If you show them ‘The Lion King’ and they said they do not like this movie, you will not show them more cartoon movies. (Just example, I love The Lion King!!!!)

![Uh… is it Alien?](https://i.imgflip.com/15at2x.jpg)

Similarity, we have a list of advertisement from a list of companies. Which advertisement we choose to show for viewers with certain type?
![](/old_posts_image/18/2021/02/contextualbanditdiag-1024x170.png)

Similarly, each time, our system will give them a type of advertisement (that is choose an action), and watch their reaction. If guess correctly, the machine will gain ‘rewards’ (that is you click the products), and such rewards will transfer to experience about this type of viewers. If guess incorrectly, the machine is ‘regret’ that do not guess viewers preference and try to guess again and again. After a long time, our machine could guess the preference of viewers correctly!

For example, for viewers age below 6 years old. When the machine shows the ads about toys, and children’s clicked that ad. The machine will gain experience that children are more likely to click ads about toys. And next time our machine is more likely to put an advertisement about toys on our website.

After a while and huge data, this engine has cumulated enough information about viewers preference and has a high probability to guess the preference – just like the process of learning (learn experience from success and try after failure!)

Now our company runs very well and could show certain advertisements to certain viewers! With a high click-through rate, we made lots of profit!!
![Why Dogecoin Is Forcing People to Take It Seriously?](https://i.imgflip.com/15at2x.jpg)

This blog is only a general idea of multi-arm bandit problem, see more explanation including Maths please visit:


[Learn From Your Mistakes – Multi-armed Bandits](https://www.lancaster.ac.uk/stor-i-student-sites/maddie-smith/2021/02/02/learn-from-your-mistakes-multi-armed-bandits/)

## Recommended Reading

Here are some in-depth resources on contextual bandits and reinforcement learning:

- [Contextual Bandits and Reinforcement Learning (Towards Data Science)](https://towardsdatascience.com/contextual-bandits-and-reinforcement-learning-6bdfeaece72a)
- [Contextual Bandits (UBC Summer School Slides, PDF)](https://www.cs.ubc.ca/labs/lci/mlrg/slides/2019_summer_5_contextual_bandits.pdf)
## Introductory Video

Below is a good video introduction to contextual bandits:

{{< youtube w7ejDZ8SWv8 >}}